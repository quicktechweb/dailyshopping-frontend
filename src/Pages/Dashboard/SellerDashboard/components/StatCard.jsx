export default function StatCard({ title, value, subtitle, tint, icon }) {
  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 flex items-center gap-4 shadow-[0_0_1px_rgba(15,23,42,0.05),0_10px_28px_-8px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.05)] hover:shadow-[0_0_1px_rgba(15,23,42,0.06),0_14px_36px_-8px_rgba(15,23,42,0.18),0_2px_10px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-all duration-300">
      <div className={`w-13 h-13 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 ${tint}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] md:text-xs text-slate-500 uppercase tracking-widest font-bold truncate">
          {title}
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 truncate">{value}</h2>
        {subtitle && (
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
