export type StatisticsSubSection = {
  id: string;
  title: string;
};

export type StatisticsSection = {
  id: string;
  title: string;
  shortTitle: string;
  color: string;
  description: string;
  subSections: StatisticsSubSection[];
};

export const statisticsSections: StatisticsSection[] = [
  {
    id: "physical-attributes",
    title: "Physical Attributes",
    shortTitle: "Physical",
    color: "from-red-500/25 to-rose-400/10 border-red-300/20",
    description: "Raw bodily performance and biological baseline.",
    subSections: [
      { id: "striking-strength", title: "Striking Strength" },
      { id: "lifting-strength", title: "Lifting Strength" },
      { id: "durability", title: "Durability" },
      { id: "endurance", title: "Endurance" },
      { id: "stamina", title: "Stamina" },
      { id: "body-constitution", title: "Body Constitution" },
    ],
  },
  {
    id: "speed-mobility",
    title: "Speed & Mobility",
    shortTitle: "Speed",
    color: "from-blue-500/25 to-cyan-400/10 border-blue-300/20",
    description: "Travel, reaction, acceleration, and execution speed.",
    subSections: [
      { id: "running-speed", title: "Running Speed" },
      { id: "explosive-speed", title: "Explosive Speed" },
      { id: "agility", title: "Agility" },
      { id: "reflex", title: "Reflex" },
      { id: "dexterity", title: "Dexterity" },
    ],
  },
  {
    id: "sensory-awareness",
    title: "Sensory & Awareness",
    shortTitle: "Sensory",
    color: "from-yellow-500/25 to-amber-400/10 border-yellow-300/20",
    description: "Information gathering, detection, and perceptive precision.",
    subSections: [
      { id: "perception-awareness", title: "Perception / Awareness" },
      { id: "sensory-range", title: "Sensory Range" },
      { id: "sensory-accuracy", title: "Sensory Accuracy" },
    ],
  },
  {
    id: "mental-attributes",
    title: "Mental Attributes",
    shortTitle: "Mental",
    color: "from-green-500/25 to-emerald-400/10 border-green-300/20",
    description: "Knowledge, logic, memory, and combat thinking.",
    subSections: [
      { id: "global-intelligence", title: "Global Intelligence" },
      { id: "logical-intelligence", title: "Logical Intelligence" },
      { id: "battle-intelligence", title: "Battle Intelligence (BIQ)" },
    ],
  },
  {
    id: "psychological-attributes",
    title: "Psychological Attributes",
    shortTitle: "Psychological",
    color: "from-fuchsia-500/25 to-pink-400/10 border-fuchsia-300/20",
    description: "Mindset, focus, emotional stability, self-command, and practical lived combat background.",
    subSections: [
      { id: "willpower", title: "Willpower" },
      { id: "accuracy-precision", title: "Accuracy / Precision" },
      { id: "body-control", title: "Body Control" },
      { id: "emotional-control", title: "Emotional Control" },
      { id: "experience", title: "Experience" },
    ],
  },
  {
    id: "social-attributes",
    title: "Social Attributes",
    shortTitle: "Social",
    color: "from-orange-500/25 to-amber-400/10 border-orange-300/20",
    description: "Influence, persuasion, and interpersonal impact.",
    subSections: [
      { id: "charisma", title: "Charisma" },
      { id: "charm", title: "Charm" },
    ],
  },
  {
    id: "combat-fundamentals",
    title: "Combat Fundamentals",
    shortTitle: "Combat",
    color: "from-zinc-400/25 to-slate-300/10 border-zinc-300/20",
    description: "Core fighting competence and defensive know-how.",
    subSections: [
      { id: "combat-skills", title: "Combat Skills" },
      { id: "defensive-capabilities", title: "Defensive Capabilities" },
    ],
  },
  {
    id: "offensive-metrics",
    title: "Offensive Metrics",
    shortTitle: "Offense",
    color: "from-rose-500/25 to-red-400/10 border-rose-300/20",
    description: "Consistent damage, peak output, and destructive spread.",
    subSections: [
      { id: "attack-potency", title: "Attack Potency (AP)" },
      { id: "maximum-attack-potency", title: "Maximum Attack Potency" },
      { id: "destructive-capabilities", title: "Destructive Capabilities (DC)" },
    ],
  },
  {
    id: "range-influence",
    title: "Range & Influence",
    shortTitle: "Range",
    color: "from-violet-500/25 to-purple-400/10 border-violet-300/20",
    description: "How far effects reach and how wide they spread.",
    subSections: [
      { id: "range", title: "Range" },
      { id: "aoe", title: "Area of Effect (AoE)" },
    ],
  },
  {
    id: "growth-system",
    title: "Growth System",
    shortTitle: "Growth",
    color: "from-stone-500/25 to-amber-400/10 border-stone-300/20",
    description: "Progression ceiling and rate of development.",
    subSections: [
      { id: "potential-range", title: "Potential Range" },
      { id: "growth-speed", title: "Growth Speed" },
    ],
  },
  {
    id: "power-system",
    title: "Power System (Variable)",
    shortTitle: "Power",
    color: "from-sky-500/25 to-indigo-400/10 border-sky-300/20",
    description: "Verse-specific power mechanics like mana, ki, chakra, or curse energy.",
    subSections: [
      { id: "power-mastery", title: "[Power] Mastery" },
      { id: "power-capabilities", title: "[Power] Capabilities" },
      { id: "power-potential", title: "[Power] Potential" },
      { id: "power-reserves", title: "[Power] Reserves" },
      { id: "power-recovery", title: "[Power] Recovery" },
      { id: "power-efficiency", title: "[Power] Efficiency" },
    ],
  },
  {
    id: "advanced-attributes",
    title: "Advanced Attributes",
    shortTitle: "Advanced",
    color: "from-purple-500/25 to-fuchsia-400/10 border-purple-300/20",
    description: "High-impact matchup-deciding factors and special systems.",
    subSections: [
      { id: "hax-potency", title: "Hax Potency" },
      { id: "resistance-potency", title: "Resistance Potency" },
      { id: "ontological-level", title: "Ontological Level" },
      { id: "versatility", title: "Versatility" },
      { id: "activation-speed", title: "Activation Speed" },
      { id: "regeneration", title: "Regeneration" },
    ],
  },
];