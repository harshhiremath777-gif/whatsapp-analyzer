import { useState } from 'react'
import { parseChat } from './parseChat'
import { analyzeChat } from './analyzeChat'

function App() {
  const [isDragging, setIsDragging] = useState(false)
  // We added a new "state" to hold our math results
  const [chatStats, setChatStats] = useState(null) 

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target.result
        const messages = parseChat(text)
        const stats = analyzeChat(messages)
        
        // Save the stats to memory so the screen can use them!
        setChatStats(stats) 
      }
      reader.readAsText(file)
    }
  }

  // If the computer has stats in memory, show the results screen
  if (chatStats) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-2xl mx-auto mt-12">
          <h1 className="text-3xl font-bold mb-6 text-center">Chat Analysis Complete 🚀</h1>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-xl mb-6 text-center text-gray-300">
              Total Messages: <span className="font-bold text-white">{chatStats.totalMessages}</span>
            </h2>
            
            <div className="space-y-3">
              {/* This loops through the participants and creates a row for each */}
              {Object.entries(chatStats.participants).map(([name, count]) => (
                <div key={name} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                  <span className="font-medium text-lg">{name}</span>
                  <span className="font-bold text-2xl text-green-400">{count}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setChatStats(null)}
              className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
            >
              Analyze Another Chat
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If there are no stats yet, show the normal upload screen
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full max-w-md p-12 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer ${
          isDragging ? 'border-green-500 bg-gray-800' : 'border-gray-600 bg-gray-900 hover:border-gray-500'
        }`}
      >
        <div className="text-6xl mb-4 pointer-events-none">📄</div>
        <h2 className="text-2xl font-bold mb-2 pointer-events-none">Drop your WhatsApp chat</h2>
        <p className="text-gray-400 pointer-events-none">Export without media (.txt file)</p>
      </div>
    </div>
  )
}

export default App