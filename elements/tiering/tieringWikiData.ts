export type TierEntry = {
  tierNumber: string;
  tierName: string;
  fullTitle: string;
  description: string;
  keyPoints: string[];
  limitations: string[];
};

export type TierBracket = {
  id: string;
  title: string;
  range: string;
  description: string;
  entries: TierEntry[];
};

export const tierBrackets: TierBracket[] = [
  {
    id: "inert-basic-life",
    title: "Inert & Basic Life",
    range: "Tier 24 to Tier 22",
    description:
      "The baseline of the system, covering passive existence, sub-human organisms, and standard human capability.",
    entries: [
      {
        tierNumber: "24",
        tierName: "Non-Living",
        fullTitle: "Non-Living - Tier 24",
        description:
          "Entities or objects with no autonomous action, no agency, and no independent interaction.",
        keyPoints: [
          "No will, instinct, or self-directed action",
          "Can still possess scale, durability, or dangerous energy",
          "Absolute passive baseline of the system",
        ],
        limitations: [
          "Cannot act independently",
          "Cannot strategize or react meaningfully",
          "No living or cognitive interaction",
        ],
      },
      {
        tierNumber: "23",
        tierName: "Sub-Human",
        fullTitle: "Sub-Human - Tier 23",
        description:
          "Living beings below average human capability, from microorganisms and insects to weak or impaired animals and humans.",
        keyPoints: [
          "Possesses life and basic interaction",
          "Below human physical and cognitive standards",
          "Includes Low / Medium / High Sub-Human subdivisions",
        ],
        limitations: [
          "Cannot consistently match human-level performance",
          "Limited adaptability and intelligence",
          "Low overall impact",
        ],
      },
      {
        tierNumber: "22",
        tierName: "Human",
        fullTitle: "Human - Tier 22",
        description:
          "Standard human-level interaction and capability, bounded by natural biological constraints.",
        keyPoints: [
          "Baseline intelligent life in the system",
          "Introduces strategy, tool use, and balanced cognition",
          "Includes Low Human, Human, and High Human",
        ],
        limitations: [
          "Bound by natural biology",
          "No true superhuman interaction",
          "Cannot exceed normal physical limits consistently",
        ],
      },
    ],
  },
  {
    id: "enhanced",
    title: "Enhanced",
    range: "Tier 21 to Tier 20",
    description:
      "The transition from natural human limits into clear superhuman capability and significant environmental destruction.",
    entries: [
      {
        tierNumber: "21",
        tierName: "Superhuman",
        fullTitle: "Superhuman - Tier 21",
        description:
          "Entities that clearly exceed human limits while remaining on localized scales.",
        keyPoints: [
          "Consistently beyond peak human capability",
          "Can reach wall-breaking or building-level interaction",
          "First strong leap beyond biological limits",
        ],
        limitations: [
          "Still localized in environmental effect",
          "Not yet broad structural or regional scale",
          "Cannot reshape large zones consistently",
        ],
      },
      {
        tierNumber: "20",
        tierName: "Structural",
        fullTitle: "Structural - Tier 20",
        description:
          "The first tier where destruction and interaction extend meaningfully across large structures and districts.",
        keyPoints: [
          "Affects large man-made or natural structures",
          "Moves beyond isolated buildings",
          "Includes Low Structural, Structural, and High Structural",
        ],
        limitations: [
          "Still not geographic in scope",
          "Cannot affect countries or continents",
          "Below true regional interaction",
        ],
      },
    ],
  },
  {
    id: "planetary",
    title: "Planetary",
    range: "Tier 19 to Tier 18",
    description:
      "Large-scale geographic interaction rising into complete planetary influence.",
    entries: [
      {
        tierNumber: "19",
        tierName: "Regional",
        fullTitle: "Regional - Tier 19",
        description:
          "Large-scale influence over major landmasses, nations, and continents without reaching full planetary systems.",
        keyPoints: [
          "Fits major disaster and landmass-level interaction",
          "Includes city, country, and continent-scale subdivisions",
          "Bridges structural and planetary scaling",
        ],
        limitations: [
          "Still not a full-world system tier",
          "Cannot fully influence atmosphere, gravity, or total planetary structure",
        ],
      },
      {
        tierNumber: "18",
        tierName: "Planetary",
        fullTitle: "Planetary - Tier 18",
        description:
          "Interaction with an entire planetary system or equivalent full-world structure.",
        keyPoints: [
          "Can affect a full planet as a whole",
          "Includes atmosphere, core, and gravity systems",
          "True world-scale interaction",
        ],
        limitations: [
          "Still below stellar-scale objects",
          "Does not yet reach stars or larger cosmic systems",
        ],
      },
    ],
  },
  {
    id: "cosmic",
    title: "Cosmic",
    range: "Tier 17 to Tier 15",
    description:
      "The domain of stars, complete star systems, and star clusters across interstellar space.",
    entries: [
      {
        tierNumber: "17C–17A",
        tierName: "Star",
        fullTitle: "Star Tier - Tier 17C to 17A",
        description:
          "Interaction with stellar bodies and equivalent energy outputs, from low-end stellar objects to massive stars and stellar black holes.",
        keyPoints: [
          "Low Star includes weak stellar bodies and near-stellar outputs",
          "Star includes average stars and standard stellar interaction",
          "High Star includes massive stars, stellar black holes, and stronger stellar events",
        ],
        limitations: [
          "Still limited to individual stellar bodies or equivalent outputs",
          "Does not yet dominate full gravitational systems",
        ],
      },
      {
        tierNumber: "16C–16A",
        tierName: "Star System",
        fullTitle: "Star System Tier - Tier 16C to 16A",
        description:
          "Influence over complete gravitational systems containing stars, planets, satellites, and their full dynamic field.",
        keyPoints: [
          "Low Star System covers smaller and simpler systems",
          "Star System covers full solar-system-scale interaction",
          "High Star System dominates complete systems and can exceed them",
        ],
        limitations: [
          "Still limited to isolated systems",
          "Does not yet scale to large interstellar clusters",
        ],
      },
      {
        tierNumber: "15C–15A",
        tierName: "Star Cluster",
        fullTitle: "Star Cluster Tier - Tier 15C to 15A",
        description:
          "Multi-system interaction across interstellar distances, affecting huge populations of stars and reaching visible portions of galaxies.",
        keyPoints: [
          "Low Star Cluster affects many systems at once",
          "Star Cluster spans massive stellar populations",
          "High Star Cluster reaches significant visible galactic portions",
        ],
        limitations: [
          "Still not full galactic dominance",
          "Below true Galaxy-tier totality",
        ],
      },
    ],
  },
  {
    id: "galactic",
    title: "Galactic",
    range: "Tier 14 to Tier 12",
    description:
      "Scaling across galaxies, galaxy clusters, and the largest known cosmic structures.",
    entries: [
      {
        tierNumber: "14C–14A",
        tierName: "Galaxy",
        fullTitle: "Galaxy Tier - Tier 14C to 14A",
        description:
          "Interaction with a galaxy and its dynamics, from partial galactic influence to complete galactic dominance.",
        keyPoints: [
          "Low Galaxy affects large galaxies without total control",
          "Galaxy fully rivals a galaxy’s structure and dynamics",
          "High Galaxy extends beyond one galaxy toward nearby ones",
        ],
        limitations: [
          "Still smaller than multi-galaxy structures",
          "Not yet cluster-level",
        ],
      },
      {
        tierNumber: "13C–13A",
        tierName: "Galaxy Cluster",
        fullTitle: "Galaxy Cluster Tier - Tier 13C to 13A",
        description:
          "Interaction with groups and clusters of galaxies, extending from local groups to supercluster-scale influence.",
        keyPoints: [
          "Low Galaxy Cluster affects small galaxy groups",
          "Galaxy Cluster reaches thousands of galaxies",
          "High Galaxy Cluster reaches most superclusters",
        ],
        limitations: [
          "Still below the full cosmic web scale",
          "Not yet supercluster-complex totality",
        ],
      },
      {
        tierNumber: "12C–12A",
        tierName: "Supercluster Complex",
        fullTitle: "Supercluster Complex Tier - Tier 12C to 12A",
        description:
          "The largest known cosmic structures, including superclusters, voids, and cosmic web-scale systems.",
        keyPoints: [
          "Low Supercluster Complex affects multiple superclusters",
          "Supercluster Complex reaches cosmic-web structures",
          "High Supercluster Complex spans most superclusters and major voids",
        ],
        limitations: [
          "Still not a full universal structure",
          "Below observable-universe totality",
        ],
      },
    ],
  },
  {
    id: "universal",
    title: "Universal",
    range: "Tier 11 to Tier 10",
    description:
      "The threshold where cosmic structures give way to full universe-scale interaction.",
    entries: [
      {
        tierNumber: "11C–11A",
        tierName: "Small / Observable Universe",
        fullTitle: "Small / Observable Universe - Tier 11C to 11A",
        description:
          "Interaction with the observable universe and everything measurable within it.",
        keyPoints: [
          "Low Small Universe affects large observable portions",
          "Small Universe reaches the full observable universe",
          "High Small Universe exceeds observable scale and approaches true universal size",
        ],
        limitations: [
          "Still tied to observable or measurable cosmology",
          "Not yet full theoretical universal totality",
        ],
      },
      {
        tierNumber: "10C–10A",
        tierName: "Universal",
        fullTitle: "Universal Tier - Tier 10C to 10A",
        description:
          "Full cosmological scaling, from affecting portions of a full universe to partial 4D interaction beyond a single universe.",
        keyPoints: [
          "Low Universal affects portions of a full universe",
          "Universal fully matches an entire universe including space and time",
          "High Universal rises above one universe and partially touches 4D structure",
        ],
        limitations: [
          "Still below complete 4D-complete hierarchy",
          "Does not yet reach full higher-dimensional totality",
        ],
      },
    ],
  },
  {
    id: "dimensional",
    title: "Dimensional",
    range: "Tier 9 to Tier 2",
    description:
      "The higher-dimensional part of the system, from 4D universal structures all the way to finite but extreme hyperversal stacking.",
    entries: [
      {
        tierNumber: "9C–9A",
        tierName: "Complex Universal",
        fullTitle: "Complex Universal - Tier 9C to 9A",
        description:
          "Interaction with 4D aspects of a universe, from partial timeline or alternate-reality influence to full 4D structure contact.",
        keyPoints: [
          "Low Complex Universal affects only part of a 4D axis",
          "Complex Universal fully interacts with one 4D axis",
          "High Complex Universal fully affects a complete 4D structure and begins touching 5D",
        ],
        limitations: [
          "Still below true multiversal totality",
          "Cannot fully comprehend or dominate complete 5D multiversal structure",
        ],
      },
      {
        tierNumber: "8C–8A",
        tierName: "Multiversal",
        fullTitle: "Multiversal - Tier 8C to 8A",
        description:
          "Interaction with 5D multiversal structure, from partial multiversal perception to surpassing a single multiverse.",
        keyPoints: [
          "Low Multiversal partially affects multiversal structures",
          "Multiversal fully controls timelines and alternate realities",
          "High Multiversal surpasses one multiverse and interacts across multiple frameworks",
        ],
        limitations: [
          "Still below 6D-complete structures",
          "Cannot dominate higher-dimensional hierarchy yet",
        ],
      },
      {
        tierNumber: "7C–7A",
        tierName: "Complex Multiversal",
        fullTitle: "Complex Multiversal - Tier 7C to 7A",
        description:
          "Interaction with multiple multiversal structures in a 6D framework, bridging into qualitative higher-order reality.",
        keyPoints: [
          "Low Complex Multiversal is a transitional 5D-to-6D tier",
          "Complex Multiversal fully controls infinite multiverses within 6D structure",
          "High Complex Multiversal surpasses 6D and reaches higher-order influence",
        ],
        limitations: [
          "Still below true qualitative megaversal transcendence",
          "Not yet within explicit 7D-order frameworks",
        ],
      },
      {
        tierNumber: "6C–6A",
        tierName: "Inferior Order Megaversal",
        fullTitle: "Inferior Order Megaversal - Tier 6C to 6A",
        description:
          "The first true layer of qualitative transcendence beyond multiversal systems, centered on 7D structures.",
        keyPoints: [
          "Low Inferior Megaversal partially affects 7D structure",
          "Inferior Megaversal fully interacts with frameworks containing infinite 6D systems",
          "High Inferior Megaversal surpasses 7D and begins reaching 8D-order structures",
        ],
        limitations: [
          "Still below broader 8D–9D megaversal stacking",
          "Not yet in the higher megaversal orders above it",
        ],
      },
      {
        tierNumber: "5C–5A",
        tierName: "Megaversal",
        fullTitle: "Megaversal - Tier 5C to 5A",
        description:
          "Expansion into 8D–9D layered structures where multiple layers of transcendence are directly controlled.",
        keyPoints: [
          "Low Megaversal operates inside 8D structures",
          "Megaversal fully controls 8D–9D layered systems",
          "High Megaversal surpasses 9D and begins touching 10D+ structures",
        ],
        limitations: [
          "Still below superior-order megaversal abstraction",
          "Not yet at 10D/11D-oriented systems",
        ],
      },
      {
        tierNumber: "4C–4A",
        tierName: "Superior Order Megaversal",
        fullTitle: "Superior Order Megaversal - Tier 4C to 4A",
        description:
          "A more abstract megaversal order spanning 9D–10D systems and increasing structural dominance.",
        keyPoints: [
          "Low Superior Megaversal partially affects 10D structures",
          "Superior Megaversal fully controls 9D–10D systems",
          "High Superior Megaversal surpasses 10D and begins affecting 11D",
        ],
        limitations: [
          "Still below the explicit 11D complex-megaversal stage",
          "Not yet touching 12D+ hyperversal threshold",
        ],
      },
      {
        tierNumber: "3C–3A",
        tierName: "Complex Megaversal",
        fullTitle: "Complex Megaversal - Tier 3C to 3A",
        description:
          "The 11D megaversal stage where dimensional hierarchy becomes highly abstract and begins to brush the 12D+ threshold.",
        keyPoints: [
          "Low Complex Megaversal partially interacts with 11D",
          "Complex Megaversal fully interacts with 11D structures",
          "High Complex Megaversal surpasses 11D and begins touching 12D+",
        ],
        limitations: [
          "Still finite in dimensional hierarchy",
          "Below true hyperversal scaling",
        ],
      },
      {
        tierNumber: "2C–2A",
        tierName: "Hyperversal",
        fullTitle: "Hyperversal - Tier 2C to 2A",
        description:
          "Extremely high-dimensional scaling where dimensional stacking becomes vast and approaches the infinite-dimensional threshold.",
        keyPoints: [
          "Low Hyperversal operates in very high-dimensional but finite systems",
          "Hyperversal fully operates across arbitrarily high dimensions",
          "High Hyperversal nears the infinite-dimensional threshold",
        ],
        limitations: [
          "Still not infinite-dimensional",
          "Below omniversal and transcendental existence",
        ],
      },
    ],
  },
  {
    id: "transcendental",
    title: "Transcendental",
    range: "Tier 1 to Tier Ω",
    description:
      "The top bracket, covering infinite-dimensional operation and then true transcendence beyond dimensional logic itself.",
    entries: [
      {
        tierNumber: "1C–1A",
        tierName: "Omniversal",
        fullTitle: "Omniversal - Tier 1C to 1A",
        description:
          "Infinite-dimensional interaction across all hierarchical layers, still existing inside dimensional logic.",
        keyPoints: [
          "Low Omniversal interacts with infinite-dimensional structures",
          "Omniversal fully operates across infinite dimensions and all hierarchies",
          "High Omniversal imposes structure over the omniverse with hierarchical dominance",
        ],
        limitations: [
          "Still exists within dimensional logic",
          "Does not transcend dimensions or hierarchy themselves",
        ],
      },
      {
        tierNumber: "0",
        tierName: "Narrative Transcendental (Outerversal)",
        fullTitle: "Narrative Transcendental (Outerversal) - Tier 0",
        description:
          "Existence beyond dimensions, hierarchies, and mathematical scaling. Infinite-dimensional beings become irrelevant from this standpoint.",
        keyPoints: [
          "Beyond dimensions",
          "Beyond hierarchies",
          "Beyond mathematical scaling",
        ],
        limitations: [
          "Not a progression tier in the usual dimensional sense",
          "Should not be treated like a simple numerical upgrade from Tier 1A",
        ],
      },
      {
        tierNumber: "Ω",
        tierName: "Absolute Narrative Transcendental (Boundless)",
        fullTitle: "Absolute Narrative Transcendental (Boundless) - Tier Ω",
        description:
          "Beyond all concepts, all scaling, and even irrelevance itself. This is the absolute ceiling of the system.",
        keyPoints: [
          "Beyond all concepts",
          "Beyond all scaling",
          "Represents the true absolute of the system",
        ],
        limitations: [
          "Only one entity can exist at this level",
          "No entity can reach it through progression",
        ],
      },
    ],
  },
];