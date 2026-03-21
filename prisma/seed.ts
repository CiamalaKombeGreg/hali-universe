import "dotenv/config";
import { PrismaClient, ScaleSubTier } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in .env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

type ScaleTierSeed = {
  title: string;
  slug: string;
  tierCode: string;
  tierName: string;
  category: string;
  subTier: ScaleSubTier;
  hasPlus: boolean;
  sortOrder: number;
  dimension?: string;
  description: string;
};

function plusVariant(
  base: Omit<ScaleTierSeed, "hasPlus">
): ScaleTierSeed {
  return {
    ...base,
    title: `${base.title}+`,
    slug: `${base.slug}-plus`,
    hasPlus: true,
  };
}

const scaleTiers: ScaleTierSeed[] = [
  {
    title: "Low Sub-Human",
    slug: "low-sub-human",
    tierCode: "23",
    tierName: "Sub-Human",
    category: "Sub-Human Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 10,
    description: "Below average human capability; insects, microorganisms, and extremely weak organisms.",
  },
  plusVariant({
    title: "Low Sub-Human",
    slug: "low-sub-human",
    tierCode: "23",
    tierName: "Sub-Human",
    category: "Sub-Human Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 11,
    description: "Below average human capability with standout advantages inside the Low Sub-Human range.",
  }),
  {
    title: "Sub-Human",
    slug: "sub-human",
    tierCode: "23",
    tierName: "Sub-Human",
    category: "Sub-Human Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 12,
    description: "Small animals and entities below average human capability.",
  },
  plusVariant({
    title: "Sub-Human",
    slug: "sub-human",
    tierCode: "23",
    tierName: "Sub-Human",
    category: "Sub-Human Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 13,
    description: "Sub-Human entities with standout advantages within their current sub-tier.",
  }),
  {
    title: "High Sub-Human",
    slug: "high-sub-human",
    tierCode: "23",
    tierName: "Sub-Human",
    category: "Sub-Human Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 14,
    description: "Peak animals and similar beings still below human level overall.",
  },
  plusVariant({
    title: "High Sub-Human",
    slug: "high-sub-human",
    tierCode: "23",
    tierName: "Sub-Human",
    category: "Sub-Human Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 15,
    description: "High Sub-Human entities with notable advantages within the same sub-tier.",
  }),

  {
    title: "Low Human",
    slug: "low-human",
    tierCode: "22",
    tierName: "Human",
    category: "Human Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 20,
    description: "Below average human physical capability.",
  },
  plusVariant({
    title: "Low Human",
    slug: "low-human",
    tierCode: "22",
    tierName: "Human",
    category: "Human Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 21,
    description: "Low Human entities with standout advantages within their range.",
  }),
  {
    title: "Human",
    slug: "human",
    tierCode: "22",
    tierName: "Human",
    category: "Human Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 22,
    description: "Average adult human capability under natural biological limits.",
  },
  plusVariant({
    title: "Human",
    slug: "human",
    tierCode: "22",
    tierName: "Human",
    category: "Human Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 23,
    description: "Human-tier entities with notable advantages but not enough to shift sub-tier.",
  }),
  {
    title: "High Human",
    slug: "high-human",
    tierCode: "22",
    tierName: "Human",
    category: "Human Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 24,
    description: "Peak human performance such as elite athletes or trained fighters.",
  },
  plusVariant({
    title: "High Human",
    slug: "high-human",
    tierCode: "22",
    tierName: "Human",
    category: "Human Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 25,
    description: "High Human entities with exceptional edge inside the same sub-tier.",
  }),

  {
    title: "Low Superhuman",
    slug: "low-superhuman",
    tierCode: "21",
    tierName: "Superhuman",
    category: "Superhuman Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 30,
    description: "Beyond human limits; wall-breaking, enhanced speed, localized impact.",
  },
  plusVariant({
    title: "Low Superhuman",
    slug: "low-superhuman",
    tierCode: "21",
    tierName: "Superhuman",
    category: "Superhuman Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 31,
    description: "Low Superhuman with notable advantages inside the same sub-tier.",
  }),
  {
    title: "Superhuman",
    slug: "superhuman",
    tierCode: "21",
    tierName: "Superhuman",
    category: "Superhuman Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 32,
    description: "Clearly beyond human limits with building-level interaction.",
  },
  plusVariant({
    title: "Superhuman",
    slug: "superhuman",
    tierCode: "21",
    tierName: "Superhuman",
    category: "Superhuman Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 33,
    description: "Superhuman with standout advantages within the same sub-tier.",
  }),
  {
    title: "High Superhuman",
    slug: "high-superhuman",
    tierCode: "21",
    tierName: "Superhuman",
    category: "Superhuman Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 34,
    description: "Small-structure and multi-building scale interaction.",
  },
  plusVariant({
    title: "High Superhuman",
    slug: "high-superhuman",
    tierCode: "21",
    tierName: "Superhuman",
    category: "Superhuman Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 35,
    description: "High Superhuman with notable advantages inside the same tier.",
  }),

  {
    title: "Low Structural",
    slug: "low-structural",
    tierCode: "20",
    tierName: "Structural",
    category: "Structural Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 40,
    description: "Large buildings and complexes.",
  },
  plusVariant({
    title: "Low Structural",
    slug: "low-structural",
    tierCode: "20",
    tierName: "Structural",
    category: "Structural Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 41,
    description: "Low Structural with standout advantages inside the same sub-tier.",
  }),
  {
    title: "Structural",
    slug: "structural",
    tierCode: "20",
    tierName: "Structural",
    category: "Structural Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 42,
    description: "City blocks and small districts.",
  },
  plusVariant({
    title: "Structural",
    slug: "structural",
    tierCode: "20",
    tierName: "Structural",
    category: "Structural Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 43,
    description: "Structural tier with exceptional traits inside the same range.",
  }),
  {
    title: "High Structural",
    slug: "high-structural",
    tierCode: "20",
    tierName: "Structural",
    category: "Structural Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 44,
    description: "Town-level influence and similar structural scale.",
  },
  plusVariant({
    title: "High Structural",
    slug: "high-structural",
    tierCode: "20",
    tierName: "Structural",
    category: "Structural Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 45,
    description: "High Structural with notable superiority inside the current sub-tier.",
  }),

  {
    title: "Low Regional",
    slug: "low-regional",
    tierCode: "19",
    tierName: "Regional",
    category: "Regional Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 50,
    description: "City-level geographical impact.",
  },
  plusVariant({
    title: "Low Regional",
    slug: "low-regional",
    tierCode: "19",
    tierName: "Regional",
    category: "Regional Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 51,
    description: "Low Regional with standout traits in the same range.",
  }),
  {
    title: "Regional",
    slug: "regional",
    tierCode: "19",
    tierName: "Regional",
    category: "Regional Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 52,
    description: "Country-level interaction and influence.",
  },
  plusVariant({
    title: "Regional",
    slug: "regional",
    tierCode: "19",
    tierName: "Regional",
    category: "Regional Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 53,
    description: "Regional tier with notable advantages but not enough to advance sub-tier.",
  }),
  {
    title: "High Regional",
    slug: "high-regional",
    tierCode: "19",
    tierName: "Regional",
    category: "Regional Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 54,
    description: "Continent-level interaction and influence.",
  },
  plusVariant({
    title: "High Regional",
    slug: "high-regional",
    tierCode: "19",
    tierName: "Regional",
    category: "Regional Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 55,
    description: "High Regional with notable superiority within the same sub-tier.",
  }),

  {
    title: "Low Planetary",
    slug: "low-planetary",
    tierCode: "18",
    tierName: "Planetary",
    category: "Planetary Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 60,
    description: "Partial planetary influence such as surface-wide interaction.",
  },
  plusVariant({
    title: "Low Planetary",
    slug: "low-planetary",
    tierCode: "18",
    tierName: "Planetary",
    category: "Planetary Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 61,
    description: "Low Planetary with standout advantages in the same sub-tier.",
  }),
  {
    title: "Planetary",
    slug: "planetary",
    tierCode: "18",
    tierName: "Planetary",
    category: "Planetary Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 62,
    description: "Full planetary interaction including atmosphere, core, and gravity systems.",
  },
  plusVariant({
    title: "Planetary",
    slug: "planetary",
    tierCode: "18",
    tierName: "Planetary",
    category: "Planetary Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 63,
    description: "Planetary with notable strengths inside the same sub-tier.",
  }),
  {
    title: "High Planetary",
    slug: "high-planetary",
    tierCode: "18",
    tierName: "Planetary",
    category: "Planetary Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 64,
    description: "Clearly beyond a single planet while still inside Planetary classification.",
  },
  plusVariant({
    title: "High Planetary",
    slug: "high-planetary",
    tierCode: "18",
    tierName: "Planetary",
    category: "Planetary Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 65,
    description: "High Planetary with standout advantages in the same sub-tier.",
  }),

  {
    title: "Low Star",
    slug: "low-star",
    tierCode: "17C",
    tierName: "Star",
    category: "Star Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 70,
    description: "Approaching stellar outputs; very large planets, multiple small planets, weak stellar objects.",
  },
  plusVariant({
    title: "Low Star",
    slug: "low-star",
    tierCode: "17C",
    tierName: "Star",
    category: "Star Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 71,
    description: "Low Star with notable advantages inside the same sub-tier.",
  }),
  {
    title: "Star",
    slug: "star",
    tierCode: "17B",
    tierName: "Star",
    category: "Star Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 72,
    description: "Average stars and equivalent stellar-scale interaction.",
  },
  plusVariant({
    title: "Star",
    slug: "star",
    tierCode: "17B",
    tierName: "Star",
    category: "Star Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 73,
    description: "Star tier with standout efficiency or notable advantages within the same sub-tier.",
  }),
  {
    title: "High Star",
    slug: "high-star",
    tierCode: "17A",
    tierName: "Star",
    category: "Star Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 74,
    description: "Massive stars, multiple standard stars, or stellar black hole scale.",
  },
  plusVariant({
    title: "High Star",
    slug: "high-star",
    tierCode: "17A",
    tierName: "Star",
    category: "Star Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 75,
    description: "High Star with clear standout advantages in the same sub-tier.",
  }),

  {
    title: "Low Galaxy",
    slug: "low-galaxy",
    tierCode: "14C",
    tierName: "Galaxy",
    category: "Galaxy Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 140,
    description: "Partial influence over large galaxies without fully dominating them.",
  },
  plusVariant({
    title: "Low Galaxy",
    slug: "low-galaxy",
    tierCode: "14C",
    tierName: "Galaxy",
    category: "Galaxy Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 141,
    description: "Low Galaxy with standout advantages in the same sub-tier.",
  }),
  {
    title: "Galaxy",
    slug: "galaxy",
    tierCode: "14B",
    tierName: "Galaxy",
    category: "Galaxy Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 142,
    description: "Full interaction with a galaxy and its dynamics.",
  },
  plusVariant({
    title: "Galaxy",
    slug: "galaxy",
    tierCode: "14B",
    tierName: "Galaxy",
    category: "Galaxy Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 143,
    description: "Galaxy tier with notable internal advantage within the same sub-tier.",
  }),
  {
    title: "High Galaxy",
    slug: "high-galaxy",
    tierCode: "14A",
    tierName: "Galaxy",
    category: "Galaxy Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 144,
    description: "Complete galactic dominance extending toward nearby galaxies.",
  },
  plusVariant({
    title: "High Galaxy",
    slug: "high-galaxy",
    tierCode: "14A",
    tierName: "Galaxy",
    category: "Galaxy Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 145,
    description: "High Galaxy with standout superiority in the same sub-tier.",
  }),

  {
    title: "Low Universal",
    slug: "low-universal",
    tierCode: "10C",
    tierName: "Universal",
    category: "Universal Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 220,
    dimension: "3D+",
    description: "Affects portions of a full universe beyond the observable and truly interacts with 3D structure.",
  },
  plusVariant({
    title: "Low Universal",
    slug: "low-universal",
    tierCode: "10C",
    tierName: "Universal",
    category: "Universal Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 221,
    dimension: "3D+",
    description: "Low Universal with standout advantages inside the same sub-tier.",
  }),
  {
    title: "Universal",
    slug: "universal",
    tierCode: "10B",
    tierName: "Universal",
    category: "Universal Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 222,
    dimension: "3D/4D threshold",
    description: "Matches an entire universe and fully interacts with its space, time, and total structure.",
  },
  plusVariant({
    title: "Universal",
    slug: "universal",
    tierCode: "10B",
    tierName: "Universal",
    category: "Universal Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 223,
    dimension: "3D/4D threshold",
    description: "Universal with standout superiority within the same sub-tier.",
  }),
  {
    title: "High Universal",
    slug: "high-universal",
    tierCode: "10A",
    tierName: "Universal",
    category: "Universal Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 224,
    dimension: "4D partial",
    description: "Above a single universe with partial interaction with 4D structure.",
  },
  plusVariant({
    title: "High Universal",
    slug: "high-universal",
    tierCode: "10A",
    tierName: "Universal",
    category: "Universal Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 225,
    dimension: "4D partial",
    description: "High Universal with notable superiority inside the same sub-tier.",
  }),

  {
    title: "Low Multiversal",
    slug: "low-multiversal",
    tierCode: "8C",
    tierName: "Multiversal",
    category: "Multiversal Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 260,
    dimension: "5D partial",
    description: "Near full perception of 5D structure without fully matching it.",
  },
  plusVariant({
    title: "Low Multiversal",
    slug: "low-multiversal",
    tierCode: "8C",
    tierName: "Multiversal",
    category: "Multiversal Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 261,
    dimension: "5D partial",
    description: "Low Multiversal with standout advantages in the same sub-tier.",
  }),
  {
    title: "Multiversal",
    slug: "multiversal",
    tierCode: "8B",
    tierName: "Multiversal",
    category: "Multiversal Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 262,
    dimension: "5D",
    description: "Full interaction with all timelines and alternate realities.",
  },
  plusVariant({
    title: "Multiversal",
    slug: "multiversal",
    tierCode: "8B",
    tierName: "Multiversal",
    category: "Multiversal Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 263,
    dimension: "5D",
    description: "Multiversal with standout advantages inside the same sub-tier.",
  }),
  {
    title: "High Multiversal",
    slug: "high-multiversal",
    tierCode: "8A",
    tierName: "Multiversal",
    category: "Multiversal Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 264,
    dimension: "5D+",
    description: "Surpasses a single multiverse and can interact across multiple multiverses.",
  },
  plusVariant({
    title: "High Multiversal",
    slug: "high-multiversal",
    tierCode: "8A",
    tierName: "Multiversal",
    category: "Multiversal Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 265,
    dimension: "5D+",
    description: "High Multiversal with standout superiority within the same sub-tier.",
  }),

  {
    title: "Low Hyperversal",
    slug: "low-hyperversal",
    tierCode: "2C",
    tierName: "Hyperversal",
    category: "Hyperversal Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 320,
    dimension: "12D+ finite",
    description: "Operates within very high-dimensional structures while remaining finite.",
  },
  plusVariant({
    title: "Low Hyperversal",
    slug: "low-hyperversal",
    tierCode: "2C",
    tierName: "Hyperversal",
    category: "Hyperversal Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 321,
    dimension: "12D+ finite",
    description: "Low Hyperversal with notable advantages inside the same sub-tier.",
  }),
  {
    title: "Hyperversal",
    slug: "hyperversal",
    tierCode: "2B",
    tierName: "Hyperversal",
    category: "Hyperversal Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 322,
    dimension: "12D+",
    description: "Fully operates across arbitrarily high dimensions.",
  },
  plusVariant({
    title: "Hyperversal",
    slug: "hyperversal",
    tierCode: "2B",
    tierName: "Hyperversal",
    category: "Hyperversal Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 323,
    dimension: "12D+",
    description: "Hyperversal with standout superiority within the same sub-tier.",
  }),
  {
    title: "High Hyperversal",
    slug: "high-hyperversal",
    tierCode: "2A",
    tierName: "Hyperversal",
    category: "Hyperversal Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 324,
    dimension: "near infinite-dimensional threshold",
    description: "Nears the infinite-dimensional threshold where dimensional hierarchy becomes negligible.",
  },
  plusVariant({
    title: "High Hyperversal",
    slug: "high-hyperversal",
    tierCode: "2A",
    tierName: "Hyperversal",
    category: "Hyperversal Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 325,
    dimension: "near infinite-dimensional threshold",
    description: "High Hyperversal with standout advantages in the same sub-tier.",
  }),

  {
    title: "Low Omniversal",
    slug: "low-omniversal",
    tierCode: "1C",
    tierName: "Omniversal",
    category: "Omniversal Tier",
    subTier: ScaleSubTier.LOW,
    hasPlus: false,
    sortOrder: 340,
    dimension: "infinite-dimensional partial",
    description: "Interacts with infinite-dimensional structures but remains limited by the omniversal framework.",
  },
  plusVariant({
    title: "Low Omniversal",
    slug: "low-omniversal",
    tierCode: "1C",
    tierName: "Omniversal",
    category: "Omniversal Tier",
    subTier: ScaleSubTier.LOW,
    sortOrder: 341,
    dimension: "infinite-dimensional partial",
    description: "Low Omniversal with standout advantages inside the same sub-tier.",
  }),
  {
    title: "Omniversal",
    slug: "omniversal",
    tierCode: "1B",
    tierName: "Omniversal",
    category: "Omniversal Tier",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 342,
    dimension: "infinite-dimensional",
    description: "Full interaction with infinite dimensions and all hierarchical layers.",
  },
  plusVariant({
    title: "Omniversal",
    slug: "omniversal",
    tierCode: "1B",
    tierName: "Omniversal",
    category: "Omniversal Tier",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 343,
    dimension: "infinite-dimensional",
    description: "Omniversal with standout advantages inside the same sub-tier.",
  }),
  {
    title: "High Omniversal",
    slug: "high-omniversal",
    tierCode: "1A",
    tierName: "Omniversal",
    category: "Omniversal Tier",
    subTier: ScaleSubTier.HIGH,
    hasPlus: false,
    sortOrder: 344,
    dimension: "infinite-dimensional hierarchy dominance",
    description: "Imposes structure over the omniverse with hierarchical dominance.",
  },
  plusVariant({
    title: "High Omniversal",
    slug: "high-omniversal",
    tierCode: "1A",
    tierName: "Omniversal",
    category: "Omniversal Tier",
    subTier: ScaleSubTier.HIGH,
    sortOrder: 345,
    dimension: "infinite-dimensional hierarchy dominance",
    description: "High Omniversal with standout superiority within the same sub-tier.",
  }),

  {
    title: "Outerversal",
    slug: "outerversal",
    tierCode: "0",
    tierName: "Outerversal",
    category: "Transcendental Existence",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 360,
    description: "Beyond dimensions, hierarchies, and mathematical scaling.",
  },
  plusVariant({
    title: "Outerversal",
    slug: "outerversal",
    tierCode: "0",
    tierName: "Outerversal",
    category: "Transcendental Existence",
    subTier: ScaleSubTier.MEDIUM,
    sortOrder: 361,
    description: "Outerversal with standout advantages while remaining in the same transcendental class.",
  }),
  {
    title: "Boundless",
    slug: "boundless",
    tierCode: "Ω",
    tierName: "Boundless",
    category: "Transcendental Existence",
    subTier: ScaleSubTier.MEDIUM,
    hasPlus: false,
    sortOrder: 370,
    description: "Beyond all concepts, all scaling, and even irrelevance itself.",
  },
];

async function main() {
  const genreNames = [
    "Action",
    "Adventure",
    "Fantasy",
    "Dark Fantasy",
    "Comedy",
    "Mystery & Crime",
    "Historical",
    "Horror",
    "Romance",
    "Science fiction",
    "Isekai",
    "Thriller",
    "Manhua",
    "Slice of life",
    "Supernatural",
    "Manhwa",
    "Martials arts",
    "Games",
  ];

  for (const name of genreNames) {
    await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const tier of scaleTiers) {
    await prisma.scaleTier.upsert({
      where: { slug: tier.slug },
      update: {
        title: tier.title,
        tierCode: tier.tierCode,
        tierName: tier.tierName,
        category: tier.category,
        subTier: tier.subTier,
        hasPlus: tier.hasPlus,
        sortOrder: tier.sortOrder,
        dimension: tier.dimension,
        description: tier.description,
      },
      create: tier,
    });
  }

  const dragonBallScale = await prisma.scaleTier.findUniqueOrThrow({
    where: { slug: "multiversal" },
  });

  const onePieceScale = await prisma.scaleTier.findUniqueOrThrow({
    where: { slug: "high-regional" },
  });

  const jujutsuScale = await prisma.scaleTier.findUniqueOrThrow({
    where: { slug: "planetary" },
  });

  const dragonBall = await prisma.verse.upsert({
    where: { name: "Dragon Ball" },
    update: {
      scaleTierId: dragonBallScale.id,
      description: "A legendary high-scale martial multiverse.",
    },
    create: {
      name: "Dragon Ball",
      description: "A legendary high-scale martial multiverse.",
      scaleTierId: dragonBallScale.id,
    },
  });

  const onePiece = await prisma.verse.upsert({
    where: { name: "One Piece" },
    update: {
      scaleTierId: onePieceScale.id,
      description: "Pirates, mystery, dreams, and world-scale conflict.",
    },
    create: {
      name: "One Piece",
      description: "Pirates, mystery, dreams, and world-scale conflict.",
      scaleTierId: onePieceScale.id,
    },
  });

  const jujutsu = await prisma.verse.upsert({
    where: { name: "Jujutsu Kaisen" },
    update: {
      scaleTierId: jujutsuScale.id,
      description: "Cursed energy, modern sorcery, and brutal combat.",
    },
    create: {
      name: "Jujutsu Kaisen",
      description: "Cursed energy, modern sorcery, and brutal combat.",
      scaleTierId: jujutsuScale.id,
    },
  });

  const action = await prisma.genre.findUniqueOrThrow({ where: { name: "Action" } });
  const fantasy = await prisma.genre.findUniqueOrThrow({ where: { name: "Fantasy" } });
  const adventure = await prisma.genre.findUniqueOrThrow({ where: { name: "Adventure" } });
  const darkFantasy = await prisma.genre.findUniqueOrThrow({ where: { name: "Dark Fantasy" } });

  const verseGenres = [
    { verseId: dragonBall.id, genreId: action.id },
    { verseId: dragonBall.id, genreId: fantasy.id },
    { verseId: onePiece.id, genreId: action.id },
    { verseId: onePiece.id, genreId: adventure.id },
    { verseId: jujutsu.id, genreId: action.id },
    { verseId: jujutsu.id, genreId: darkFantasy.id },
  ];

  for (const item of verseGenres) {
    await prisma.verseGenre.upsert({
      where: {
        verseId_genreId: {
          verseId: item.verseId,
          genreId: item.genreId,
        },
      },
      update: {},
      create: item,
    });
  }

  const existingCharacters = await prisma.character.findMany({
    select: { name: true, verseId: true },
  });

  const existingSet = new Set(
    existingCharacters.map((c) => `${c.name}::${c.verseId}`)
  );

  const characters = [
    { name: "Goku", verseId: dragonBall.id, isCanon: true },
    { name: "Vegeta", verseId: dragonBall.id, isCanon: true },
    { name: "Luffy", verseId: onePiece.id, isCanon: true },
    { name: "Zoro", verseId: onePiece.id, isCanon: true },
    { name: "Yuji Itadori", verseId: jujutsu.id, isCanon: true },
    { name: "Sukuna", verseId: jujutsu.id, isCanon: true },
  ];

  for (const character of characters) {
    const key = `${character.name}::${character.verseId}`;
    if (!existingSet.has(key)) {
      await prisma.character.create({
        data: {
          name: character.name,
          verseId: character.verseId,
          isCanon: character.isCanon,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });