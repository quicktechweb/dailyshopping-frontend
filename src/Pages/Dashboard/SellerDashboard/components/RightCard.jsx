export default function RightCard({ title, value, down, accent, icon }) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 flex items-center gap-4 shadow-[0_0_1px_rgba(15,23,42,0.05),0_8px_24px_-8px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.05)] hover:shadow-[0_0_1px_rgba(15,23,42,0.06),0_12px_30px_-8px_rgba(15,23,42,0.18),0_2px_10px_rgba(15,23,42,0.06)] transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">
          {title}
        </p>
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-1">
          {value} {down && <span className="text-red-500 text-sm">↓</span>}
        </h2>
      </div>
    </div>
  );
}
