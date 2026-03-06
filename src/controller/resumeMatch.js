const parseResume = require("../resume-parser/parseResume")
const parseJD = require("../jd-parser/extractJd")
const calculateScore = require("../skillMatch/calculateScore")


async function resumeMatch (req,res){
    try{
    const resumeFile = req.file
    const {jd} = req.body

      if (!resumeFile) {
      return res.status(400).json({
        error: "Resume PDF is required"
      });
    }

    if (!jd) {
      return res.status(400).json({
        error: "Job Description is required"
      });
    }
    
    const ResumeData = await parseResume(resumeFile)
    const JdData = parseJD(jd)

    const score = calculateScore(ResumeData,[JdData])
    

    const sendData = {
        name : ResumeData.name,
        salary : JdData.salary,
        yearofExperience : ResumeData.experience,
        resumeSkills : ResumeData.skills,
        matchingJobs : score.matchingJobs
    }
    console.log(sendData)
    res.status(200).json(sendData)

    }catch(error){
        console.error(error)
        res.status(500).json({error : "Internal Server Error"})
    }

}


module.exports = resumeMatch