const nlp = require('compromise');

function refineTechSkills(rawSkillArray) {
  // 1. Define common "Job Description" noise words that are nouns but NOT skills
  const noise = [
    'experience', 'management', 'development', 'design', 
    'mindset', 'startup', 'flows', 'logs', 'level', 'basics'
  ];

  let techOnly = [];

  rawSkillArray.forEach(line => {
    // Process each line with the NLP engine
    const doc = nlp(line);

    // 2. Target Proper Nouns, Acronyms, and TitleCase words (common for tech)
    // This is a traditional NLP POS-tagging method [cite: 12]
    const candidates = doc.match('(#ProperNoun|#Acronym|#Noun)').out('array');

    candidates.forEach(word => {
      // Remove punctuation like ( ) , : often found in JD text
      const cleanWord = word.replace(/[():,]/g, '').trim();

      // 3. Filter: Keep it if it's not in the noise list and long enough
      if (
        cleanWord.length > 1 && 
        !noise.includes(cleanWord.toLowerCase())
      ) {
        techOnly.push(cleanWord);
      }
    });
  });

  // 4. Remove duplicates and return clean array
  return [...new Set(techOnly)];
}

function extractSkills(text){
    const skillHeaders = [
    "required qualifications", 
    "desired skills", 
    "what you need to succeed", 
    "technical requirements",
    "must have",
    "basic qualifications",
    "required skills",
    "tech stack"
  ];

  // 2. Isolate the most relevant section using a "Sliding Window" Regex
  // This looks for a header and captures everything until the next double newline or major header
  const sectionRegex = new RegExp(`(?:${skillHeaders.join('|')})[:\\s]*([\\s\\S]*?)(?:\n\\s*\n|about|benefits|compensation|$)`, 'i');
  const match = text.match(sectionRegex);
  
  // If no specific section is found, we analyze the whole text as a fallback
  const targetText = match ? match[1] : text;

  // 3. Split by common bullet points and delimiters found in the PDF [cite: 94, 145, 582]
  // Matches: •, *, -, ●, numbers like 1., or newlines
  const rawList = targetText.split(/[•\*●\-‐]|(?:\d+\.)|\n/);

  // 4. Clean and Filter the results
  const extractedSkills = rawList
    .map(item => item.trim())
    .filter(item => {
      return (
        item.length > 1 &&           // Ignore empty strings or single chars
        item.length < 50 &&          // Ignore long sentences that aren't skills
        !/^[0-9\W]+$/.test(item) &&  // Ignore strings that are only numbers/symbols
        !/click|http|apply/i.test(item) // Filter out noise like links [cite: 193]
      );
    });

  // Remove duplicates and return
  const skill =  [...new Set(extractedSkills)];
  const refineSkills = refineTechSkills(skill)
  return refineSkills

}
module.exports = extractSkills