/* Renders the portfolio from window.SITE and window.PROJECTS (see projects.js). */
(function () {
  const S = window.SITE, P = window.PROJECTS;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const roman = (n) => {
    const m = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]]; let r = "";
    for (const [v, s] of m) while (n >= v) { r += s; n -= v; }
    return r;
  };

  /* ---------- colour helpers for the drawn placeholders ---------- */
  const rgb = (h) => { h = h.replace("#", ""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
  const hex = (a) => "#" + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
  const mix = (a, b, t) => { const A = rgb(a), B = rgb(b); return hex(A.map((v, i) => v + (B[i] - v) * t)); };
  const lum = (h) => { const [r, g, b] = rgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
  let uid = 0;

  function roles(p) {
    const pal = p.palette.map((c) => c.hex);
    const sorted = [...pal].sort((a, b) => lum(b) - lum(a));
    const light = sorted[0], dark = sorted[sorted.length - 1];
    return {
      wall: pal[0], accent: pal[1], wood: pal[2], metal: pal[3],
      trim: lum(pal[0]) > 0.6 ? mix(light, "#ffffff", 0.55) : mix(light, "#ffffff", 0.25),
      light, dark, ink: mix(dark, "#1a1a1a", 0.6)
    };
  }

  function kind(caption, i) {
    const c = (caption || "").toLowerCase();
    if (/plan|section|elevation/.test(c)) return "plan";
    if (/board|palette|sample|selection|watercolor/.test(c)) return "board";
    return i % 2 ? "enfilade" : "room";
  }

  function art(p, i = 0, alt) {
    const img = p.images?.[i] || {};
    const k = kind(img.caption, i + (alt ? 1 : 0)), c = roles(p), id = "g" + (++uid);
    const shade = (h, t) => mix(h, "#000000", t), tint = (h, t) => mix(h, "#ffffff", t);
    let body = "";
    const lineTrim = shade(c.wall, 0.14);

    if (k === "room") {
      let panels = "";
      for (let x = 60; x < 740; x += 115) panels += `<rect x="${x}" y="360" width="95" height="108" fill="none" stroke="${lineTrim}" stroke-width="2.5"/>`;
      let planks = "";
      for (let x = -400; x <= 1200; x += 70) planks += `<line x1="400" y1="500" x2="${x}" y2="760" stroke="${shade(c.wood, .18)}" stroke-width="1.4"/>`;
      body = `
        <rect width="800" height="600" fill="${c.wall}"/>
        <rect width="800" height="24" fill="${c.trim}"/><rect y="24" width="800" height="5" fill="${lineTrim}"/>
        <rect x="70" y="70" width="170" height="240" fill="none" stroke="${lineTrim}" stroke-width="2.5"/>
        <rect x="560" y="70" width="170" height="240" fill="none" stroke="${lineTrim}" stroke-width="2.5"/>
        <rect x="104" y="112" width="102" height="128" fill="${c.trim}" stroke="${c.metal}" stroke-width="6"/>
        <path d="M112 226 Q140 170 162 200 T200 186 L200 232 L112 232Z" fill="${mix(c.accent, c.trim, .45)}"/>
        <circle cx="645" cy="180" r="56" fill="${tint(c.wall, .35)}" stroke="${c.metal}" stroke-width="7"/>
        <path d="M300 330 V175 A100 100 0 0 1 500 175 V330Z" fill="url(#${id}sky)" stroke="${c.trim}" stroke-width="14"/>
        <path d="M400 76 V330 M300 210 H500 M300 270 H500" stroke="${c.trim}" stroke-width="5" fill="none"/>
        <rect y="330" width="800" height="9" fill="${c.trim}"/>
        ${panels}
        <rect y="486" width="800" height="16" fill="${c.trim}"/>
        <g clip-path="url(#${id}fl)"><rect y="500" width="800" height="100" fill="${c.wood}"/>${planks}</g>
        <path d="M200 520 L600 520 L680 600 L120 600Z" fill="${mix(c.accent, c.trim, .6)}" opacity=".85"/>
        <rect x="236" y="372" width="328" height="86" rx="20" fill="${c.accent}"/>
        <rect x="222" y="420" width="52" height="78" rx="18" fill="${shade(c.accent, .1)}"/>
        <rect x="526" y="420" width="52" height="78" rx="18" fill="${shade(c.accent, .1)}"/>
        <rect x="262" y="440" width="276" height="52" rx="8" fill="${tint(c.accent, .12)}"/>
        <rect x="286" y="398" width="66" height="50" rx="8" fill="${c.trim}" transform="rotate(-6 319 423)"/>
        <rect x="448" y="398" width="66" height="50" rx="8" fill="${c.metal}" transform="rotate(6 481 423)"/>
        <rect x="240" y="496" width="8" height="14" fill="${shade(c.wood, .4)}"/><rect x="552" y="496" width="8" height="14" fill="${shade(c.wood, .4)}"/>
        <rect x="120" y="430" width="78" height="66" fill="${shade(c.wood, .1)}"/>
        <path d="M146 430 Q138 404 159 392 Q180 404 172 430Z" fill="${c.trim}"/>
        <line x1="159" y1="392" x2="159" y2="360" stroke="${c.metal}" stroke-width="3"/>
        <path d="M134 362 L184 362 L174 326 L144 326Z" fill="${tint(c.light, .4)}"/>
        <rect x="604" y="440" width="70" height="56" rx="35" fill="${c.wood}"/>
        <circle cx="639" cy="430" r="16" fill="${mix(c.accent, "#5f7254", .5)}"/>`;
    } else if (k === "enfilade") {
      let fl = "";
      for (let x = -600; x <= 1400; x += 60) fl += `<line x1="400" y1="300" x2="${x}" y2="900" stroke="${shade(c.wood, .2)}" stroke-width="1.3"/>`;
      const far = mix(c.wall, c.trim, .45);
      body = `
        <rect width="800" height="600" fill="${c.wall}"/>
        <rect y="22" width="800" height="5" fill="${lineTrim}"/>
        <path d="M230 520 V250 A170 170 0 0 1 570 250 V520Z" fill="${far}"/>
        <path d="M330 450 V260 A70 70 0 0 1 470 260 V450Z" fill="url(#${id}sky)" stroke="${tint(far, .4)}" stroke-width="8"/>
        <path d="M400 190 V450 M330 330 H470" stroke="${tint(far, .4)}" stroke-width="4"/>
        <rect x="230" y="450" width="340" height="70" fill="${tint(c.wood, .25)}"/>
        <line x1="400" y1="80" x2="400" y2="300" stroke="${c.metal}" stroke-width="2"/>
        <path d="M368 300 Q400 268 432 300Z" fill="${c.metal}"/>
        <ellipse cx="400" cy="440" rx="74" ry="14" fill="${c.wood}"/>
        <rect x="392" y="440" width="16" height="50" fill="${shade(c.wood, .2)}"/>
        <ellipse cx="400" cy="492" rx="34" ry="6" fill="${shade(c.wood, .25)}"/>
        <path d="M230 520 V250 A170 170 0 0 1 570 250 V520" fill="none" stroke="${c.trim}" stroke-width="20"/>
        <path d="M206 520 V250 A194 194 0 0 1 594 250 V520" fill="none" stroke="${lineTrim}" stroke-width="2"/>
        <g clip-path="url(#${id}fl2)"><rect y="520" width="800" height="80" fill="${c.wood}"/>${fl}</g>
        <rect y="508" width="800" height="14" fill="${c.trim}"/>
        <rect x="48" y="150" width="120" height="150" fill="${mix(c.accent, c.trim, .3)}" stroke="${c.metal}" stroke-width="6"/>
        <rect x="70" y="330" width="76" height="96" fill="${tint(c.accent, .5)}" stroke="${c.metal}" stroke-width="5"/>
        <rect x="630" y="400" width="130" height="16" fill="${c.wood}"/>
        <path d="M640 416 V506 M750 416 V506" stroke="${shade(c.wood, .3)}" stroke-width="6"/>
        <path d="M672 400 Q662 360 690 346 Q718 360 708 400Z" fill="${c.accent}"/>
        <line x1="690" y1="346" x2="690" y2="304" stroke="${c.metal}" stroke-width="3"/>
        <path d="M664 306 L716 306 L706 268 L674 268Z" fill="${tint(c.light, .4)}"/>`;
    } else if (k === "plan") {
      const paper = mix(c.light, "#F6F3EC", 0.75), ink = "#2B2E2F";
      body = `
        <rect width="800" height="600" fill="${paper}"/>
        <g stroke="${mix(paper, ink, .08)}" stroke-width="1">${Array.from({ length: 21 }, (_, n) => `<line x1="${n * 40}" y1="0" x2="${n * 40}" y2="600"/>`).join("")}${Array.from({ length: 16 }, (_, n) => `<line x1="0" y1="${n * 40}" x2="800" y2="${n * 40}"/>`).join("")}</g>
        <rect x="150" y="90" width="500" height="380" fill="${tint(c.wall, .55)}" stroke="${ink}" stroke-width="12"/>
        <rect x="236" y="80" width="90" height="20" fill="${paper}"/><path d="M236 86 H326 M236 94 H326" stroke="${ink}" stroke-width="2"/>
        <rect x="474" y="80" width="90" height="20" fill="${paper}"/><path d="M474 86 H564 M474 94 H564" stroke="${ink}" stroke-width="2"/>
        <rect x="640" y="330" width="20" height="80" fill="${paper}"/><path d="M650 330 A80 80 0 0 0 570 410" fill="none" stroke="${ink}" stroke-width="1.5"/><line x1="650" y1="330" x2="570" y2="330" stroke="${ink}" stroke-width="2"/>
        <rect x="190" y="200" width="200" height="170" fill="${c.accent}" opacity=".35" stroke="${ink}" stroke-width="1"/>
        <rect x="200" y="200" width="44" height="170" rx="6" fill="${paper}" stroke="${ink}" stroke-width="2"/>
        <rect x="340" y="214" width="40" height="44" rx="6" fill="${paper}" stroke="${ink}" stroke-width="2"/>
        <rect x="340" y="312" width="40" height="44" rx="6" fill="${paper}" stroke="${ink}" stroke-width="2"/>
        <rect x="268" y="250" width="54" height="70" fill="${tint(c.wood, .3)}" stroke="${ink}" stroke-width="2"/>
        <rect x="160" y="245" width="18" height="80" fill="${c.metal}" opacity=".6" stroke="${ink}" stroke-width="2"/>
        <circle cx="520" cy="240" r="58" fill="${tint(c.wood, .4)}" stroke="${ink}" stroke-width="2"/>
        ${[0, 60, 120, 180, 240, 300].map((a) => { const r = 82, x = 520 + r * Math.cos(a * Math.PI / 180), y = 240 + r * Math.sin(a * Math.PI / 180); return `<rect x="${x - 13}" y="${y - 13}" width="26" height="26" rx="4" fill="${paper}" stroke="${ink}" stroke-width="2" transform="rotate(${a + 90} ${x} ${y})"/>`; }).join("")}
        <path d="M150 510 H650 M150 500 V520 M650 500 V520" stroke="${ink}" stroke-width="1.5"/>
        <text x="400" y="504" font-family="Jost, sans-serif" font-size="13" text-anchor="middle" fill="${ink}" letter-spacing="2">24'-0"</text>
        <circle cx="704" cy="130" r="20" fill="none" stroke="${ink}" stroke-width="1.5"/><path d="M704 106 L712 132 L704 126 L696 132Z" fill="${ink}"/>
        <text x="704" y="166" font-family="Jost, sans-serif" font-size="12" text-anchor="middle" fill="${ink}">N</text>
        <text x="150" y="560" font-family="Jost, sans-serif" font-size="14" fill="${ink}" letter-spacing="3">${esc((img.caption || "PLAN").toUpperCase())}</text>
        <text x="650" y="560" font-family="Jost, sans-serif" font-size="12" text-anchor="end" fill="${mix(ink, paper, .35)}" letter-spacing="2">SCALE 1/4" = 1'-0"</text>`;
    } else {
      const bg = mix(c.light, "#F7F4EE", 0.6);
      let grain = "";
      for (let y = 102; y < 250; y += 9) grain += `<path d="M430 ${y} Q520 ${y + (y % 3 ? 6 : -6)} 630 ${y}" stroke="${shade(c.wood, .22)}" stroke-width="1.4" fill="none"/>`;
      let stripes = "";
      for (let x = 300; x < 560; x += 18) stripes += `<rect x="${x}" y="150" width="7" height="270" fill="${tint(c.accent, .35)}"/>`;
      body = `
        <rect width="800" height="600" fill="${bg}"/>
        <g filter="url(#${id}sh)">
          <rect x="170" y="70" width="190" height="380" fill="#FBFAF6"/>
          <rect x="182" y="82" width="166" height="300" fill="${c.wall}"/>
          <text x="186" y="410" font-family="Jost, sans-serif" font-size="12" fill="#4a4a46" letter-spacing="1.5">${esc(p.palette[0].name.toUpperCase())}</text>
          <text x="186" y="430" font-family="Jost, sans-serif" font-size="11" fill="#8a8a84">${esc(p.palette[0].hex)}</text>
          <g transform="rotate(-4 430 285)"><rect x="310" y="160" width="230" height="250" fill="${c.accent}"/><g clip-path="url(#${id}fab)">${stripes}</g></g>
          <rect x="420" y="92" width="220" height="160" fill="${c.wood}"/>${grain}
          <rect x="230" y="420" width="170" height="110" fill="#ECEAE6"/>
          <path d="M240 440 Q300 470 330 450 T392 500 M250 500 Q290 480 340 520" stroke="#B9B6B0" stroke-width="2" fill="none"/>
          <circle cx="560" cy="400" r="78" fill="url(#${id}met)"/>
        </g>
        <circle cx="560" cy="400" r="78" fill="none" stroke="${shade(c.metal, .2)}" stroke-width="2"/>`;
    }

    const defs = `<defs>
      <linearGradient id="${id}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(c.trim, "#dfe7ea", .5)}"/><stop offset="1" stop-color="${tint(c.trim, .4)}"/></linearGradient>
      <radialGradient id="${id}glow" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></radialGradient>
      <radialGradient id="${id}met" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${tint(c.metal, .55)}"/><stop offset=".6" stop-color="${c.metal}"/><stop offset="1" stop-color="${shade(c.metal, .3)}"/></radialGradient>
      <clipPath id="${id}fl"><rect y="500" width="800" height="100"/></clipPath>
      <clipPath id="${id}fl2"><rect y="520" width="800" height="80"/></clipPath>
      <clipPath id="${id}fab"><rect x="310" y="160" width="230" height="250"/></clipPath>
      <filter id="${id}sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-opacity=".18"/></filter>
    </defs>`;
    const overlay = k === "plan" || k === "board" ? "" : `<rect width="800" height="600" fill="url(#${id}glow)"/>`;
    return `<svg class="ph" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(img.caption || p.title)} (placeholder illustration)">${defs}${body}${overlay}</svg>`;
  }

  function media(p, i = 0, eager, alt) {
    const img = p.images?.[i];
    if (img && img.src) return `<img src="${esc(img.src)}" alt="${esc(img.caption || p.title)}" data-fit="${img.fit || "contain"}" ${eager ? "" : 'loading="lazy"'}>`;
    return art(p, i, alt);
  }

  /* ---------- static text ---------- */
  function fillSite() {
    const [first, ...rest] = S.name.split(" ");
    document.querySelectorAll("[data-name]").forEach((el) => (el.textContent = S.name));
    $("#mono").textContent = S.monogram;
    $("#hero-name").innerHTML = `${esc(first)} <em>${esc(rest.join(" "))}</em>`;
    $("#hero-intro").textContent = S.intro;
    $("#hero-meta").innerHTML = [S.title, S.school, S.location].map((t) => `<span>${esc(t)}</span>`).join("");
    const f = P[0];
    $("#hero-art").innerHTML = media(f, 0, true);
    $("#hero-caption").innerHTML = `<span>${esc(f.title)}, ${esc(f.type.toLowerCase())}</span><a href="#${esc(f.slug)}">View project</a>`;

    $("#about-text").innerHTML = S.about.map((t) => `<p>${esc(t)}</p>`).join("") + (S.quote ? `<blockquote>${esc(S.quote)}${S.quoteSource ? `<cite>${esc(S.quoteSource)}</cite>` : ""}</blockquote>` : "");
    $("#portrait").innerHTML = S.portrait?.src
      ? `<img src="${esc(S.portrait.src)}" alt="${esc(S.portrait.caption || S.name)}">`
      : art({ title: "Portrait", palette: P[0].palette, images: [{ caption: "Portrait" }] }, 0);
    $("#portrait-cap").textContent = S.portrait?.caption || "";
    $("#timeline").innerHTML = S.timeline.map(([y, t, d]) => `<li><span class="yr">${esc(y)}</span><div><strong>${esc(t)}</strong><span>${esc(d)}</span></div></li>`).join("");

    $("#disciplines").innerHTML = S.skills.design.map(([h, d]) => `<div class="discipline"><h3>${esc(h)}</h3><p>${esc(d)}</p></div>`).join("");
    $("#software").innerHTML = S.skills.software.map((n) => `<li><span>${esc(n)}</span></li>`).join("");
    $("#hand").innerHTML = S.skills.hand.map((h) => `<span>${esc(h)}</span>`).join("");

    $("#email").textContent = S.email;
    $("#mail-btn").href = "mailto:" + S.email;
    const links = [["LinkedIn", S.linkedin], ["GitHub", S.github], ["Instagram", S.instagram]].filter(([, u]) => u);
    $("#links").innerHTML = links.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join(" &nbsp;·&nbsp; ");
    $("#links-line").hidden = !links.length;
    $("#loc").textContent = S.location;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------- gallery ---------- */
  let filter = "All";
  function spans(n) {
    const groups = [[7, 5], [4, 4, 4], [5, 7]]; const out = []; let g = 0;
    while (out.length < n) {
      const left = n - out.length, grp = groups[g++ % groups.length];
      if (left >= grp.length) out.push(...grp);
      else if (left === 1) out.push(12);
      else out.push(7, 5);
    }
    return out;
  }
  function renderFilters() {
    const cats = ["All", ...new Set(P.map((p) => p.category))];
    $("#filters").innerHTML = cats.map((c) => {
      const n = c === "All" ? P.length : P.filter((p) => p.category === c).length;
      return `<button class="filter" type="button" data-cat="${esc(c)}" aria-pressed="${c === filter}">${esc(c)}<sup>${n}</sup></button>`;
    }).join("");
    $("#filters").onclick = (e) => {
      const b = e.target.closest("[data-cat]"); if (!b) return;
      filter = b.dataset.cat; renderFilters(); renderGallery();
    };
  }
  function renderGallery() {
    const list = P.map((p, i) => ({ p, i })).filter(({ p }) => filter === "All" || p.category === filter);
    const sp = spans(list.length);
    $("#gallery").innerHTML = list.map(({ p, i }, k) => `
      <a class="card w${sp[k]}" href="#${esc(p.slug)}">
        <div class="card-media">${media(p, 0, false, i % 2)}<span class="tag">${esc(p.category)}</span></div>
        <div class="card-info"><h3>${esc(p.title)}</h3><span class="num">${roman(i + 1)}</span>
          <p>${[p.type, p.year].filter(Boolean).map(esc).join(" · ")}</p></div>
      </a>`).join("");
  }

  /* ---------- project page ---------- */
  const view = $("#project-view");
  let current = -1, lastScroll = 0;
  function openProject(idx) {
    const p = P[idx]; current = idx;
    if (view.hidden) lastScroll = window.scrollY;
    const prev = P[(idx - 1 + P.length) % P.length], next = P[(idx + 1) % P.length];
    const imgs = p.images?.length ? p.images : [{}];
    const spec = [["Course", p.course], ["Term", p.year], ["Scope", p.size], ["Style", p.style], ["Tools", (p.software || []).join(", ")]].filter(([, v]) => v);
    view.innerHTML = `
      <div class="pv-bar"><div class="wrap">
        <button class="back" type="button" data-close>← All projects</button>
        <span class="pv-count">${roman(idx + 1)} of ${roman(P.length)}</span>
      </div></div>
      <article>
        <div class="wrap pv-head">
          <span class="eyebrow">${esc(p.category)} · ${esc(p.type)}</span>
          <h1>${esc(p.title)}</h1>
          <p class="lede">${esc(p.summary)}</p>
        </div>
        <div class="wrap"><div class="pv-hero" data-lb="0">${media(p, 0, true)}</div>
          <dl class="spec" style="--n:${spec.length}">${spec.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        </div>
        <div class="wrap pv-body">
          <div class="story">
            ${p.brief ? `<section><span class="eyebrow">The brief</span><p>${esc(p.brief)}</p></section>` : ""}
            ${p.concept ? `<section><h2>Concept</h2><p>${esc(p.concept)}</p></section>` : ""}
            ${p.solution ? `<section><h2>${p.brief || p.concept ? "Design solution" : "About this work"}</h2><p>${esc(p.solution)}</p></section>` : ""}
          </div>
          <aside class="sheet">
            ${p.palette?.length ? `<div><h3>Palette</h3><div class="chips">${p.palette.map((c) => `<div class="chip"><i style="background:${esc(c.hex)}"></i><b>${esc(c.name)}</b><small>${esc(c.hex.toUpperCase())}</small></div>`).join("")}</div></div>` : ""}
            ${p.materials?.length ? `<div><h3>Materials & media</h3><ul class="plain-list">${p.materials.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>` : ""}
          </aside>
        </div>
        <div class="wrap plates">${imgs.map((im, k) => `
          <figure class="plate"><button type="button" data-lb="${k}" aria-label="Enlarge ${esc(im.caption || "image")}">${media(p, k)}</button>
          <figcaption><em>Fig. ${k + 1}</em>${esc(im.caption || "")}</figcaption></figure>`).join("")}
        </div>
      </article>
      <nav class="pv-next"><div class="wrap">
        <button type="button" data-go="${esc(prev.slug)}"><small>← Previous</small><strong>${esc(prev.title)}</strong></button>
        <button type="button" data-go="${esc(next.slug)}"><small>Next →</small><strong>${esc(next.title)}</strong></button>
      </div></nav>`;
    view.hidden = false; view.scrollTop = 0;
    document.body.classList.add("locked");
    document.title = `${p.title} · ${S.name}`;
    $(".back", view).focus({ preventScroll: true });
  }
  function closeProject() {
    if (view.hidden) return;
    view.hidden = true; view.innerHTML = ""; current = -1;
    document.body.classList.remove("locked");
    document.title = `${S.name} Portfolio`;
    window.scrollTo(0, lastScroll);
  }
  view.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { go("work"); return; }
    const g = e.target.closest("[data-go]"); if (g) { go(g.dataset.go); return; }
    const l = e.target.closest("[data-lb]"); if (l) openLightbox(+l.dataset.lb);
  });

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox"); let lbIdx = 0;
  function openLightbox(k) {
    const p = P[current], imgs = p.images?.length ? p.images : [{}];
    lbIdx = (k + imgs.length) % imgs.length;
    $(".stage", lb).innerHTML = media(p, lbIdx, true);
    $("#lb-cap").textContent = `Fig. ${lbIdx + 1}  ${imgs[lbIdx].caption || ""}`;
    lb.hidden = false; $("#lb-close").focus();
  }
  const closeLightbox = () => { lb.hidden = true; };
  $("#lb-prev").onclick = () => openLightbox(lbIdx - 1);
  $("#lb-next").onclick = () => openLightbox(lbIdx + 1);
  $("#lb-close").onclick = closeLightbox;
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("stage")) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") openLightbox(lbIdx - 1);
      if (e.key === "ArrowRight") openLightbox(lbIdx + 1);
    } else if (!view.hidden && e.key === "Escape") go("work");
  });

  /* ---------- routing (#slug opens a project) ---------- */
  function go(hash) { if (location.hash.slice(1) === hash) route(); else location.hash = hash; }
  function route() {
    const h = decodeURIComponent(location.hash.slice(1));
    const idx = P.findIndex((p) => p.slug === h);
    if (idx >= 0) { closeLightbox(); openProject(idx); }
    else {
      closeProject();
      const t = h && document.getElementById(h);
      if (t) t.scrollIntoView();
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------- copy email ---------- */
  $("#copy-email").addEventListener("click", async (e) => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText(S.email); b.textContent = "Copied"; }
    catch { const r = document.createRange(); r.selectNodeContents($("#email")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected"; }
    setTimeout(() => (b.textContent = "Copy"), 1800);
  });

  fillSite(); renderFilters(); renderGallery(); route();
})();
