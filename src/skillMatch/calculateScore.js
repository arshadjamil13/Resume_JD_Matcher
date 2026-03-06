function calculateScore(resumeData,jdData){
     const resumeSkills = resumeData.skills.map(skill =>
    skill.toLowerCase()
  );

  const matchingJobs = jdData.map(job => {

    const skillsAnalysis = job.skills.map(skill => {
      const present = resumeSkills.includes(skill.toLowerCase());

      return {
        skill: skill,
        presentInResume: present
      };
    });

    const matchedCount = skillsAnalysis.filter(
      s => s.presentInResume
    ).length;

    const matchingScore = Math.round(
      (matchedCount / job.skills.length) * 100
    );

    return {
      role: job.role,
      aboutRole: job.about,
      skillsAnalysis: skillsAnalysis,
      matchingScore: matchingScore
    };
    });
    return { matchingJobs }; 
}

module.exports = calculateScore