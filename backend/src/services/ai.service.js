// This file defines the interface. Replace function implementation with actual API call.
async function getResumeAnalysis({ text, jobTitle }) {
  // Example response shape — implement API call to Gemini or other LLM
  // Return { suggestions: ['...'], detailed: { ... } }
  // If you use Gemini/OpenAI: send prompt with resume text + jobTitle and ask for ATS-like analysis, improvements, short bullet suggestions, missing keywords.
  return {
    suggestions: [
      `Improve summary to mention ${jobTitle} directly.`,
      'Add 3 bullets for measurable achievements (numbers).'
    ],
    detailed: {
      strengths: ['Projects section present', 'Relevant internship'],
      weaknesses: ['Missing key skills: React, Redux']
    }
  };
}

module.exports = { getResumeAnalysis };
