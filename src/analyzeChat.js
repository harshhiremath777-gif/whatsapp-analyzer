export const analyzeChat = (messages) => {
  const stats = {
    totalMessages: messages.length,
    participants: {}
  }

  messages.forEach(msg => {
    // Tally up messages per person
    if (stats.participants[msg.sender]) {
      stats.participants[msg.sender]++
    } else {
      stats.participants[msg.sender] = 1
    }
  })

  return stats
}