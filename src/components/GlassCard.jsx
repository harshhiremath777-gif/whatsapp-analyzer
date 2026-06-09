export default function GlassCard({ children, title, className = "" }) {
  return (
    <div className={`bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 shadow-lg ${className}`}>
      {title && <h2 className="text-2xl font-black text-[#2D1B69] mb-6 tracking-tight">{title}</h2>}
      {children}
    </div>
  )
}