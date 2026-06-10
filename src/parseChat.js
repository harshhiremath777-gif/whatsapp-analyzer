export function parseChat(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  const lineRegex = /^[\[?]?(\d{1,4}[\/\-]\d{1,2}[\/\-]\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM|am|pm)?\]?\s*[\-\:]\s*([^:]+)\:\s*(.*)$/;
  const lines = rawText.split(/\r?\n/);
  const parsedMessages = [];

  lines.forEach(line => {
    const match = line.trim().match(lineRegex);
    if (match) {
      const [_, dateStr, hourStr, minStr, ampm, sender, message] = match;
      
      let hour = parseInt(hourStr, 10);
      if (ampm) {
        if (ampm.toLowerCase() === 'pm' && hour < 12) hour += 12;
        if (ampm.toLowerCase() === 'am' && hour === 12) hour = 0;
      }

      const dateParts = dateStr.match(/\d+/g);
      if (dateParts && dateParts.length >= 3) {
        const firstNum = parseInt(dateParts[0], 10);
        const secondNum = parseInt(dateParts[1], 10);
        const rawYear = dateParts[2];
        const year = rawYear.length === 2 ? 2000 + parseInt(rawYear, 10) : parseInt(rawYear, 10);
        
        const month = firstNum > 12 ? secondNum - 1 : firstNum - 1;
        const day = firstNum > 12 ? firstNum : secondNum;

        const exactDate = new Date(year, month, day, hour, parseInt(minStr, 10));
        
        if (!isNaN(exactDate.getTime())) {
          const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          let cleanMessage = message.trim();
          
          // IN-FLIGHT TRANSLATOR: Normalizes thumbs up text expressions right into actual unicode point sequences
          if (cleanMessage.toLowerCase().includes("thumbs up") || cleanMessage.toLowerCase().includes("thumbsup")) {
            cleanMessage += " 👍";
          }

          parsedMessages.push({
            timestamp: exactDate.getTime(),
            hour: hour,
            dayOfWeek: exactDate.getDay(),
            monthKey: `${monthNames[month]} ${year}`,
            sender: sender.trim(),
            message: cleanMessage
          });
        }
      }
    }
  });

  return parsedMessages;
}