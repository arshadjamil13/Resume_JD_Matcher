function extractRole(text){
const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const headerRegex = /(?:position|role|job title|opportunity)\s*[:\-–—]\s*(.*)/i;
  for (let line of lines) {
    const match = line.match(headerRegex);
    if (match) {
      // Return only the capture group, trimming any trailing descriptions
      return match[1].split(/[.!?]| is responsible/i)[0].trim();
    }
  }

  // Rule 2: Fallback to the first valid line
  const genericHeaders = /sample \d+|job description|overview|what you'll work on|--- page \d+ ---/i;
  for (let line of lines) {
    if (!genericHeaders.test(line)) {
      // This prevents capturing the description if it's on the same line
      const cleanRole = line.split(/[.!?]| is responsible/i)[0].trim();
      return cleanRole;
    }
  }

  return "Not Found";
}

module.exports = extractRole