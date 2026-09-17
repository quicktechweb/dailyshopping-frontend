import { Boxes } from "lucide-react";

export function ChartCard({ title, subtitle, right, height = "h-56", children }) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_0_1px_rgba(15,23,42,0.05),0_12px_36px_-10px_rgba(15,23,42,0.16),0_2px_10px_rgba(15,23,42,0.06)] p-5 md:p-6 hover:shadow-[0_0_1px_rgba(15,23,42,0.06),0_16px_44px_-10px_rgba(15,23,42,0.2),0_2px_12px_rgba(15,23,42,0.08)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="min-w-0">
          <h2 className="font-bold text-sm md:text-base text-slate-900 truncate">{title}</h2>
          {subtitle && <p className="text-[11px] text-slate-400 font-semibold mt-0.5 truncate">{subtitle}</p>}
        </div>
        {right}
      </div>
      <div className={height}>{children}</div>
    </div>
  );
}

export function EmptyChartState({ text }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 rounded-2xl">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-2">
        <Boxes size={20} className="text-slate-300" />
      </div>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
