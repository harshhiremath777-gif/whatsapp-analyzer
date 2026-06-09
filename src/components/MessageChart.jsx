import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const MessageChart = ({ participants }) => {
  const data = Object.entries(participants).map(([name, count]) => ({ name, count }))
  
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#2D1B69', fontSize: 12}} />
          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Bar dataKey="count" fill="url(#barGradient)" radius={[10, 10, 10, 10]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default MessageChart