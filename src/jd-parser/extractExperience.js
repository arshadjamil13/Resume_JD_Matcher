function extractExperience(text){
  const regex = /(\d+\+?\s*(?:-|to)?\s*\d*\s*(years?|yrs?)\s*(?:of)?\s*(?:experience)?)/i;

  const match = text.match(regex);

  return match ? match[0] : 0;
}
module.exports = extractExperience