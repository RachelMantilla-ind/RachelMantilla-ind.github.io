/* Interactive 3D model viewer (three.js). Loaded on demand by app.js when a project has a `model`. */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

export function mountViewer(host, model) {
  const canvasWrap = host.querySelector(".mv-canvas");
  const status = host.querySelector(".mv-status");
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  canvasWrap.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.5, 2000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.6;
  controls.addEventListener("start", () => { controls.autoRotate = false; });

  scene.add(new THREE.HemisphereLight(0xfffaf0, 0xb7ad9c, 1.6));
  const sun = new THREE.DirectionalLight(0xfff3e0, 2.4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.0004;
  scene.add(sun, sun.target);

  // horizontal section plane: everything above `cut` is hidden
  const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e4);
  renderer.clippingPlanes = [plane];
  const TOP = 12; // just above the roof, in metres
  let cut = 1e4, cutTarget = 1e4;

  let radius = 40, home = null, running = true, raf = 0;
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.16 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(1, 64), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  loader.load(model.src, (gltf) => {
    const root = gltf.scene;
    const box = new THREE.Box3().setFromObject(root);
    const c = box.getCenter(new THREE.Vector3());
    root.position.set(-c.x, -box.min.y, -c.z);
    root.traverse((o) => {
      if (!o.isMesh) return;
      const glass = o.material.transparent;
      o.castShadow = !glass;
      o.receiveShadow = !glass;
      if (glass) o.material.depthWrite = false, o.renderOrder = 2;
    });
    scene.add(root);
    const size = box.getSize(new THREE.Vector3());
    radius = Math.max(size.x, size.z) * 0.62;
    ground.scale.setScalar(radius * 2.2);
    sun.position.set(radius * 0.9, radius * 1.4, radius * 0.6);
    Object.assign(sun.shadow.camera, { left: -radius * 1.3, right: radius * 1.3, top: radius * 1.3, bottom: -radius * 1.3, far: radius * 5 });
    sun.shadow.camera.updateProjectionMatrix();
    controls.minDistance = radius * 0.35;
    controls.maxDistance = radius * 4;
    home = new THREE.Vector3(radius * 1.6, radius * 1.15, radius * 1.8);
    camera.position.copy(home);
    controls.target.set(0, size.y * 0.1, 0);
    status.hidden = true;
    host.classList.add("ready");
  }, (e) => {
    if (e.total) status.textContent = `Loading model ${Math.round((e.loaded / e.total) * 100)}%`;
  }, () => { status.textContent = "The 3D model couldn't load."; });

  // UI: level buttons + reset
  host.querySelectorAll("[data-cut]").forEach((b) => b.addEventListener("click", () => {
    host.querySelectorAll("[data-cut]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    cutTarget = b.dataset.cut === "all" ? 1e4 : +b.dataset.cut;
    if (cut > 500 && cutTarget < 500) cut = TOP;
  }));
  host.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!home) return;
    camera.position.copy(home);
    controls.target.set(0, controls.target.y, 0);
    controls.autoRotate = true;
  });

  function resize() {
    const w = canvasWrap.clientWidth, h = canvasWrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvasWrap);
  const io = new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running) loop(); });
  io.observe(host);

  function loop() {
    cancelAnimationFrame(raf);
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (!(cutTarget > 500 && cut > 500)) {
      const target = Math.min(cutTarget, TOP);
      cut += (target - cut) * 0.12;
      if (cutTarget > 500 && cut > TOP - 0.05) cut = 1e4;
    }
    plane.constant = cut;
    controls.update();
    renderer.render(scene, camera);
  }
  resize();
  loop();

  return function dispose() {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    controls.dispose();
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) [].concat(o.material).forEach((m) => m.dispose());
    });
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
