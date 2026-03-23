import type { StatModalTable } from "./statModalTypes";

type StatValueTableProps = {
  table: StatModalTable;
};

export default function StatValueTable({ table }: StatValueTableProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      {table.title ? (
        <h3 className="mb-4 text-xl font-black text-white">{table.title}</h3>
      ) : null}

      {table.type === "tier" ? (
        <div className="overflow-hidden rounded-[20px] border border-white/10">
          <div className="grid grid-cols-[1.4fr_1fr_0.8fr] border-b border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
            <div>Level Name</div>
            <div>Corresponding Tier</div>
            <div>Value</div>
          </div>

          <div className="max-h-105 overflow-y-auto custom-scroll">
            {table.rows.map((row) => (
              <div
                key={`${row.name}-${row.tier}-${row.value}`}
                className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center border-b border-white/5 px-4 py-3 text-sm text-white/80"
              >
                <div className="font-semibold text-white">{row.name}</div>
                <div className="text-white/65">{row.tier}</div>
                <div className="font-black text-cyan-100">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[20px] border border-white/10">
          <div className="grid grid-cols-[1.5fr_1fr] border-b border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
            <div>Aspect / Level</div>
            <div>Value</div>
          </div>

          <div className="max-h-105 overflow-y-auto custom-scroll">
            {table.rows.map((row) => (
              <div
                key={`${row.name}-${row.value}`}
                className="grid grid-cols-[1.5fr_1fr] items-center border-b border-white/5 px-4 py-3 text-sm text-white/80"
              >
                <div className="font-semibold text-white">{row.name}</div>
                <div className="font-black text-fuchsia-100">{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}