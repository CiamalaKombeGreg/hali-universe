export type StatTableTierRow = {
  name: string;
  tier: string;
  value: string;
};

export type StatTableValueRow = {
  name: string;
  value: string;
};

export type StatSpecialList = {
  title: string;
  items: string[];
};

export type StatModalTable =
  | {
      type: "tier";
      title?: string;
      rows: StatTableTierRow[];
    }
  | {
      type: "value";
      title?: string;
      rows: StatTableValueRow[];
    };

export type StatModalData = {
  id: string;
  title: string;
  category: string;
  relevancy: string;
  description: string;
  specialExplanation?: string[];
  specialLists?: StatSpecialList[];
  table: StatModalTable;
};