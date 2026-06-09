export const analyzeChat = (messages) => {
  const stats = {
    totalMessages: messages.length,
    participants: {},
    uniqueDays: new Set(),
    hourlyActivity: Array(24).fill(0),
    emojiTracker: {}
  }

  // A more robust regex for modern emojis
  const emojiRegex = /\p{Emoji_Presentation}/gu;
  
  // Use a Set for instant lookups
  const modifiersToIgnore = new Set(['🏻', '🏼', '🏽', '🏾', '🏿', '♂', '♀', '️', '‍', '️']);

  messages.forEach(msg => {
    // 1. Participant Stats
    if (msg.sender) {
      stats.participants[msg.sender] = (stats.participants[msg.sender] || 0) + 1;
    }
    
    // 2. Date Tracking
    if (msg.date) stats.uniqueDays.add(msg.date);

    // 3. Time Tracking (Time parsing logic)
    if (msg.time) {
      const [timeString, rawModifier] = msg.time.toLowerCase().split(/\s+/);
      let [hours] = timeString.split(':');
      hours = parseInt(hours, 10);

      if (rawModifier === 'pm' && hours < 12) hours += 12;
      if (rawModifier === 'am' && hours === 12) hours = 0;

      if (!isNaN(hours) && hours >= 0 && hours <= 23) {
        stats.hourlyActivity[hours]++;
      }
    }

    // 4. Emoji Tracking
    if (msg.message) {
      const foundEmojis = msg.message.match(emojiRegex);
      if (foundEmojis) {
        foundEmojis.forEach(emoji => {
          // Only track if it's not a modifier
          if (!modifiersToIgnore.has(emoji)) {
            stats.emojiTracker[emoji] = (stats.emojiTracker[emoji] || 0) + 1;
          }
        });
      }
    }
  })

  stats.totalDays = stats.uniqueDays.size || 1;
  stats.avgPerDay = Math.round(stats.totalMessages / stats.totalDays);

  // Sort, slice, and return
  stats.topEmojis = Object.entries(stats.emojiTracker)
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 5);

  return stats;
}