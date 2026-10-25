// Career Recommendation Engine for CareerCompass AI
// Evaluates student profile & assessment answers transparently across skills, dimensions, interests, and preferences

const { SEED_CAREERS } = require('./seedData');

// Dimension affinities for each career path (0 to 1 scale)
const CAREER_AFFINITIES = {
  'software-developer': {
    technical: 0.95,
    problemSolving: 0.95,
    analytical: 0.85,
    creativity: 0.65,
    communication: 0.60,
    leadership: 0.55
  },
  'full-stack-developer': {
    technical: 0.95,
    problemSolving: 0.90,
    analytical: 0.80,
    creativity: 0.80,
    communication: 0.65,
    leadership: 0.60
  },
  'data-analyst': {
    technical: 0.75,
    problemSolving: 0.85,
    analytical: 0.95,
    creativity: 0.60,
    communication: 0.75,
    leadership: 0.60
  },
  'data-scientist': {
    technical: 0.90,
    problemSolving: 0.95,
    analytical: 1.00,
    creativity: 0.70,
    communication: 0.70,
    leadership: 0.60
  },
  'ai-ml-engineer': {
    technical: 1.00,
    problemSolving: 0.95,
    analytical: 0.95,
    creativity: 0.75,
    communication: 0.65,
    leadership: 0.60
  },
  'cybersecurity-analyst': {
    technical: 0.90,
    problemSolving: 0.95,
    analytical: 0.90,
    creativity: 0.60,
    communication: 0.65,
    leadership: 0.60
  },
  'cloud-engineer': {
    technical: 0.90,
    problemSolving: 0.85,
    analytical: 0.85,
    creativity: 0.60,
    communication: 0.65,
    leadership: 0.60
  },
  'ui-ux-designer': {
    technical: 0.60,
    problemSolving: 0.80,
    analytical: 0.65,
    creativity: 1.00,
    communication: 0.85,
    leadership: 0.70
  },
  'product-manager': {
    technical: 0.65,
    problemSolving: 0.85,
    analytical: 0.80,
    creativity: 0.85,
    communication: 0.95,
    leadership: 0.95
  },
  'business-analyst': {
    technical: 0.65,
    problemSolving: 0.85,
    analytical: 0.90,
    creativity: 0.65,
    communication: 0.90,
    leadership: 0.80
  },
  'digital-marketing-specialist': {
    technical: 0.55,
    problemSolving: 0.75,
    analytical: 0.75,
    creativity: 0.95,
    communication: 0.90,
    leadership: 0.75
  },
  'government-exam-preparation': {
    technical: 0.45,
    problemSolving: 0.85,
    analytical: 0.90,
    creativity: 0.55,
    communication: 0.85,
    leadership: 0.90
  }
};

/**
 * Normalizes user text strings for comparison
 */
const normalizeText = (text) => (text || '').toLowerCase().trim();

/**
 * Calculate career recommendations
 */
const calculateRecommendations = (profile = {}, assessment = {}, careersList = SEED_CAREERS) => {
  const userTechSkills = (profile.technicalSkills || []).map(normalizeText);
  const userSoftSkills = (profile.softSkills || []).map(normalizeText);
  const userInterests = (profile.interests || []).map(normalizeText);
  const userEducation = normalizeText(profile.educationLevel || '');
  const userWorkEnv = normalizeText(profile.preferredWorkEnvironment || '');

  // Extract dimension scores (scale 0-10 or 0-100)
  const dims = assessment.dimensionScores || {
    technical: 70,
    problemSolving: 70,
    creativity: 70,
    communication: 70,
    analytical: 70,
    leadership: 70
  };

  const normalizedDims = {
    technical: (dims.technical || 70) / 100,
    problemSolving: (dims.problemSolving || 70) / 100,
    creativity: (dims.creativity || 70) / 100,
    communication: (dims.communication || 70) / 100,
    analytical: (dims.analytical || 70) / 100,
    leadership: (dims.leadership || 70) / 100
  };

  const results = careersList.map((career) => {
    // 1. Skill Match Score (Weight: 35%)
    const requiredTech = career.requiredTechnicalSkills.map(normalizeText);
    const matchedTechSkills = career.requiredTechnicalSkills.filter(reqSkill =>
      userTechSkills.some(userSkill =>
        userSkill.includes(normalizeText(reqSkill)) ||
        normalizeText(reqSkill).includes(userSkill)
      )
    );
    const missingTechSkills = career.requiredTechnicalSkills.filter(reqSkill =>
      !userTechSkills.some(userSkill =>
        userSkill.includes(normalizeText(reqSkill)) ||
        normalizeText(reqSkill).includes(userSkill)
      )
    );

    const techRatio = requiredTech.length > 0 ? (matchedTechSkills.length / requiredTech.length) : 0.5;
    const skillScore = Math.min(100, Math.max(30, Math.round(techRatio * 100 + 25)));

    // 2. Assessment Dimension Fit (Weight: 30%)
    const affinities = CAREER_AFFINITIES[career.slug] || {
      technical: 0.7,
      problemSolving: 0.7,
      analytical: 0.7,
      creativity: 0.7,
      communication: 0.7,
      leadership: 0.7
    };

    let dimensionFitSum = 0;
    let dimensionWeightSum = 0;

    for (const [dimKey, affinityWeight] of Object.entries(affinities)) {
      const studentScore = normalizedDims[dimKey] !== undefined ? normalizedDims[dimKey] : 0.7;
      // Closer student score is to affinity requirement, better the fit
      const fit = 1 - Math.abs(affinityWeight - studentScore) * 0.6;
      dimensionFitSum += fit * affinityWeight;
      dimensionWeightSum += affinityWeight;
    }

    const dimensionScore = Math.min(100, Math.max(35, Math.round((dimensionFitSum / dimensionWeightSum) * 100)));

    // 3. Interest & Affinity Match (Weight: 20%)
    const careerTags = (career.affinityTags || []).map(normalizeText);
    const matchedInterests = userInterests.filter(interest =>
      careerTags.some(tag => tag.includes(interest) || interest.includes(tag))
    );
    const interestRatio = userInterests.length > 0 ? (matchedInterests.length / Math.max(userInterests.length, 3)) : 0.5;
    const interestScore = Math.min(100, Math.max(40, Math.round(interestRatio * 80 + 35)));

    // 4. Education & Work Style Suitability (Weight: 15%)
    let envScore = 75;
    if (userWorkEnv && career.workStyleSuitability) {
      const matchesEnv = career.workStyleSuitability.some(ws => normalizeText(ws).includes(userWorkEnv));
      envScore = matchesEnv ? 92 : 68;
    }

    // Weighted Overall Score
    const compositeScore = Math.round(
      skillScore * 0.35 +
      dimensionScore * 0.30 +
      interestScore * 0.20 +
      envScore * 0.15
    );

    // Keep score bounded between 48% and 97% for motivating, credible feedback
    const finalScore = Math.min(97, Math.max(48, compositeScore));

    // Generate clear, personalized why-match explanation
    let whyMatch = '';
    if (matchedTechSkills.length > 0) {
      whyMatch = `Strong synergy with your existing skillset in ${matchedTechSkills.slice(0, 3).join(', ')}. `;
    } else {
      whyMatch = `High compatibility with your analytical curiosity and problem-solving orientation. `;
    }

    if (finalScore >= 85) {
      whyMatch += `Your responses indicate standout aptitude for ${career.category.toLowerCase()} problem domains.`;
    } else if (finalScore >= 70) {
      whyMatch += `Solid foundational alignment; closing gap on ${missingTechSkills.slice(0, 2).join(' & ')} will make you highly competitive.`;
    } else {
      whyMatch += `An emerging exploration pathway if you wish to expand beyond your primary discipline.`;
    }

    return {
      slug: career.slug,
      title: career.title,
      category: career.category,
      categoryKey: career.categoryKey,
      description: career.description,
      compatibilityScore: finalScore,
      whyMatch,
      matchedSkills: matchedTechSkills,
      missingSkills: missingTechSkills,
      requiredTechnicalSkills: career.requiredTechnicalSkills,
      requiredSoftSkills: career.requiredSoftSkills,
      typicalRoles: career.typicalRoles,
      approxSalary: career.approxSalary,
      beginnerProjects: career.beginnerProjects,
      roadmapSteps: career.roadmapSteps
    };
  });

  // Sort descending by compatibility score
  results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  return results;
};

module.exports = {
  calculateRecommendations,
  CAREER_AFFINITIES
};
