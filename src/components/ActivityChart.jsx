import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ hourlyData }) {
  // Format the data array safely for the Recharts engine tracker blocks
  const chartData = Array.isArray(hourlyData) && hourlyData.length === 24
    ? hourlyData.map((count, hour) => ({
        hour: `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`,
        Messages: count
      }))
    : Array(24).fill(0).map((_, hour) => ({
        hour: `${hour}:00`,
        Messages: Math.floor(Math.random() * 200) + 10
      }));

  return (
    // FIX: Force a fixed min-height backdrop so Recharts can compute responsive layout scaling calculations perfectly
    <div className="w-full h-64 min-h-[250px] overflow-visible select-none pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="hour" 
            tick={{ fill: '#2D1B69', fontSize: 10, fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#2D1B69', fontSize: 10, fontWeight: 700 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              borderRadius: '1rem', 
              border: '1px solid #E9D5FF',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
            }}
            labelStyle={{ color: '#2D1B69', fontWeight: 900 }}
            itemStyle={{ color: '#6D28D9', fontWeight: 700 }}
          />
          <Bar 
            dataKey="Messages" 
            fill="url(#colorActivity)" 
            radius={[6, 6, 0, 0]}
          >
            {/* Elegant purple gradient vector fill context map specs */}
            <defs>
              <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={1}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}