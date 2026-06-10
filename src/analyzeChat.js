export function analyzeChat(parsedMessages) {
  const stats = {
    totalMessages: 0,
    participants: {},
    emojiTracker: {},
    topEmojis: [],
    hourlyActivity: Array(24).fill(0),
    totalMedia: 0,
    monthlyTimeline: {}
  };

  if (!Array.isArray(parsedMessages) || parsedMessages.length === 0) return stats;
  stats.totalMessages = parsedMessages.length;

  parsedMessages.forEach(msg => {
    if (!msg || !msg.message) return;

    stats.participants[msg.sender] = (stats.participants[msg.sender] || 0) + 1;
    stats.hourlyActivity[msg.hour] += 1;

    if (msg.monthKey) {
      stats.monthlyTimeline[msg.monthKey] = (stats.monthlyTimeline[msg.monthKey] || 0) + 1;
    }

    if (msg.message.toLowerCase().includes('omitted') || msg.message.toLowerCase().includes('attached')) {
      stats.totalMedia += 1;
    }

    // Direct unicode point index sequence iteration avoids splitting compound icons down the middle
    const characters = Array.from(msg.message);
    characters.forEach(char => {
      const codePoint = char.codePointAt(0);
      if (!codePoint) return;

      if (
        (codePoint >= 0x1F300 && codePoint <= 0x1F9FF) || 
        (codePoint >= 0x1F600 && codePoint <= 0x1F64F) || 
        (codePoint >= 0x1F680 && codePoint <= 0x1F6FF) || 
        (codePoint >= 0x2600 && codePoint <= 0x26FF)   || 
        (codePoint >= 0x2700 && codePoint <= 0x27BF)
      ) {
        stats.emojiTracker[char] = (stats.emojiTracker[char] || 0) + 1;
      }
    });
  });

  stats.topEmojis = Object.entries(stats.emojiTracker)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return stats;
}