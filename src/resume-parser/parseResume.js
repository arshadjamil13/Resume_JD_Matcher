const fs =require('fs')
const pdf = require("pdf-parse")
const extractResume = require("./extractResume")

async function parseResume(resumefile) {
  try {
    
    const dataBuffer = resumefile.buffer;
   
    // Parse PDF
    const data = await pdf(dataBuffer);

    // Extracted text
    const text = data.text.toLowerCase().trim();

    const extractedData = extractResume(text)

    return extractedData

  } catch (error) {
    console.error("Error parsing resume:", error);
  }
}

module.exports = parseResume