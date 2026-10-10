/*
  PORTFOLIO CONTENT
  -----------------
  Everything on the site is driven from this file. To add a project, copy one
  of the blocks below, give it a unique `slug`, and fill in the fields.
  Fields left empty ("" or missing) are simply hidden on the page.

  Photos: put them in  images/<slug>/  and list them under `images`. The first
  image is the cover. Add `fit: "cover"` to an image if it should fill its
  frame instead of being shown whole.
*/

window.SITE = {
  name: "Rachel Mantilla",
  monogram: "RM",
  title: "Interior Design Student",
  school: "Seminole State College of Florida, Class of 2028",
  location: "Sebring, Florida",
  email: "rachel.mantilla001@yahoo.com",
  resume: "files/Rachel-Mantilla-Resume.pdf",   // downloadable résumé (phone number left off on purpose)
  linkedin: "",   // add her LinkedIn URL when she has one; the link appears automatically
  github: "",     // add her GitHub URL when she has one
  instagram: "",
  intro:
    "I create functional, thoughtful spaces, from hand-drafted plans and block studies to marker renderings and finish boards.",
  about: [
    "I am an interior design student at Seminole State College of Florida with a 4.00 GPA, earning my A.S. in Interior Design and continuing into the B.A.S., expected in 2028. My studio work covers residential and commercial interiors, from programming and block diagrams through hand-drafted construction drawings, perspective renderings and material boards.",
    "Before design school I spent five years in client-facing healthcare roles, which taught me to listen carefully, stay organized and keep the people who use a space at the center of every decision. I am bilingual in English and Spanish, and I am looking for an interior design internship where I can keep growing with a team."
  ],
  portrait: { src: "images/sketches-and-studies/pen-and-ink-vignette.jpg", caption: "Pen-and-ink vignette" },
  quote: "A calm environment that enhances comfort, independence, and daily inspiration.",
  quoteSource: "",   // optional line under the quote
  skills: {
    design: [
      ["Space planning", "Programming, block diagrams and furniture layouts for residential and commercial interiors."],
      ["Drafting & documentation", "Hand-drafted floor plans, elevations, reflected ceiling and power/data plans."],
      ["Codes & universal design", "ADA clearances, accessible layouts and building code requirements."],
      ["Visual communication", "One- and two-point perspective, marker rendering, pen-and-ink sketching and study models."],
      ["Materials & FF&E", "Finish and furniture selection, material boards, concept statements and sustainable design."],
      ["Client communication", "Five years of client-facing work, bilingual in English and Spanish."]
    ],
    software: ["Revit", "AutoCAD", "Adobe Creative Suite", "Canva", "Microsoft Office", "Google Workspace"],
    hand: ["Hand drafting", "Two-point perspective", "Marker rendering", "Pen and ink", "Study models", "Material boards"]
  },
  timeline: [
    ["2028", "B.A.S. in Interior Design (expected)", "Seminole State College of Florida."],
    ["2025", "Seminole State College of Florida", "A.S. in Interior Design. 4.00 GPA, President's List Fall 2025, Spring 2026 and Summer 2026."],
    ["2022", "Miami Dade College", "General education and transfer coursework, 2022 to 2025."],
    ["2021", "Healthcare front office", "Five years of patient scheduling, records and front desk work, currently at Simmons MD Weight & Healthcare Solutions."]
  ]
};

window.PROJECTS = [
  {
    slug: "dining-room-rendering",
    title: "Double-Height Dining Room",
    category: "Drawing & Models",
    type: "Two-point perspective rendering",
    year: "",
    course: "Perspective rendering",
    size: "",
    style: "Grayscale marker",
    summary: "A double-height dining room with a wall of windows facing the sea, drawn in two-point perspective and rendered by hand in grayscale markers.",
    brief: "Design a dining room and present it as a fully rendered two-point perspective drawing.",
    concept: "A tall, light-filled room that opens to a coastal view. A full-height window wall frames the water and cliffs on one side, while built-in shelving and a dark feature wall with framed art above a built-in aquarium anchor the other.",
    solution: "The drawing was built up in stages: a measured perspective grid, a layout of the room and furniture on tracing paper, a clean inked line drawing, and finally layered grayscale marker rendering. Fluted dining chairs surround an oval wood table on a large area rug, with wood plank flooring and styled open shelves.",
    materials: ["Grayscale art markers", "Fine-line ink pens", "Graphite on tracing paper", "Bristol board"],
    software: ["Hand drawn"],
    images: [
      { src: "images/dining-room-rendering/final-rendering.jpg", caption: "Final marker rendering" },
      { src: "images/dining-room-rendering/inked-line-drawing.jpg", caption: "Inked line drawing before rendering" },
      { src: "images/dining-room-rendering/perspective-grid-detail.jpg", caption: "Furniture laid out on the perspective grid" },
      { src: "images/dining-room-rendering/perspective-grid-layout.jpg", caption: "Built-ins and window wall blocked in" },
      { src: "images/dining-room-rendering/perspective-grid-setup.jpg", caption: "Two-point perspective grid setup" }
    ]
  },
  {
    slug: "revit-law-office",
    title: "Two-Story Law Office in Revit",
    category: "Commercial",
    type: "Revit 3D building model",
    year: "Fall 2026",
    course: "Revit (IND 2462)",
    size: "Two stories",
    style: "Commercial",
    summary: "A full two-story law office I'm modeling in Revit this semester. Spin it, zoom in, and cut away each floor.",
    solution: "I'm building this model in my Revit course this semester. It has split-face block exterior walls, a curved storefront entry with sunshades, glass interior partitions, steel stairs with pipe guardrails, and a steel structural frame. On this page the roof, ceilings and the structure above them are hidden so you can see into the rooms. Use the Level 1 and Level 2 buttons to slice the building like a floor plan, or drag to walk around it.",
    materials: ["Split-face block and CMU exterior", "Storefront and curtain wall glazing", "Glass interior partitions", "Steel pan stairs with pipe guardrails", "Carpet and resilient flooring"],
    software: ["Autodesk Revit"],
    model: {
      src: "models/law-office.json",
      caption: "Drag to orbit, scroll or pinch to zoom",
      levels: [["Whole building", "all"], ["Level 2", 5.6], ["Level 1", 1.5]]
    },
    images: [
      { src: "images/revit-law-office/model-exterior.jpg", caption: "Revit model, exterior view" },
      { src: "images/revit-law-office/model-level-1.jpg", caption: "Revit model cut at Level 1" },
      { src: "images/revit-law-office/model-level-2.jpg", caption: "Revit model cut at Level 2" }
    ]
  },
  {
    slug: "mountain-cabin-retreat",
    title: "Mountain Cabin Retreat",
    category: "Residential",
    type: "Accessible residential design",
    year: "Fall 2025",
    course: "Studio I",
    size: "About 920 sq ft",
    style: "Warm, natural",
    summary: "An open-concept, accessible mountain cabin in Aspen, Colorado, designed for a creative client who uses a cane.",
    brief: "The client, Sarah Bennett, is a writer who wanted a peaceful and accessible retreat that matches her creative lifestyle. She walks with a cane, so the home needed to be safe and easy to move through while still feeling warm, natural and inviting, with space to write and to enjoy the mountain views.",
    concept: "The design centers on open spaces and warm textures that make the home feel inviting. Light woods, stone accents and soft neutrals with touches of warm greens and browns are inspired by the forest around the cabin.",
    solution: "Wide pathways, level flooring and a curbless shower balance accessibility with style. The living area flows into the kitchen and dining area so Sarah can move around with ease. A writing office near the window gives her a quiet place to work, and a covered porch extends the living space outdoors. Engineered white oak flooring gives a smooth surface for cane mobility, matte porcelain tile in the bathroom is slip resistant and easy to clean, and quartz counters add durability. Furniture has soft upholstery, rounded edges and supportive seating, and brass light fixtures tie the rooms together.",
    palette: [
      { name: "Sage accent wall", hex: "#A9B5A0" },
      { name: "Cognac leather", hex: "#9A5B34" },
      { name: "Lake blue fabric", hex: "#3F6D94" },
      { name: "Engineered white oak", hex: "#B79D7C" }
    ],
    materials: ["Engineered white oak flooring", "Matte porcelain bathroom tile", "Quartz countertops", "Brass light fixtures", "Woven and leather upholstery fabrics", "Wood-look outdoor decking"],
    software: ["Hand drafting", "Material boards"],
    images: [
      { src: "images/mountain-cabin-retreat/ffe-board.jpg", caption: "Furniture and fabrics board with justification statement" },
      { src: "images/mountain-cabin-retreat/finish-board.jpg", caption: "Finishes, lighting and concept statement board" },
      { src: "images/mountain-cabin-retreat/furniture-plan.jpg", caption: "Furniture plan, 1/4\" = 1'-0\"" },
      { src: "images/mountain-cabin-retreat/furniture-plan-alternate.jpg", caption: "Alternate furniture layout" },
      { src: "images/mountain-cabin-retreat/base-plan.jpg", caption: "Base floor plan" }
    ]
  },
  {
    slug: "law-office",
    title: "Moreno's Law Firm",
    category: "Commercial",
    type: "Law office space plan & drawing set",
    year: "Spring 2026",
    course: "Technical Design",
    size: "16 rooms, 48' x 72'",
    style: "Professional",
    summary: "A 16-room law office taken from block-plan studies to a full hand-drafted drawing set.",
    brief: "Space-plan a law office with reception, a conference room, a partner office, associate and paralegal offices, a war room, a library, a file room, a break room and ADA restrooms, then document it as a set of construction drawings.",
    concept: "Public rooms stay together at the front of the suite. Reception and conference sit side by side near the entry, while private offices line the exterior wall for daylight and support spaces form a core along the central corridor.",
    solution: "After several cut-paper block-plan studies, the final layout was hand-drafted at 1/8\" = 1'-0\" with a wall legend for 2-hour fire-rated, acoustic insulated and standard partitions, plus an enlarged ADA restroom plan. The set continues with a furniture plan, a power and data plan, a reflected ceiling and lighting plan, and elevations of the reception desk and break room millwork.",
    materials: ["2-hour fire-rated partitions", "Acoustic insulated walls", "Recessed and pendant lighting", "Custom break room millwork"],
    software: ["Hand drafting"],
    images: [
      { src: "images/law-office/power-data-plan.jpg", caption: "Power and data plan" },
      { src: "images/law-office/dimensioned-floor-plan.jpg", caption: "Dimensioned floor plan with wall legend and ADA restroom" },
      { src: "images/law-office/furniture-plan.jpg", caption: "Furniture plan, sheet A2" },
      { src: "images/law-office/lighting-ceiling-plan.jpg", caption: "Reflected ceiling and lighting plan" },
      { src: "images/law-office/millwork-elevations.jpg", caption: "Break room and reception elevations" },
      { src: "images/law-office/block-plan-study-1.jpg", caption: "Block-plan study" },
      { src: "images/law-office/block-plan-study-2.jpg", caption: "Block-plan study, alternate" },
      { src: "images/law-office/block-plan-study-3.jpg", caption: "Block-plan study, alternate" }
    ]
  },
  {
    slug: "residential-floor-plan",
    title: "Two-Story Residence",
    category: "Residential",
    type: "Floor plan & interior elevations",
    year: "Spring 2026",
    course: "Technical Design",
    size: "51'-3\" x 25'-0\"",
    style: "Construction drawings",
    summary: "A hand-drafted, fully dimensioned plan of a two-story home, with a furniture plan and interior elevations.",
    brief: "Draft the main floor of a two-story home at 1/4\" = 1'-0\" with full dimensions, door sizes and notes, then develop it with a furniture layout and interior elevations.",
    concept: "Living, dining and kitchen share an open plan beneath a space open to above, with the study and primary suite set off along one side.",
    solution: "The dimensioned plan shows exterior and interior wall thicknesses, window and door locations, a pantry, laundry, half bath, and a primary bath with a partial-height wall and clerestory window. The furniture plan places seating around the fireplace, a six-seat dining table, a study desk and the bedroom suite, and the elevations detail the fireplace wall and the window wall with drapery.",
    software: ["Hand drafting"],
    images: [
      { src: "images/residential-floor-plan/dimensioned-plan.jpg", caption: "Dimensioned floor plan, sheet A1" },
      { src: "images/residential-floor-plan/furniture-plan.jpg", caption: "Furniture plan, sheet A2" },
      { src: "images/residential-floor-plan/interior-elevations.jpg", caption: "Interior elevations, sheet A3" }
    ]
  },
  {
    slug: "paper-study-model",
    title: "Paper Study Model",
    category: "Drawing & Models",
    type: "Abstract spatial study",
    year: "",
    course: "",
    size: "",
    style: "Curved and folded planes",
    summary: "An abstract study model exploring how curved and folded planes can shape and enclose space.",
    brief: "Build an abstract study model that explores space through planes.",
    concept: "Sheets of paper are curved, folded and layered so walls lean, wrap and open up as you move around the model, creating a series of enclosed and open pockets of space.",
    solution: "Each side of the model reads differently: tall folded walls in back, sweeping curves in front, and small paper chairs at the base that give a sense of human scale.",
    materials: ["Paper", "Foam board base"],
    software: ["Hand built"],
    images: [
      { src: "images/paper-study-model/view-1.jpg", caption: "Front view with scale figures" },
      { src: "images/paper-study-model/view-2.jpg", caption: "Side view" },
      { src: "images/paper-study-model/view-3.jpg", caption: "Rear view" },
      { src: "images/paper-study-model/view-4.jpg", caption: "Opposite side view" }
    ]
  },
  {
    slug: "sketches-and-studies",
    title: "Sketches & Studies",
    category: "Drawing & Models",
    type: "Pen and ink, marker and perspective",
    year: "",
    course: "",
    size: "",
    style: "Hand drawn",
    summary: "Pen-and-ink vignettes, marker material studies and perspective sketches from my drawing practice.",
    brief: "",
    concept: "",
    solution: "A pen-and-ink vignette of a lounge chair beside a credenza uses hatching to describe light, shadow and texture. A marker study renders wood cabinetry against a dark wall. A one-point perspective sketch lays out a living room with a fireplace, lounge chairs and a sofa.",
    materials: ["Fine-line ink pens", "Prismacolor art markers", "Graphite"],
    software: ["Hand drawn"],
    images: [
      { src: "images/sketches-and-studies/pen-and-ink-vignette.jpg", caption: "Pen-and-ink vignette" },
      { src: "images/sketches-and-studies/marker-cabinet-study.jpg", caption: "Marker rendering study of wood cabinetry" },
      { src: "images/sketches-and-studies/one-point-perspective.jpg", caption: "One-point perspective, living room" }
    ]
  }
];
