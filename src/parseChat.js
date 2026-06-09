export const parseChat = (text) => {
  const lines = text.split('\n')
  const messages = []
  
  // This regex matches: DD/MM/YY, H:MM pm - Name: Message
  const regex = /^(\d{2}\/\d{2}\/\d{2,4}),\s(\d{1,2}:\d{2}\s[a|p]m)\s-\s(.*?):\s(.*)$/

  lines.forEach(line => {
    const match = line.match(regex)
    if (match) {
      messages.push({
        date: match[1],
        time: match[2],
        sender: match[3],
        message: match[4]
      })
    }
  })
  
  return messages
}