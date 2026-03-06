function extractAbout(text){
const startRegex = /(?:position overview|job description|the opportunity|about the role|what you'll do|key responsibilities)/i;
  const endRegex = /(?:qualifications|requirements|what you need|skills|benefits)/i;

  const startMatch = text.match(startRegex);
  if (!startMatch) return text.substring(0, 200).trim(); // Fallback to first 200 chars

  const remainingText = text.substring(startMatch.index + startMatch[0].length);
  const endMatch = remainingText.match(endRegex);

  const summary = endMatch ? remainingText.substring(0, endMatch.index) : remainingText;
  return summary.trim().substring(0, 500);

}
module.exports = extractAbout