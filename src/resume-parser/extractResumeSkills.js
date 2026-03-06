function extractSkillsSection(text) {

  const regex = /skills\s*([\s\S]*?)(experience|education|projects|certifications|summary|$)/i;

  const match = text.match(regex);

  if (!match) return [];

  const skillsText = match[1];

  const skills = skillsText
    .split(/\n|,|•|-/)   // split by newline, comma, bullet
    .map(s => s.trim())
    .filter(Boolean);

  return skills;
}

module.exports = extractSkillsSection