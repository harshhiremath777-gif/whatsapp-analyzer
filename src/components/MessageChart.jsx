import React from 'react'
import { motion } from 'framer-motion'

export default function MessageChart({ participants }) {
  // Safe array backup line
  const list = Array.isArray(participants) ? participants : []
  
  // Calculate total messages to derive accurate percentages
  const totalMessages = list.reduce((sum, p) => sum + (p.count || 0), 0)
  
  // Find the highest message count to scale the bars proportionally
  const maxCount = Math.max(...list.map(p => p.count || 0), 1)

  if (list.length === 0) {
    return <p className="text-sm font-semibold text-[#2D1B69]/50 py-4">No participant data found.</p>
  }

  return (
    <div className="space-y-6 py-1 w-full block">
      {list.map((participant, index) => {
        const count = participant.count || 0
        const name = participant.name || "Unknown"
        const percentage = totalMessages > 0 ? ((count / totalMessages) * 100).toFixed(1) : 0
        
        // Calculate raw relative width scale for the bar
        const relativeScale = (count / maxCount) * 100

        return (
          <div key={index} className="space-y-2">
            {/* Name and exact count underneath */}
            <div className="flex justify-between items-end text-[#2D1B69]">
              <div className="flex flex-col text-left">
                <span className="font-black text-base tracking-tight">{name}</span>
                <span className="text-xs font-bold text-[#2D1B69]/50 mt-0.5">
                  {count.toLocaleString()} messages
                </span>
              </div>
            </div>

            {/* Bar Track Container */}
            <div className="w-full h-9 bg-violet-100/40 border border-violet-100/60 rounded-xl overflow-hidden relative flex items-center">
              {/* Inner Animated Data Bar with a safe minimum visual limit (6%) to balance deep layout variance */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(relativeScale, 6)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 shadow-sm rounded-r-md relative flex items-center justify-end pr-3 min-w-[45px]"
              />
              
              {/* Percentage label displayed neatly on top of the bar track context */}
              <span className="absolute left-3 text-xs font-black text-violet-900 drop-shadow-xs z-10">
                {percentage}%
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}