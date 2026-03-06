function extractSalary(text){
const salaryRegex = /(?:salary|global comp|ctc|pay range|compensation)[:\s]*([\$₹£\d,.\s]+(?:k|lakh|lpa|per annum|year|hour|pa)?(?:\s*-\s*[\$₹£\d,.\s]+(?:k|lakh|lpa|per annum|year|hour|pa)?)?)/i;
  const match = text.match(salaryRegex);
  return match ? match[1].trim() : "Not Disclosed";

}

module.exports = extractSalary