
const extractName = require("./extractName")
const extractSkillsSection = require("./extractResumeSkills")
const extractExperience = require("./extractResumeExperience")

 function extractResume(text) {

  const name = extractName(text);
  const skills = extractSkillsSection(text);
  const experience = extractExperience(text);

  return {
    name,
    skills,
    experience
  };
}

module.exports =extractResume