const extractRole = require("./extractRole")
const extractSalary = require("./extractSalary")
const extractSkills = require("./extractSkills")
const extractAbout = require("./extractAbout")
const extractExperience = require("./extractExperience")




function extractJD(text) {
    text.toLowerCase().replace(/–|—/g, "-").replace(/\s+/g, " ").trim()
  return {
    role : extractRole(text),
    salary: extractSalary(text),
    experience: extractExperience(text),
    skills: extractSkills(text),
    about: extractAbout(text)
  };
}


module.exports = extractJD