import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const ActivityChart = ({ hourlyData }) => {
  const data = hourlyData.map((count, hour) => ({ 
    time: `${hour % 12 || 12} ${hour >= 12 ? 'PM' : 'AM'}`, 
    activity: count 
  }))

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#2D1B69', fontSize: 12}} interval={3} />
          <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
          <Area type="monotone" dataKey="activity" stroke="#8B5CF6" strokeWidth={3} fill="url(#areaGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
export default ActivityChart