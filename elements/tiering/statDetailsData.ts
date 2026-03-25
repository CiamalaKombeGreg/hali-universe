import type { StatModalData } from "./statModalTypes";

const tierScale = [
  { tier: "Tier 24", name: "Inanimate", base: 1, subdivide: false },
  { tier: "Tier 23", name: "Sub-Human", base: 2 },
  { tier: "Tier 22", name: "Human", base: 3 },
  { tier: "Tier 21", name: "Superhuman", base: 4 },
  { tier: "Tier 20", name: "Structural", base: 5 },
  { tier: "Tier 19", name: "Regional", base: 6 },
  { tier: "Tier 18", name: "Planetary", base: 7 },
  { tier: "Tier 17", name: "Star", base: 8 },
  { tier: "Tier 16", name: "Star System", base: 9 },
  { tier: "Tier 15", name: "Star Cluster", base: 10 },
  { tier: "Tier 14", name: "Galaxy", base: 11 },
  { tier: "Tier 13", name: "Galaxy Cluster", base: 12 },
  { tier: "Tier 12", name: "Supercluster Complex", base: 13 },
  { tier: "Tier 11", name: "Small / Observable Universe", base: 14 },
  { tier: "Tier 10", name: "Universal", base: 15 },
  { tier: "Tier 9", name: "Complex Universal", base: 16 },
  { tier: "Tier 8", name: "Multiversal", base: 17 },
  { tier: "Tier 7", name: "Complex Multiversal", base: 18 },
  { tier: "Tier 6", name: "Inferior Order Megaversal", base: 19 },
  { tier: "Tier 5", name: "Megaversal", base: 20 },
  { tier: "Tier 4", name: "Superior Order Megaversal", base: 21 },
  { tier: "Tier 3", name: "Complex Megaversal", base: 22 },
  { tier: "Tier 2", name: "Hyperversal", base: 23 },
  { tier: "Tier 1", name: "Omniversal", base: 24 },
  { tier: "Tier 0", name: "Outerversal", base: 99, subdivide: false },
  { tier: "Tier Ω", name: "Boundless", base: 999, subdivide: false },
];

const standardTierRows = tierScale.flatMap((entry) => {
  // ❌ No subdivision tiers
  if (entry.subdivide === false) {
    return [
      {
        name: entry.name,
        tier: entry.tier,
        value: entry.base.toFixed(1),
      },
    ];
  }

  // ✅ Normal tiers (Low / Base / High)
  return [
    {
      name: `Low ${entry.name}`,
      tier: entry.tier,
      value: entry.base.toFixed(1),
    },
    {
      name: entry.name,
      tier: entry.tier,
      value: (entry.base + 0.3).toFixed(1),
    },
    {
      name: `High ${entry.name}`,
      tier: entry.tier,
      value: (entry.base + 0.6).toFixed(1),
    },
  ];
});

export const statDetailsData: Record<string, StatModalData> = {
  "striking-strength": {
    id: "striking-strength",
    title: "Striking Strength",
    category: "Physical Attributes",
    relevancy: "5",
    description:
      "Striking Strength measures the force behind physical attacks, such as punches, kicks, or any direct impact. It represents how much energy a character can transfer into a target through physical contact.",
    specialExplanation: [
      "This stat is directly tied to Attack Potency when damage is delivered physically.",
      "It scales cleanly with tiers because its output can be judged by how far the impact affects structures or environments.",
    ],
    specialLists: [
      {
        title: "Special Notes",
        items: [
          "Localized output",
          "Different from Destructive Capability",
          "High striking strength can coexist with low area of effect",
        ],
      },
    ],
    table: {
      type: "tier",
      title: "Standard tier ladder",
      rows: standardTierRows,
    },
  },

  "lifting-strength": {
    id: "lifting-strength",
    title: "Lifting Strength",
    category: "Physical Attributes",
    relevancy: "4",
    description:
      "Lifting Strength measures the ability to lift, carry, push, or apply force without striking. It represents raw physical force applied over time rather than instant impact.",
    specialExplanation: [
      "Unlike striking strength, lifting strength does not scale cleanly with tiers.",
      "At higher dimensions, lifting becomes increasingly abstract or meaningless, so it uses a custom denomination ladder linked to equivalent tiers.",
    ],
    table: {
      type: "tier",
      title: "Custom lifting ladder",
      rows: [
        { name: "Insubstantial", tier: "Inanimate edge cases", value: "1" },
        { name: "Weak", tier: "Sub-Human", value: "2.3" },
        { name: "Human", tier: "Human", value: "3.3" },
        { name: "Peak / Superhuman", tier: "Superhuman → Structural", value: "4.3" },
        { name: "Massive", tier: "Structural → Regional", value: "5.3" },
        { name: "Tectonic", tier: "Regional → Planetary", value: "6.3" },
        { name: "Planetary", tier: "Planetary", value: "7.3" },
        { name: "Stellar", tier: "Star → Star System", value: "9.3" },
        { name: "Cosmic", tier: "Star Cluster → Galaxy Cluster", value: "12.3" },
        { name: "Universal (Finite)", tier: "Galaxy Cluster → Small Universe", value: "14.3" },
        { name: "Near-Infinite", tier: "Low Universal", value: "15" },
        { name: "Infinite", tier: "Universal → High Universal", value: "15.6" },
        { name: "Immeasurable", tier: "Above High Universal (4D+)", value: "24" },
        { name: "Inapplicable", tier: "Outerversal / Boundless", value: "999" },
      ],
    },
  },

  durability: {
    id: "durability",
    title: "Durability",
    category: "Physical Attributes",
    relevancy: "5",
    description:
      "Durability measures a character’s ability to withstand damage without being physically harmed or destroyed. It is the defensive counterpart to Striking Strength and Attack Potency.",
    specialExplanation: [
      "Durability is resistance, not recovery.",
      "It does not include healing or regeneration.",
      "It also does not include pain tolerance, which belongs to Endurance.",
    ],
    specialLists: [
      {
        title: "Key Notes",
        items: [
          "High durability does not equal immunity",
          "Can be bypassed by hax",
          "Can be bypassed by internal attacks",
          "Can be bypassed by conceptual damage",
        ],
      },
    ],
    table: {
      type: "tier",
      title: "Standard durability ladder",
      rows: standardTierRows,
    },
  },

  endurance: {
    id: "endurance",
    title: "Endurance",
    category: "Physical Attributes",
    relevancy: "4",
    description:
      "Endurance represents the ability to continue functioning despite damage, pain, fatigue, or system failure. It measures how long a character can keep going while already suffering.",
    specialExplanation: [
      "Durability is about resisting damage.",
      "Endurance is about continuing to function despite damage.",
    ],
    table: {
      type: "tier",
      title: "Endurance ladder",
      rows: [
        { name: "Insubstantial", tier: "Inanimate", value: "1" },
        { name: "Fragile", tier: "Sub-Human", value: "2.3" },
        { name: "Human", tier: "Human", value: "3.3" },
        { name: "Peak / Superhuman", tier: "Superhuman → Structural", value: "5.3" },
        { name: "Extreme", tier: "Structural → Regional", value: "6.3" },
        { name: "Monstrous", tier: "Regional → Planetary", value: "7.3" },
        { name: "Indomitable", tier: "Planetary → Star", value: "8.3" },
        { name: "Cosmic", tier: "Star → Galaxy Cluster", value: "12.3" },
        { name: "Universal (Finite)", tier: "Galaxy Cluster → Small Universal", value: "14.3" },
        { name: "Near-Infinite", tier: "Small universal → Low Universal", value: "15" },
        { name: "Infinite", tier: "Above Universal (4D+)", value: "17" },
        { name: "Immeasurable", tier: "Above 5D (Complex Multiversal+)", value: "24" },
        { name: "Inapplicable", tier: "Outerversal / Boundless", value: "999" },
      ],
    },
  },

  stamina: {
    id: "stamina",
    title: "Stamina",
    category: "Physical Attributes",
    relevancy: "4",
    description:
      "Stamina measures a character’s energy reserves and how long they can perform actions before becoming exhausted. It governs sustained action over time.",
    specialExplanation: [
      "Stamina is how long you can act.",
      "Endurance is how well you act while damaged.",
    ],
    table: {
      type: "tier",
      title: "Stamina ladder",
      rows: [
        { name: "Insubstantial", tier: "Inanimate", value: "1" },
        { name: "Weak", tier: "Sub-Human", value: "2.3" },
        { name: "Human", tier: "Human", value: "3.3" },
        { name: "Peak / Superhuman", tier: "Superhuman → Structural", value: "5.3" },
        { name: "High", tier: "Structural → Regional", value: "6.3" },
        { name: "Massive", tier: "Regional → Planetary", value: "7.3" },
        { name: "Colossal", tier: "Planetary → Star", value: "8.3" },
        { name: "Cosmic", tier: "Star → Galaxy Cluster", value: "12.3" },
        { name: "Universal (Finite)", tier: "Galaxy Cluster → Small Universe", value: "14.3" },
        { name: "Near-Infinite", tier: "Low Universal → Universal", value: "15.3" },
        { name: "Infinite", tier: "Above Universal (4D+)", value: "17" },
        { name: "Immeasurable", tier: "Above 5D (Complex Multiversal+)", value: "24" },
        { name: "Inapplicable", tier: "Outerversal / Boundless", value: "999" },
      ],
    },
  },

  "body-constitution": {
    id: "body-constitution",
    title: "Body Constitution",
    category: "Physical Attributes",
    relevancy: "2–7 (Contextual)",
    description:
      "Body Constitution defines what a character is physically and existentially made of. It modifies how other stats behave, what can affect the character, and how the character interacts with reality.",
    specialExplanation: [
      "This is a modifier stat, not a magnitude stat.",
      "It does not scale directly in tiers.",
      "Composition can override normal stat interaction rules.",
    ],
    specialLists: [
      {
        title: "Composition Types",
        items: [
          "Organic",
          "Inorganic",
          "Semi-Organic",
          "Virtual",
          "Exotic",
          "Divine",
          "Energy-Based",
          "Conceptual",
          "Dimensional",
          "Void / Non-Existence",
        ],
      },
      {
        title: "Important Rules",
        items: [
          "Composition can override stats",
          "Race does not automatically determine tier",
          "Hybrid compositions can create both strengths and weaknesses",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Constitution-related sublayers",
      rows: [
        { name: "Average Appearance", value: "1" },
        { name: "Out of Ordinary Appearance", value: "2" },
        { name: "Monstrous Appearance", value: "3" },
        { name: "Incomprehensible Appearance", value: "4" },
        { name: "Race Influence (Contextual)", value: "3–6" },
      ],
    },
  },

  "running-speed": {
    id: "running-speed",
    title: "Running / Travel Speed",
    category: "Speed & Mobility",
    relevancy: "5",
    description:
      "Running / Travel Speed measures how fast a character can move across space over time. It governs traversal, positioning, chase situations, and escape potential.",
    specialExplanation: [
      "This is pure movement speed.",
      "It is separate from Reflex and separate from Agility.",
      "Past relativistic values, the system becomes non-linear and should not be treated like a simple extension of Mach values.",
    ],
    specialLists: [
      {
        title: "Critical Rules",
        items: [
          "Speed does not equal reaction",
          "FTL is not linear",
          "Infinite speed is not omnipresence",
          "Dimensional speed levels break normal motion logic",
        ],
      },
    ],
    table: {
      type: "tier",
      title: "Travel speed ladder",
      rows: [
        { name: "Immobile", tier: "No movement", value: "0" },
        { name: "Below Human Average", tier: "Sub-Human", value: "1" },
        { name: "Average Human", tier: "Low Human", value: "2" },
        { name: "Athletic", tier: "Human", value: "2.3" },
        { name: "Peak Human", tier: "High Human", value: "2.6" },
        { name: "Superhuman", tier: "Superhuman", value: "4" },
        { name: "Subsonic", tier: "Structural", value: "5.3" },
        { name: "Subsonic+", tier: "High Structural", value: "5.6" },
        { name: "Transonic", tier: "Low Regional", value: "6" },
        { name: "Supersonic", tier: "Regional", value: "6.3" },
        { name: "Supersonic+", tier: "High Regional", value: "6.6" },
        { name: "Hypersonic", tier: "Low Planetary", value: "7" },
        { name: "Hypersonic+", tier: "Planetary", value: "7.3" },
        { name: "High Hypersonic", tier: "High Planetary", value: "7.6" },
        { name: "High Hypersonic+", tier: "Low Star", value: "8" },
        { name: "Massively Hypersonic", tier: "Star", value: "8.3" },
        { name: "Massively Hypersonic+", tier: "High Star", value: "8.6" },
        { name: "Sub-Relativistic", tier: "Low Star System", value: "9" },
        { name: "Sub-Relativistic+", tier: "Star System", value: "9.3" },
        { name: "Relativistic", tier: "Low Star Cluster", value: "10" },
        { name: "Relativistic+", tier: "Star Cluster", value: "10.3" },
        { name: "Speed of Light", tier: "Low Galaxy", value: "11" },
        { name: "FTL", tier: "Galaxy", value: "11.3" },
        { name: "FTL+", tier: "High Galaxy", value: "11.6" },
        { name: "Massively FTL", tier: "Small Universe", value: "14.3" },
        { name: "Massively FTL+", tier: "Low Universal", value: "15" },
        { name: "Infinite Speed", tier: "Universal", value: "15.3" },
        { name: "Immeasurable Speed", tier: "Complex Universal", value: "16.3" },
        { name: "Irrelevant Speed", tier: "Omniversal", value: "24" },
        { name: "Omnipresent", tier: "Outerversal / Boundless", value: "999" },
      ],
    },
  },

  "explosive-speed": {
    id: "explosive-speed",
    title: "Explosive Speed (Acceleration)",
    category: "Speed & Mobility",
    relevancy: "5",
    description:
      "Explosive Speed measures how quickly a character can reach top speed, switch speeds, and begin moving with minimal delay. It is acceleration, not final velocity.",
    specialExplanation: [
      "Travel Speed = maximum velocity.",
      "Explosive Speed = time needed to reach that velocity.",
      "At very high scales, acceleration gradually loses meaning.",
    ],
    specialLists: [
      {
        title: "Why It Matters",
        items: [
          "Who strikes first",
          "Who blitzes",
          "Who reaches usable speed first",
          "Works best with high reflex",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Acceleration ladder",
      rows: [
        { name: "No Equilibrium", tier: "No movement", value: "0" },
        { name: "Delayed", tier: "Sub-Human", value: "2.3" },
        { name: "Gradual", tier: "Human", value: "3.3" },
        { name: "Reactive", tier: "Superhuman", value: "4.3" },
        { name: "Ultra-fast Burst", tier: "Regional", value: "6.3" },
        { name: "Near-Instant", tier: "Planetary", value: "7.3" },
        { name: "Instant", tier: "Galaxy", value: "11.3" },
        { name: "Infinite Acceleration", tier: "Universal", value: "15.3" },
        { name: "Immeasurable Acceleration", tier: "Above Complex Multiversal (5D+)", value: "24" },
        { name: "Irrelevant Acceleration", tier: "Outerversal / Boundless", value: "999" },
      ],
    },
  },

  agility: {
    id: "agility",
    title: "Agility",
    category: "Speed & Mobility",
    relevancy: "6",
    description:
      "Agility measures how fast and efficiently a character can move their body in combat situations. It includes attack speed, movement fluidity, direction changes, and coordination.",
    specialExplanation: [
      "Travel Speed is distance over time.",
      "Agility is execution speed of movement.",
      "It is one of the main combat-speed stats.",
    ],
    specialLists: [
      {
        title: "Important Distinctions",
        items: [
          "Agility is not Travel Speed",
          "Agility is not Reflex",
          "Agility directly affects attack speed, dodge speed, and repositioning",
        ],
      },
    ],
    table: {
      type: "tier",
      title: "Agility ladder",
      rows: [
        { name: "Immobile", tier: "Inanimate", value: "1" },
        { name: "Below Human Average", tier: "Sub-Human", value: "2.3" },
        { name: "Average Human", tier: "Human", value: "3.3" },
        { name: "Athletic", tier: "Human+", value: "3.4" },
        { name: "Peak Human", tier: "High Human", value: "3.6" },
        { name: "Superhuman", tier: "Superhuman", value: "4.3" },
        { name: "Subsonic", tier: "Structural", value: "5.3" },
        { name: "Subsonic+", tier: "High Structural", value: "5.6" },
        { name: "Transonic", tier: "Low Regional", value: "6" },
        { name: "Supersonic", tier: "Regional", value: "6.3" },
        { name: "Supersonic+", tier: "High Regional", value: "6.6" },
        { name: "Hypersonic", tier: "Low Planetary", value: "7" },
        { name: "Hypersonic+", tier: "Planetary", value: "7.3" },
        { name: "High Hypersonic", tier: "High Planetary", value: "7.6" },
        { name: "High Hypersonic+", tier: "Low Star", value: "8" },
        { name: "Massively Hypersonic", tier: "Star", value: "8.3" },
        { name: "Massively Hypersonic+", tier: "High Star", value: "8.6" },
        { name: "Sub-Relativistic", tier: "Low Star System", value: "9" },
        { name: "Sub-Relativistic+", tier: "Star System", value: "9.3" },
        { name: "Relativistic", tier: "Low Star Cluster", value: "10" },
        { name: "Relativistic+", tier: "Star Cluster", value: "10.3" },
        { name: "Speed of Light", tier: "Low Galaxy", value: "11" },
        { name: "FTL", tier: "Galaxy", value: "11.3" },
        { name: "FTL+", tier: "High Galaxy", value: "11.6" },
        { name: "Massively FTL", tier: "Galaxy Cluster", value: "12.3" },
        { name: "Massively FTL+", tier: "Small Universe", value: "14.3" },
        { name: "Infinite", tier: "Universal", value: "15.3" },
        { name: "Immeasurable", tier: "Above Complex Universal", value: "24" },
        { name: "Irrelevant", tier: "High Omniversal+ / Outerversal", value: "99" },
        { name: "Omnipresent", tier: "Boundless", value: "999" },
      ],
    },
  },

  reflex: {
    id: "reflex",
    title: "Reaction Speed / Reflex",
    category: "Speed & Mobility",
    relevancy: "6",
    description:
      "Reaction Speed measures how fast a character can perceive a stimulus, process the information, and initiate a response. It is the delay before movement begins, not movement itself.",
    specialExplanation: [
      "Reaction Time = Perception + Processing + Decision.",
      "Precognition is not just faster reaction; it bypasses normal stimulus-response order.",
    ],
    specialLists: [
      {
        title: "Key Distinctions",
        items: [
          "Reaction is not movement speed",
          "Precognition is pre-reaction, not simple reaction speed",
          "High reaction allows dodging, countering, and reading movements",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Reaction ladder",
      rows: [
        { name: "No Equilibrium", tier: "Inanimate", value: "1" },
        { name: "Delayed", tier: "Sub-Human", value: "2.3" },
        { name: "Gradual", tier: "Human", value: "3.3" },
        { name: "Reactive", tier: "Superhuman → Structural", value: "5.3" },
        { name: "Ultra-fast Burst", tier: "Structural → Planetary", value: "7.3" },
        { name: "Near-Instant", tier: "Star", value: "8.3" },
        { name: "Instant", tier: "Galaxy", value: "11.3" },
        { name: "Infinite", tier: "Universal", value: "15.3" },
        { name: "Immeasurable", tier: "Complex Universal", value: "16.3" },
        { name: "Precognition", tier: "Multiversal", value: "17.3" },
        { name: "Deep Precognition", tier: "Complex Multiversal", value: "18.3" },
        { name: "Total Precognition", tier: "Above Multiversal (5D+)", value: "24" },
        { name: "Absolute Precognition", tier: "High Omniversal+", value: "24.7" },
        { name: "Omniscient Precognition", tier: "Outerversal", value: "99" },
        { name: "Omniscient Irrelevance", tier: "Boundless", value: "999" },
      ],
    },
  },

  dexterity: {
    id: "dexterity",
    title: "Dexterity",
    category: "Speed & Mobility",
    relevancy: "4",
    description:
      "Dexterity measures how well a character can perform tasks using their hands or equivalent manipulators. It represents execution quality, fine coordination, and localized speed.",
    specialExplanation: [
      "Dexterity is not Strength, Stamina, or Intelligence.",
      "It is about how well something is done, not how much force is used.",
    ],
    specialLists: [
      {
        title: "Synergy",
        items: [
          "Works best with Intelligence",
          "Works best with Agility",
          "Strongly benefits Combat Skill",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Dexterity ladder",
      rows: [
        { name: "Total Ineptitude", tier: "Inanimate", value: "0" },
        { name: "Poor", tier: "Sub-Human", value: "2.3" },
        { name: "Average", tier: "Human", value: "3.3" },
        { name: "Skilled", tier: "Human+", value: "3.4" },
        { name: "Expert", tier: "High Human", value: "3.6" },
        { name: "Masterful", tier: "High Human+", value: "3.7" },
        { name: "Elite Master", tier: "Low Superhuman", value: "4" },
        { name: "Transcendent Skill", tier: "Superhuman → Small Universe", value: "14.3" },
        { name: "Absolute Skill", tier: "Low Universal", value: "15" },
        { name: "Universal Mastery", tier: "Universal", value: "15.3" },
        { name: "Multiversal Mastery", tier: "Multiversal", value: "17.3" },
        { name: "Transcendent Mastery", tier: "Above Multiversal", value: "24" },
        { name: "Near Total Mastery", tier: "Low Omniversal → Omniversal", value: "24.3" },
        { name: "Total Mastery", tier: "High Omniversal+ / Outerversal", value: "99" },
        { name: "Perfection", tier: "Boundless", value: "999" },
      ],
    },
  },

  "perception-awareness": {
    id: "perception-awareness",
    title: "Perception / Awareness",
    category: "Sensory & Awareness",
    relevancy: "6",
    description:
      "Perception measures how well an entity can detect, interpret, and understand surroundings, threats, and changes. It includes standard senses, extended senses, and higher awareness.",
    specialExplanation: [
      "Perception is detecting and understanding.",
      "Reaction is responding.",
      "Intelligence is deeper interpretation.",
    ],
    specialLists: [
      {
        title: "Important Rules",
        items: [
          "Perception does not guarantee reaction",
          "There is a difference between awareness and omniscience",
          "Higher perception improves ambush detection and threat reading",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Perception ladder",
      rows: [
        { name: "Oblivious", tier: "Inanimate", value: "0" },
        { name: "Dim", tier: "Sub-Human", value: "2.3" },
        { name: "Average", tier: "Human", value: "3.3" },
        { name: "Perceptive", tier: "High Human", value: "3.6" },
        { name: "Super-Perceptive", tier: "Low Superhuman", value: "4" },
        { name: "Hyper-Perceptive", tier: "Superhuman", value: "4.3" },
        { name: "Enhanced Awareness", tier: "Superhuman → Structural", value: "5.3" },
        { name: "Advanced Awareness", tier: "Structural → Planetary", value: "7.3" },
        { name: "Extreme Awareness", tier: "planetary → Star", value: "8.3" },
        { name: "Cosmic Awareness", tier: "Star → Galaxy", value: "11.3" },
        { name: "Transcendent Awareness", tier: "Galaxy → Small Universe", value: "14.3" },
        { name: "Near Universal Awareness", tier: "Low Universal", value: "15" },
        { name: "Universal Awareness", tier: "Universal", value: "15.3" },
        { name: "Complex Universal Awareness", tier: "Complex Universal", value: "16.3" },
        { name: "Multiversal Awareness", tier: "Multiversal", value: "17.3" },
        { name: "Immeasurable Awareness", tier: "Above Complex Multiversal (+6D)", value: "24" },
        { name: "Infinite Consciousness", tier: "Omniversal", value: "24.3" },
        { name: "Omniscient Awareness", tier: "Outerversal", value: "99" },
        { name: "Absolute Awareness", tier: "Boundless", value: "999" },
      ],
    },
  },

  "sensory-range": {
    id: "sensory-range",
    title: "Sensory Range",
    category: "Sensory & Awareness",
    relevancy: "4",
    description:
      "Sensory Range measures the maximum distance or scale at which a character can detect stimuli. It answers how far they can sense something.",
    specialExplanation: [
      "Sensory Range is usually equal to or greater than Perception, but that is not absolute.",
      "Range is finding the box; Perception is opening and understanding the box.",
    ],
    specialLists: [
      {
        title: "Core Rules",
        items: [
          "Range does not equal understanding",
          "Detection type matters",
          "High range without high perception can cause information overload",
        ],
      },
    ],
    table: {
      type: "tier",
      title: "Sensory range ladder",
      rows: standardTierRows,
    },
  },

  "sensory-accuracy": {
    id: "sensory-accuracy",
    title: "Sensory Accuracy",
    category: "Sensory & Awareness",
    relevancy: "5",
    description:
      "Sensory Accuracy measures how well a character correctly perceives and interprets information. It defines clarity, precision of details, and correctness of interpretation.",
    specialExplanation: [
      "Perception is how much you detect.",
      "Accuracy is how correct that information is.",
      "Accuracy is always equal to or lower than Perception in scope.",
    ],
    specialLists: [
      {
        title: "Counters",
        items: [
          "Illusions",
          "Deception",
          "Camouflage",
          "False reads and misdirection",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Accuracy ladder",
      rows: [
        { name: "0% — Null Clarity", tier: "Inanimate", value: "0" },
        { name: "10% — Distorted Clarity", tier: "Sub-Human", value: "2.3" },
        { name: "25% — Fragmented Clarity", tier: "High Sub-Human", value: "2.6" },
        { name: "50% — Approximate Clarity", tier: "Low Human", value: "3" },
        { name: "75% — Clear Clarity", tier: "Human", value: "3.3" },
        { name: "90% — High Clarity", tier: "Superhuman → Small Universe", value: "14.3" },
        { name: "100% — Perfect Clarity (3D)", tier: "Universal", value: "15.3" },
        { name: "Complex Universal Clarity", tier: "Complex Universal", value: "16.3" },
        { name: "Multiversal Clarity", tier: "Multiversal", value: "17.3" },
        { name: "Immeasurable Clarity", tier: "Complex Multiversal", value: "18.3" },
        { name: "Near Total Clarity", tier: "Above Complex Multiversal (6D+)", value: "24" },
        { name: "Total Clarity", tier: "High Omniversal+", value: "24.7" },
        { name: "Absolute Structural Clarity", tier: "Outerversal", value: "99" },
        { name: "True Clarity", tier: "Boundless", value: "999" },
      ],
    },
  },

  "global-intelligence": {
    id: "global-intelligence",
    title: "Global Intelligence",
    category: "Mental Attributes",
    relevancy: "4",
    description:
      "Global Intelligence measures broad knowledge, memory, learning capability, and overall understanding across domains.",
    specialExplanation: [
      "All three intelligence stats use the same base ladder.",
      "Global Intelligence is the broadest knowledge-oriented branch.",
    ],
    table: {
      type: "value",
      title: "Shared intelligence ladder",
      rows: [
        { name: "Mindless", tier: "Inanimate", value: "1" },
        { name: "Sub-Sentient", tier: "Low Sub-Human", value: "2" },
        { name: "Sentient", tier: "Sub-Human", value: "2.3" },
        { name: "Below Average", tier: "Low Human", value: "3" },
        { name: "Average", tier: "Human", value: "3.3" },
        { name: "Above Average", tier: "Human+", value: "3.4" },
        { name: "Gifted", tier: "High Human", value: "3.6" },
        { name: "Genius", tier: "High Human+", value: "3.7" },
        { name: "Super-Genius", tier: "Low Superhuman → High Structural", value: "5.6" },
        { name: "Transcendent Genius", tier: "Planetary → Universal", value: "15.3" },
        { name: "Intellectual Archetype", tier: "Above Universal (3D+)", value: "24" },
        { name: "Nigh Omniscient", tier: "Low Omniversal → High Omniversal", value: "24.6" },
        { name: "Omniscient", tier: "Outerversal", value: "99" },
        { name: "True Omniscient", tier: "Boundless", value: "999" },
      ],
    },
  },

  "logical-intelligence": {
    id: "logical-intelligence",
    title: "Logical Intelligence",
    category: "Mental Attributes",
    relevancy: "4",
    description:
      "Logical Intelligence measures reasoning, deduction, problem-solving, pattern recognition, and analytical depth.",
    specialExplanation: [
      "This is the branch most tied to strategy, investigation, and structured reasoning.",
      "High knowledge does not automatically mean high logical intelligence.",
    ],
    table: {
      type: "value",
      title: "Shared intelligence ladder",
      rows: [
        { name: "Mindless", tier: "Inanimate", value: "1" },
        { name: "Sub-Sentient", tier: "Low Sub-Human", value: "2" },
        { name: "Sentient", tier: "Sub-Human", value: "2.3" },
        { name: "Below Average", tier: "Low Human", value: "3" },
        { name: "Average", tier: "Human", value: "3.3" },
        { name: "Above Average", tier: "Human+", value: "3.4" },
        { name: "Gifted", tier: "High Human", value: "3.6" },
        { name: "Genius", tier: "High Human+", value: "3.7" },
        { name: "Super-Genius", tier: "Low Superhuman → High Structural", value: "5.6" },
        { name: "Transcendent Genius", tier: "Planetary → Universal", value: "15.3" },
        { name: "Intellectual Archetype", tier: "Above Universal (3D+)", value: "24" },
        { name: "Nigh Omniscient", tier: "Low Omniversal → High Omniversal", value: "24.6" },
        { name: "Omniscient", tier: "Outerversal", value: "99" },
        { name: "True Omniscient", tier: "Boundless", value: "999" },
      ],
    },
  },

  "battle-intelligence": {
    id: "battle-intelligence",
    title: "Battle Intelligence (BIQ)",
    category: "Mental Attributes",
    relevancy: "4",
    description:
      "Battle Intelligence measures combat thinking: adaptation, tactical decisions, reading opponents, exploiting weaknesses, and adjusting under pressure.",
    specialExplanation: [
      "High BIQ does not require high general intelligence.",
      "It is the application branch of intelligence inside combat.",
    ],
    table: {
      type: "value",
      title: "Shared intelligence ladder",
      rows: [
        { name: "Mindless", tier: "Inanimate", value: "1" },
        { name: "Sub-Sentient", tier: "Low Sub-Human", value: "2" },
        { name: "Sentient", tier: "Sub-Human", value: "2.3" },
        { name: "Below Average", tier: "Low Human", value: "3" },
        { name: "Average", tier: "Human", value: "3.3" },
        { name: "Above Average", tier: "Human+", value: "3.4" },
        { name: "Gifted", tier: "High Human", value: "3.6" },
        { name: "Genius", tier: "High Human+", value: "3.7" },
        { name: "Super-Genius", tier: "Low Superhuman → High Structural", value: "5.6" },
        { name: "Transcendent Genius", tier: "Planetary → Universal", value: "15.3" },
        { name: "Intellectual Archetype", tier: "Above Universal (3D+)", value: "24" },
        { name: "Nigh Omniscient", tier: "Low Omniversal → High Omniversal", value: "24.6" },
        { name: "Omniscient", tier: "Outerversal", value: "99" },
        { name: "True Omniscient", tier: "Boundless", value: "999" },
      ],
    },
  },

  willpower: {
    id: "willpower",
    title: "Willpower / Mental Resistance",
    category: "Psychological Attributes",
    relevancy: "5",
    description:
      "Willpower measures how well a character resists internal and external mental influence such as fear, manipulation, illusions, mind control, and conceptual pressure.",
    specialExplanation: [
      "Willpower = Resistance Coverage × Stability.",
      "Even extremely powerful beings can still have a mental flaw until the very top levels.",
    ],
    specialLists: [
      {
        title: "Important Distinctions",
        items: [
          "Willpower is not Intelligence",
          "Willpower is not Endurance",
          "Willpower can resist many hax, but not all hax are resistible",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Willpower ladder",
      rows: [
        { name: "Avolition", tier: "Below Average Human", value: "1" },
        { name: "Weak-Minded", tier: "Sub-Human", value: "2.3" },
        { name: "Resolved", tier: "Human", value: "3.3" },
        { name: "Tenacity", tier: "Human → High Human", value: "3.6" },
        { name: "Strong-Willed", tier: "High Human → Superhuman", value: "4.3" },
        { name: "Iron Will", tier: "Superhuman → Structural", value: "5.3" },
        { name: "Unbreakable", tier: "Structural → Planetary", value: "7.3" },
        { name: "Absolute Resolve", tier: "Planetary → Star", value: "8.3" },
        { name: "Near Self-Mastery", tier: "Small Universe → Low Universal", value: "15" },
        { name: "Self-Mastery", tier: "Universal", value: "15.3" },
        { name: "Ascendent Will", tier: "Complex Universal", value: "16.3" },
        { name: "Transcendent Will", tier: "Above Multiversal (5D+)", value: "23.6" },
        { name: "Near Indomitable Will", tier: "Low Omniversal", value: "24" },
        { name: "Indomitable Will", tier: "High Omniversal+ / Outerversal", value: "99" },
        { name: "Absolute Will", tier: "Boundless", value: "999" },
      ],
    },
  },

  "accuracy-precision": {
    id: "accuracy-precision",
    title: "Accuracy / Precision",
    category: "Psychological Attributes",
    relevancy: "4",
    description:
      "Accuracy / Precision measures how well a character executes actions with correctness and control. It includes aim, consistency, repeatability, and quality of execution.",
    specialExplanation: [
      "In this system, Precision is practical execution accuracy.",
      "It is different from Sensory Accuracy, which is about perception rather than action.",
    ],
    table: {
      type: "value",
      title: "Precision ladder",
      rows: [
        { name: "Imprecision", tier: "Inanimate", value: "0" },
        { name: "Inexact", tier: "Sub-Human", value: "2.3" },
        { name: "Average", tier: "Human", value: "3.3" },
        { name: "Meticulous", tier: "Human+", value: "3.4" },
        { name: "High Precision", tier: "High Human", value: "3.6" },
        { name: "Ultra-Precise", tier: "High Human+", value: "3.7" },
        { name: "Extreme Precision", tier: "Low Superhuman", value: "4" },
        { name: "Absolute Precision (3D Limit)", tier: "Superhuman → Regional", value: "6.3" },
        { name: "Near-Exactitude", tier: "Planetary → Low Universal", value: "15" },
        { name: "Exactitude", tier: "Universal", value: "15.3" },
        { name: "Total Exactitude", tier: "High Universal", value: "15.6" },
        { name: "Multi-Layered Precision", tier: "Complex Universal", value: "16.3" },
        { name: "Near-Perfection", tier: "Above Complex Universal (4D+)", value: "24" },
        { name: "Perfection", tier: "Outerversal", value: "99" },
        { name: "True Perfection", tier: "Boundless", value: "999" },
      ],
    },
  },

  "body-control": {
    id: "body-control",
    title: "Body Control",
    category: "Psychological Attributes",
    relevancy: "1-3 (Contextual)",
    description:
      "Body Control measures how well a character can control, regulate, and utilize their own body or interface, including motor output, internal regulation, and access to normally automatic functions.",
    specialExplanation: [
      "Its relevancy depends on whether the entity even has a body or interface.",
      "It is not a direct power multiplier; it optimizes what already exists.",
    ],
    table: {
      type: "value",
      title: "Body control ladder",
      rows: [
        { name: "Inexistent", tier: "Below Average Human", value: "1" },
        { name: "Paralysis", tier: "Sub-Human", value: "2.3" },
        { name: "Coordination Impairment", tier: "Low Human", value: "3" },
        { name: "Balanced", tier: "Human", value: "3.3" },
        { name: "Coordination", tier: "High Human", value: "3.6" },
        { name: "Advanced Coordination", tier: "Low Superhuman", value: "4" },
        { name: "Proprioception", tier: "Superhuman", value: "4.3" },
        { name: "Near-Supremacy", tier: "High Superhuman", value: "4.6" },
        { name: "Supremacy", tier: "Above High Superhuman", value: "Variable" },
      ],
    },
  },

  experience: {
    id: "experience",
    title: "Experience",
    category: "Psychological Attributes",
    relevancy: "3",
    description:
      "Experience measures the quantity and diversity of events, situations, and interactions an entity has undergone, and how those experiences shaped them.",
    specialExplanation: [
      "Experience is exposure, not intelligence and not battle IQ.",
      "A character can know something without experiencing it, and can experience something without understanding it.",
    ],
    specialLists: [
      {
        title: "Important Distinction",
        items: [
          "Intelligence = Understanding",
          "Experience = Exposure",
          "Battle IQ = Application",
        ],
      },
    ],
    table: {
      type: "tier",
      title: "Experience ladder",
      rows: [
        { name: "Rawness", tier: "Inanimate", value: "1" },
        { name: "Inexperienced", tier: "Sub-Human → Human", value: "2" },
        { name: "Experienced", tier: "Human", value: "3" },
        { name: "Skilled", tier: "Human+", value: "4" },
        { name: "Expert", tier: "Advanced Human", value: "5" },
        { name: "Masterful", tier: "Peak Human", value: "6" },
        { name: "Virtuoso", tier: "Peak Human+", value: "7" },
        { name: "Transcendent Experience", tier: "Superhuman → Structural", value: "8" },
        { name: "Near Universal Proficiency", tier: "Small Universe → Low Universal", value: "9" },
        { name: "Universal Proficiency", tier: "Universal", value: "10" },
        { name: "Limitless Proficiency", tier: "Complex Universal+", value: "11" },
        { name: "Infinite Proficiency", tier: "High Omniversal", value: "12" },
        { name: "Absolute Proficiency", tier: "Outerversal", value: "13" },
        { name: "True Absolute Proficiency", tier: "Boundless", value: "14" },
      ],
    },
  },

  "emotional-control": {
    id: "emotional-control",
    title: "Emotional Control",
    category: "Psychological Attributes",
    relevancy: "2",
    description:
      "Emotional Control measures how well a character regulates fear, rage, panic, obsession, instability, and emotional influence while remaining functional.",
    specialExplanation: [
      "This is not the same as Willpower.",
      "Willpower is resistance under pressure; Emotional Control is stable regulation of one’s emotional state.",
    ],
    table: {
      type: "value",
      title: "Emotional control ladder",
      rows: [
        { name: "Unstable", value: "1" },
        { name: "Volatile", value: "2" },
        { name: "Baseline", value: "3" },
        { name: "Disciplined", value: "4" },
        { name: "Composed", value: "5" },
        { name: "Tempered", value: "6" },
        { name: "Unshaken", value: "7" },
        { name: "Emotionally Sovereign", value: "8" },
        { name: "Transcendent Regulation", value: "9" },
      ],
    },
  },

  charisma: {
    id: "charisma",
    title: "Charisma",
    category: "Social Attributes",
    relevancy: "1–2",
    description:
      "Charisma measures leadership presence, influence over groups, and the ability to inspire, dominate, or draw others through force of presence.",
    specialExplanation: [
      "Charisma is broad influence and presence, not intimate persuasion.",
      "It has low direct combat relevancy but can strongly affect narrative or social settings.",
    ],
    table: {
      type: "value",
      title: "Charisma ladder",
      rows: [
        { name: "Repellent", value: "1" },
        { name: "Forgettable", value: "2" },
        { name: "Ordinary", value: "3" },
        { name: "Likable", value: "4" },
        { name: "Influential", value: "5" },
        { name: "Commanding", value: "6" },
        { name: "Magnetic", value: "7" },
        { name: "Legendary Presence", value: "8" },
      ],
    },
  },

  charm: {
    id: "charm",
    title: "Charm",
    category: "Social Attributes",
    relevancy: "1",
    description:
      "Charm measures personal appeal in one-on-one or intimate interactions, including persuasion, seduction, and disarming presence.",
    specialExplanation: [
      "Charm is narrower than Charisma.",
      "It is strongest in close personal interactions rather than broad leadership.",
    ],
    table: {
      type: "value",
      title: "Charm ladder",
      rows: [
        { name: "Off-Putting", value: "1" },
        { name: "Awkward", value: "2" },
        { name: "Ordinary", value: "3" },
        { name: "Pleasant", value: "4" },
        { name: "Seductive / Persuasive", value: "5" },
        { name: "Captivating", value: "6" },
        { name: "Irresistible", value: "7" },
      ],
    },
  },

  "combat-skills": {
    id: "combat-skills",
    title: "Combat Skills",
    category: "Combat Fundamentals",
    relevancy: "5",
    description:
      "Combat Skills measure how well a character fights using martial arts, weapons, tactics, positioning, timing, and technique application.",
    specialExplanation: [
      "Combat skill is not raw power.",
      "A weaker fighter can outperform a stronger opponent through superior technique, timing, and adaptation.",
    ],
    table: {
      type: "value",
      title: "Combat skill ladder",
      rows: [
        { name: "Untrained", value: "1" },
        { name: "Basic", value: "2" },
        { name: "Competent", value: "3" },
        { name: "Skilled", value: "4" },
        { name: "Expert", value: "5" },
        { name: "Master", value: "6" },
        { name: "Grandmaster", value: "7" },
        { name: "Mythic Fighter", value: "8" },
        { name: "Transcendent Combatant", value: "9" },
      ],
    },
  },

  "defensive-capabilities": {
    id: "defensive-capabilities",
    title: "Defensive Capabilities",
    category: "Combat Fundamentals",
    relevancy: "5",
    description:
      "Defensive Capabilities measure how well a character avoids, blocks, redirects, or nullifies incoming attacks through skill or active defense.",
    specialExplanation: [
      "This is distinct from Durability.",
      "Durability is taking the hit; Defensive Capabilities are stopping the hit from landing effectively in the first place.",
    ],
    table: {
      type: "value",
      title: "Defensive ladder",
      rows: [
        { name: "No Defense", value: "1" },
        { name: "Basic Guard", value: "2" },
        { name: "Trained Defense", value: "3" },
        { name: "Refined Defense", value: "4" },
        { name: "Advanced Guard", value: "5" },
        { name: "Elite Defense", value: "6" },
        { name: "Perfect Defense", value: "7" },
        { name: "Negation-Level Defense", value: "8" },
      ],
    },
  },

  "attack-potency": {
    id: "attack-potency",
    title: "Attack Potency (AP)",
    category: "Offensive Metrics",
    relevancy: "5",
    description:
      "Attack Potency measures a character’s consistent damage output — how much force or effective destructive power their attacks can apply against valid targets.",
    specialExplanation: [
      "AP is not the same as DC.",
      "A character can have high AP and low environmental destruction if their output is highly concentrated.",
    ],
    table: {
      type: "tier",
      title: "Standard AP ladder",
      rows: standardTierRows,
    },
  },

  "maximum-attack-potency": {
    id: "maximum-attack-potency",
    title: "Maximum Attack Potency",
    category: "Offensive Metrics",
    relevancy: "5",
    description:
      "Maximum Attack Potency measures the highest attack output a character can produce under peak conditions, even if it is not sustainable or normally repeatable.",
    specialExplanation: [
      "This is peak output, not default combat output.",
      "It should not replace standard Attack Potency unless the peak is realistically usable and repeatable.",
    ],
    table: {
      type: "tier",
      title: "Peak AP ladder",
      rows: standardTierRows,
    },
  },

  "destructive-capabilities": {
    id: "destructive-capabilities",
    title: "Destructive Capabilities (DC)",
    category: "Offensive Metrics",
    relevancy: "4",
    description:
      "Destructive Capabilities measure the spread of damage an attack creates in the environment — how much area or structure is destroyed, not merely how concentrated the attack is.",
    specialExplanation: [
      "DC is spread of destruction.",
      "Striking Strength and AP can exceed DC when output is focused on a small target.",
    ],
    table: {
      type: "tier",
      title: "Standard DC ladder",
      rows: standardTierRows,
    },
  },

  range: {
    id: "range",
    title: "Range",
    category: "Range & Influence",
    relevancy: "5–6",
    description:
      "Range measures the maximum distance at which a character or ability can affect a target. It is about reach, not necessarily area.",
    specialExplanation: [
      "Range is not AoE.",
      "An attack may have high range but very narrow influence, or low range but huge spread.",
    ],
    table: {
      type: "tier",
      title: "Standard range ladder",
      rows: standardTierRows,
    },
  },

  aoe: {
    id: "aoe",
    title: "Area of Effect (AoE)",
    category: "Range & Influence",
    relevancy: "3",
    description:
      "Area of Effect measures the size of the impact zone affected by an attack, technique, or phenomenon. It describes spread, radius, or field size.",
    specialExplanation: [
      "AoE is spread, not reach.",
      "AoE also does not automatically imply high AP — a wide weak attack and a narrow lethal attack can coexist.",
    ],
    table: {
      type: "tier",
      title: "AoE ladder",
      rows: standardTierRows,
    },
  },

  "potential-range": {
    id: "potential-range",
    title: "Potential Range",
    category: "Growth System",
    relevancy: "4",
    description:
      "Potential Range measures the maximum level a character or system could plausibly reach under its own rules, conditions, and growth mechanics.",
    specialExplanation: [
      "This is about ceiling, not current state.",
      "A character can have extreme potential with low present capability.",
    ],
    table: {
      type: "tier",
      title: "Potential ceiling ladder",
      rows: standardTierRows,
    },
  },

  "growth-speed": {
    id: "growth-speed",
    title: "Growth Speed",
    category: "Growth System",
    relevancy: "5-6",
    description:
      "Growth Speed measures how quickly a character improves, evolves, adapts, or increases in power over time under their own system.",
    specialExplanation: [
      "This is NOT combat speed.",
      "This is how fast a character progresses toward their potential.",
      "Extremely high growth speed can allow weaker characters to catch up or surpass stronger ones over time.",
    ],
    specialLists: [
      {
        title: "Key Distinction",
        items: [
          "Growth Speed = progression rate",
          "Potential Range = maximum ceiling",
          "Mastery = control over current power",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Growth speed ladder",
      rows: [
        { name: "Static", value: "1" },
        { name: "Very Slow", value: "2" },
        { name: "Slow", value: "3" },
        { name: "Steady", value: "4" },
        { name: "Fast", value: "5" },
        { name: "Very Fast", value: "6" },
        { name: "Explosive Growth", value: "7" },
        { name: "Exponential Growth", value: "8" },
        { name: "Adaptive Growth", value: "9" },
        { name: "Instant Evolution", value: "10" },
        { name: "Reactive Evolution", value: "11" },
        { name: "Infinite Growth", value: "12" },
        { name: "Irrelevant Growth", value: "13" },
      ],
    },
  },

  "power-mastery": {
    id: "power-mastery",
    title: "Power Mastery",
    category: "Power System (Variable)",
    relevancy: "6",
    description:
      "Power Mastery measures how well a user controls, understands, and applies their power system in practice. It includes precision, control, depth, and efficiency of use.",
    specialExplanation: [
      "A power can be extremely strong but poorly mastered.",
      "High mastery improves control, precision, and adaptability in use.",
    ],
    table: {
      type: "value",
      title: "Mastery ladder",
      rows: [
        { name: "Awakening", value: "1" },
        { name: "Beginner", value: "2" },
        { name: "Novice", value: "3" },
        { name: "Intermediate", value: "4" },
        { name: "Skilled", value: "5" },
        { name: "Advanced", value: "6" },
        { name: "Expert", value: "7" },
        { name: "Master", value: "8" },
        { name: "Grandmaster", value: "9" },
        { name: "Perfect Mastery", value: "10" },
      ],
    },
  },

  "power-capabilities": {
    id: "power-capabilities",
    title: "Power Capabilities",
    category: "Power System (Variable)",
    relevancy: "Variable (1–7, stacked)",
    description:
      "Power Capabilities measure what the power can actually do, the types of effects it can produce, and the range of applications available to the user right now.",
    specialExplanation: [
      "This stat tracks current usable abilities only.",
      "It does not represent future unlocks, theoretical branches, or full potential.",
    ],
    specialLists: [
      {
        title: "Core Rules",
        items: [
          "Power Capabilities = current usable abilities only",
          "Maximum capability = highest usable ability right now",
          "Capability is not the same thing as AP or mastery",
        ],
      },
      {
        title: "Categories",
        items: [
          "Body Alteration",
          "External Manipulation",
          "Mental & Perceptual Powers",
          "Spiritual & Soul Powers",
          "Creation & Summoning",
          "Conceptual & Abstract Powers",
          "Metapower",
          "Dimensional & Movement Powers",
          "Defense & Negation",
          "Utility & Support",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Category values",
      rows: [
        { name: "Body Alteration", value: "5" },
        { name: "External Manipulation", value: "6" },
        { name: "Mental & Perceptual Powers", value: "5" },
        { name: "Spiritual & Soul Powers", value: "6" },
        { name: "Creation & Summoning", value: "5" },
        { name: "Conceptual & Abstract Powers", value: "7" },
        { name: "Metapower", value: "7" },
        { name: "Dimensional & Movement Powers", value: "6" },
        { name: "Defense & Negation", value: "6" },
        { name: "Utility & Support", value: "3" },
      ],
    },
  },

  "power-potential": {
    id: "power-potential",
    title: "Power Potential",
    category: "Power System (Variable)",
    relevancy: "4",
    description:
      "Power Potential measures the maximum evolution, expansion, and refinement that a specific power system can theoretically reach under the verse’s own rules.",
    specialExplanation: [
      "Power Potential is the ceiling of the power itself, not just the user.",
      "It should be separated from current Power Capabilities.",
    ],
    table: {
      type: "tier",
      title: "Potential power ceiling",
      rows: standardTierRows,
    },
  },

  "power-reserves": {
    id: "power-reserves",
    title: "Power Reserves",
    category: "Power System (Variable)",
    relevancy: "4",
    description:
      "Power Reserves measure the total amount of usable energy or fuel a character has for their power system, such as mana, ki, chakra, curse energy, or equivalent.",
    specialExplanation: [
      "Reserves are quantity, not quality.",
      "A character can have huge reserves with low efficiency, or small reserves with excellent efficiency.",
    ],
    table: {
      type: "value",
      title: "Reserve ladder",
      rows: [
        { name: "Nearly Empty", value: "1" },
        { name: "Low", value: "2" },
        { name: "Moderate", value: "3" },
        { name: "High", value: "4" },
        { name: "Massive", value: "5" },
        { name: "Colossal", value: "6" },
        { name: "Cosmic Pool", value: "7" },
        { name: "Universal Pool", value: "8" },
        { name: "Infinite Pool", value: "9" },
        { name: "Inapplicable", value: "10" },
      ],
    },
  },

  "power-recovery": {
    id: "power-recovery",
    title: "Power Recovery",
    category: "Power System (Variable)",
    relevancy: "5",
    description:
      "Power Recovery measures how quickly a character can restore their energy, reserves, or system after usage, depletion, or exhaustion.",
    specialExplanation: [
      "This is NOT regeneration.",
      "Regeneration = body or existence recovery.",
      "Power Recovery = energy / resource recovery.",
    ],
    specialLists: [
      {
        title: "Important Distinction",
        items: [
          "Power Reserves = total energy pool",
          "Power Efficiency = how well energy is used",
          "Power Recovery = how fast it comes back",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Recovery ladder",
      rows: [
        { name: "No Recovery", value: "1" },
        { name: "Extremely Slow", value: "2" },
        { name: "Slow", value: "3" },
        { name: "Moderate", value: "4" },
        { name: "Fast", value: "5" },
        { name: "Very Fast", value: "6" },
        { name: "Instant Recovery", value: "7" },
        { name: "Near-Infinite Recovery", value: "8" },
        { name: "Infinite Recovery", value: "9" },
        { name: "Immeasurable Recovery", value: "10" },
        { name: "Irrelevant Recovery", value: "11" },
      ],
    },
  },

  "power-efficiency": {
    id: "power-efficiency",
    title: "Power Efficiency",
    category: "Power System (Variable)",
    relevancy: "4",
    description:
      "Power Efficiency measures how well a character uses energy relative to output. It reflects waste reduction, optimization, and sustainable power conversion.",
    specialExplanation: [
      "Efficiency is not reserves and not mastery, but it strongly interacts with both.",
      "High efficiency lets lower reserves last longer and often increases consistency.",
    ],
    table: {
      type: "value",
      title: "Efficiency ladder",
      rows: [
        { name: "Wasteful", value: "1" },
        { name: "Poor", value: "2" },
        { name: "Standard", value: "3" },
        { name: "Refined", value: "4" },
        { name: "Optimized", value: "5" },
        { name: "Highly Efficient", value: "6" },
        { name: "Near-Perfect", value: "7" },
        { name: "Perfect Conversion", value: "8" },
      ],
    },
  },

  "hax-potency": {
    id: "hax-potency",
    title: "Hax Potency",
    category: "Advanced Attributes",
    relevancy: "7",
    description:
      "Hax Potency measures the strength and effectiveness of non-physical, rule-breaking, or bypass-oriented abilities such as conceptual attacks, time control, reality manipulation, and similar effects.",
    specialExplanation: [
      "Hax Potency is not automatically tied to AP.",
      "A weak character can still win through highly effective bypass-oriented hax.",
    ],
    table: {
      type: "tier",
      title: "Hax interaction ladder",
      rows: standardTierRows,
    },
  },

  "resistance-potency": {
    id: "resistance-potency",
    title: "Resistance",
    category: "Advanced Attributes",
    relevancy: "7",
    description:
      "Resistance measures defense against abilities and effects such as mental manipulation, time control, reality warping, spiritual attacks, or conceptual interference.",
    specialExplanation: [
      "Resistance is the defensive counterpart to Hax Potency.",
      "Different resistances can exist independently; high resistance in one category does not imply all-category resistance.",
    ],
    table: {
      type: "tier",
      title: "Resistance ladder",
      rows: standardTierRows,
    },
  },

  "ontological-level": {
    id: "ontological-level",
    title: "Ontological Level",
    category: "Advanced Attributes",
    relevancy: "7",
    description:
      "Ontological Level defines the nature of existence of a being. It determines how fundamentally real, abstract, or transcendent an entity is relative to reality itself.",
    specialExplanation: [
      "This is NOT raw power.",
      "It defines what a being IS, not how strong it is.",
      "Higher ontological level can allow interaction superiority over lower ones.",
    ],
    specialLists: [
      {
        title: "Key Concepts",
        items: [
          "Physical → Bound to standard reality",
          "Abstract → Exists as concepts or laws",
          "Transcendent → Exists beyond dimensional structure",
          "Meta → Exists beyond system rules",
        ],
      },
      {
        title: "Important Rules",
        items: [
          "Higher ontological level can bypass lower-level defenses",
          "Does not automatically grant AP or speed",
          "Interacts heavily with Hax and Resistance",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Ontological ladder",
      rows: [
        { name: "Material Existence", value: "1" },
        { name: "Enhanced Material", value: "2" },
        { name: "Energy-Based", value: "3" },
        { name: "Spiritual", value: "4" },
        { name: "Conceptual", value: "5" },
        { name: "Abstract", value: "6" },
        { name: "Higher-Dimensional", value: "7" },
        { name: "Transcendent", value: "8" },
        { name: "Meta-Existential", value: "9" },
        { name: "Outerversal Nature", value: "10" },
        { name: "Boundless Existence", value: "11" },
      ],
    },
  },

  versatility: {
    id: "versatility",
    title: "Versatility",
    category: "Advanced Attributes",
    relevancy: "6",
    description:
      "Versatility measures how well a character can adapt, respond, and function across different situations using abilities, skills, and intellect.",
    specialExplanation: [
      "Versatility = Adaptability + Application diversity.",
      "It depends heavily on mental attributes, power capabilities, combat skill, and hax.",
    ],
    specialLists: [
      {
        title: "Critical Distinction",
        items: [
          "Combat Skill = how well you fight",
          "Intelligence = how well you think",
          "Power Capabilities = what you can do",
          "Versatility = how well you adapt using all of the above",
        ],
      },
    ],
    table: {
      type: "value",
      title: "Versatility ladder",
      rows: [
        { name: "Rigid", value: "1" },
        { name: "Limited", value: "2" },
        { name: "Basic", value: "3" },
        { name: "Flexible", value: "4" },
        { name: "Adaptive", value: "5" },
        { name: "Highly Adaptive", value: "6" },
        { name: "Dynamic", value: "7" },
        { name: "Strategic", value: "8" },
        { name: "Genius Adaptation", value: "9" },
      ],
    },
  },

  synergy: {
    id: "synergy",
    title: "Synergy",
    category: "Advanced Attributes",
    relevancy: "5",
    description:
      "Synergy measures how well a character’s abilities, skills, stats, and systems work together as a unified whole. It evaluates coordination between parts, not the strength of any single part.",
    specialExplanation: [
      "A character with average individual tools can outperform someone stronger if those tools combine exceptionally well.",
      "Synergy is especially important for combo-heavy kits, layered defenses, and multi-ability setups.",
    ],
    table: {
      type: "value",
      title: "Synergy ladder",
      rows: [
        { name: "Disjointed", value: "1" },
        { name: "Loose", value: "2" },
        { name: "Functional", value: "3" },
        { name: "Coordinated", value: "4" },
        { name: "Integrated", value: "5" },
        { name: "Highly Integrated", value: "6" },
        { name: "Seamless", value: "7" },
        { name: "Perfectly Chained", value: "8" },
      ],
    },
  },

  "activation-speed": {
    id: "activation-speed",
    title: "Activation Speed",
    category: "Advanced Attributes",
    relevancy: "6",
    description:
      "Activation Speed measures how quickly an ability, power, or effect is actually triggered after the user decides to use it.",
    specialExplanation: [
      "This is not movement speed.",
      "It is the delay between intent and ability manifestation.",
      "A slower character can still dominate if their activation speed is extremely fast.",
    ],
    table: {
      type: "value",
      title: "Activation ladder",
      rows: [
        { name: "Delayed", value: "1" },
        { name: "Slow Trigger", value: "2" },
        { name: "Standard Trigger", value: "3" },
        { name: "Fast Trigger", value: "4" },
        { name: "Rapid Trigger", value: "5" },
        { name: "Near-Instant", value: "6" },
        { name: "Instant", value: "7" },
        { name: "Infinite", value: "8" },
        { name: "Immeasurable", value: "9" },
        { name: "Irrelevant", value: "10" },
      ],
    },
  },

  regeneration: {
    id: "regeneration",
    title: "Regeneration",
    category: "Advanced Attributes",
    relevancy: "6",
    description:
      "Regeneration measures the ability to recover missing parts, lost functions, damaged states, stamina, reserves, or more abstract parts of existence depending on the system.",
    specialExplanation: [
      "Regeneration is about how fast a being can go from loss back to functional or peak state.",
      "It can extend beyond physical healing into soul, conceptual, or system-level recovery depending on the being.",
    ],
    table: {
      type: "value",
      title: "Regeneration ladder",
      rows: [
        { name: "Low-Low Low Regeneration", value: "1" },
        { name: "Mid-Low Regeneration", value: "1" },
        { name: "High-Low Regeneration", value: "2" },
        { name: "Low-Mid Regeneration", value: "3" },
        { name: "Mid-Mid Regeneration", value: "4" },
        { name: "High-Mid Regeneration", value: "5" },
        { name: "Low-High Regeneration", value: "6" },
        { name: "Mid-High Regeneration", value: "7" },
        { name: "High-High Regeneration", value: "8" },
        { name: "Low-Godly Regeneration", value: "9" },
        { name: "Mid-Godly Regeneration", value: "10" },
        { name: "High-Godly Regeneration", value: "11" },
        { name: "Transcendent Regeneration", value: "15" },
      ],
    },
  },
};