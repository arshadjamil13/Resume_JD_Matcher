function extractExperienceSection(text) {
  const regex = /experience\s*([\s\S]*?)(education|skills|projects|certifications|summary|$)/i;

  const match = text.match(regex);

  if (!match) return "";

  return match[1];
}

function extractYearsMention(text) {

  const match = text.match(/(\d+)\+?\s*(years?|yrs?)/i);

  if (match) {
    return parseInt(match[1]);
  }

  return null;
}

function extractDateRanges(text) {
  const months = "(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sept(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)";
  
  const pattern = new RegExp(
    `${months}\\s*\\d{4}\\s*[\\-–—]\\s*(?:present|${months}\\s*\\d{4})`, 
    "gi"
  );

  const matches = text.match(pattern)
  return matches || [];
}

function calculateExperience(ranges) {
  const monthMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, june: 5,
    july: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11
  };

  let totalMonths = 0;
  const now = new Date();

  ranges.forEach(range => {
    // 1. Split by any dash type and TRIM the results to remove spaces
    const parts = range.split(/[–—\-]/).map(p => p.trim().toLowerCase());
    if (parts.length < 2) return;

    const startStr = parts[0];
    const endStr = parts[1];

    const getDetails = (str) => {
      const yearMatch = str.match(/\d{4}/);
      const year = yearMatch ? parseInt(yearMatch[0]) : null;
      
      const monthMatch = str.match(/[a-z]{3,4}/); 
      const month = (monthMatch && monthMap[monthMatch[0]]) !== undefined 
                    ? monthMap[monthMatch[0]] 
                    : 0;
      
      return { year, month };
    };

    const start = getDetails(startStr);
    const end = endStr.includes("present") 
                ? { year: now.getFullYear(), month: now.getMonth() } 
                : getDetails(endStr);

    // 2. Ensure both years are numbers before doing math
    if (!isNaN(start.year) && !isNaN(end.year) && start.year !== null && end.year !== null) {
      const startTotal = (start.year * 12) + start.month;
      const endTotal = (end.year * 12) + end.month;
      
      const diff = endTotal - startTotal;
      totalMonths += Math.max(0, diff);
    }
  });

  const totalYears = totalMonths / 12;
  
  // Logic to return clean string
  if (totalYears === 0) return "0 years";
  return totalYears < 1 ? totalYears.toFixed(1) + " years" : Math.floor(totalYears) + " years";
}
function extractExperience(text) {

  const section = extractExperienceSection(text);
  const cleanedText = section.toLowerCase().replace(/–|—/g, "-").replace(/\s+/g, ' ').trim()
    
  // case 1 direct years
  const direct = extractYearsMention(cleanedText);
  if (direct) return direct + " years";
  

//   case 2 timeline
  const ranges = extractDateRanges(cleanedText);
  if (ranges.length) {
    const years = calculateExperience(ranges);
    return years;
  }

  return null;
}

module.exports = extractExperience