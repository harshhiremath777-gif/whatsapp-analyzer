import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Lock, Zap, BarChart3, Sparkles } from 'lucide-react'
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { parseChat } from './parseChat'
import { analyzeChat } from './analyzeChat'
import HeroStats from './components/HeroStats'
import MessageChart from './components/MessageChart'
import ActivityChart from './components/ActivityChart'
import TopEmojis from './components/TopEmojis'

// Reusable Glass Card Component for the dashboard
const GlassCard = ({ children, title, className = "" }) => (
  <div className={`bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 shadow-lg ${className}`}>
    {title && <h2 className="text-2xl font-black text-[#2D1B69] mb-6 tracking-tight">{title}</h2>}
    {children}
  </div>
)

function App() {
  const [isDragging, setIsDragging] = useState(false)
  const [chatStats, setChatStats] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showProModal, setShowProModal] = useState(false)
  const fileInputRef = useRef(null)

  const particlesInit = async (engine) => { await loadSlim(engine) }

  const processFile = (file) => {
    setIsAnalyzing(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      const stats = analyzeChat(parseChat(e.target.result))
      setChatStats(stats)
      setIsAnalyzing(false)
    }
    reader.readAsText(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0])
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) processFile(e.target.files[0])
  }

  return (
    <div className="relative min-h-screen bg-[#F5F3FF] overflow-hidden">
      {/* Background Particles */}
      <Particles 
        init={particlesInit}
        options={{
          particles: {
            color: { value: "#8B5CF6" },
            links: { color: "#8B5CF6", distance: 150, enable: true, opacity: 0.2 },
            move: { enable: true, speed: 1 },
            number: { value: 60 }
          }
        }}
        className="absolute inset-0 z-0"
      />

      {/* Main Content Layer */}
      <div className="relative z-10">
        {chatStats ? (
          <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] border border-white/60 shadow-lg flex justify-between items-center">
                <HeroStats stats={chatStats} />
                <button 
                  onClick={() => setShowProModal(true)}
                  className="px-8 py-4 bg-[#2D1B69] text-white rounded-2xl font-bold hover:bg-violet-900 transition-all flex items-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-5 h-5" /> Unlock Pro
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <GlassCard title="Message Distribution" className="lg:col-span-2">
                  <MessageChart participants={chatStats.participants} />
                </GlassCard>
                <GlassCard title="Top Emojis" className="lg:col-span-1">
                  <TopEmojis emojis={chatStats.topEmojis} />
                </GlassCard>
              </div>

              <GlassCard title="Activity Timeline">
                <ActivityChart hourlyData={chatStats.hourlyActivity} />
              </GlassCard>

              <button onClick={() => setChatStats(null)} className="w-full py-4 bg-white/50 border border-white/50 text-violet-900 rounded-2xl font-bold hover:bg-white/80 transition-all">
                Back to Upload
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-3xl text-center px-6">
              <div className="mb-12">
                <h1 className="text-8xl font-black tracking-tighter text-[#2D1B69] mb-4">Uncover the tea.</h1>
                <p className="text-xl text-violet-900/60">Your chat history, visualized. Private, secure, and lightning fast.</p>
              </div>

              <motion.div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                whileHover={{ scale: 1.02 }}
                className="relative p-[1px] rounded-[3rem] bg-gradient-to-br from-violet-200 to-violet-400 shadow-lg hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.5)] transition-all duration-500 cursor-pointer"
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".txt" />
                <div className="p-16 rounded-[2.9rem] bg-white/90 backdrop-blur-sm border border-white/50">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-violet-900 font-bold">Processing...</p>
                    </div>
                  ) : (
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 bg-violet-100/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-100">
                        <Upload className="w-8 h-8 text-violet-700" />
                      </div>
                      <h3 className="text-3xl font-black text-[#2D1B69] mb-2">Drop your file</h3>
                      <p className="text-[#2D1B69]/60 font-medium">Drag & drop or click to upload</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <div className="mt-20 flex justify-center gap-12 text-violet-900/70">
                {[ { icon: Lock, label: "Private" }, { icon: Zap, label: "Fast" }, { icon: BarChart3, label: "Visual" } ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -10, color: "#EC4899" }} className="flex items-center gap-2 cursor-default">
                    <item.icon />
                    <span className="font-semibold">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showProModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-6"
            onClick={() => setShowProModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-xl border border-white/50 p-10 rounded-[3rem] shadow-2xl max-w-lg w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-violet-600" />
              </div>
              <h2 className="text-4xl font-black text-[#2D1B69] mb-4">Go Pro</h2>
              <p className="text-lg text-violet-900/70 mb-8">Unlock Vibe Checks, Sentiment Analysis, and branded shareable cards. Your chats, evolved.</p>
              <button className="w-full py-4 bg-violet-600 text-white rounded-2xl font-bold text-lg hover:bg-violet-700 transition-colors mb-4">Upgrade for $9.99</button>
              <button onClick={() => setShowProModal(false)} className="text-violet-900/50 font-medium hover:text-violet-900 transition-colors">Maybe later</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default App