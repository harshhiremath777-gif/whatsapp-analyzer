import { MessageSquare, Calendar, TrendingUp } from 'lucide-react'

const HeroStats = ({ stats }) => {
  const data = [
    { label: "Total Messages", value: stats.totalMessages.toLocaleString(), icon: MessageSquare },
    { label: "Days Active", value: stats.totalDays.toLocaleString(), icon: Calendar },
    { label: "Avg / Day", value: stats.avgPerDay.toLocaleString(), icon: TrendingUp },
  ]

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-white/50 backdrop-blur-sm">
          <div className="p-3 bg-white rounded-2xl text-violet-600">
            <item.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-violet-900/60 uppercase tracking-widest">{item.label}</p>
            <p className="text-2xl font-black text-[#2D1B69]">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default HeroStats