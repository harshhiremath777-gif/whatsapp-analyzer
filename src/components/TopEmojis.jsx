const TopEmojis = ({ emojis }) => {
  if (!emojis || emojis.length === 0) return null
  return (
    <div className="flex flex-col gap-3">
      {emojis.slice(0, 5).map(([emoji, count], index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-2xl border border-white/50">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-violet-900/40 w-6">#{index + 1}</span>
            <span className="text-2xl">{emoji}</span>
          </div>
          <span className="font-black text-[#2D1B69]">{count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}
export default TopEmojis