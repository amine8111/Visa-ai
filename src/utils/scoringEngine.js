import { COUNTRIES } from '../data/constants';

export const calculateFinancialScore = (bankBalance) => {
  if (bankBalance < 1500) return 5;
  if (bankBalance < 3000) return 15;
  if (bankBalance < 6000) return 25;
  return 30;
};

export const calculateEmploymentScore = (employmentStatus) => {
  switch (employmentStatus) {
    case 'Unemployed':
      return 5;
    case 'Freelancer':
      return 10;
    case 'Employee (< 1 year)':
      return 12;
    case 'Employee (1-3 years)':
      return 16;
    case 'Stable job (3+ years)':
    case 'Self-employed':
    case 'Business Owner':
      return 20;
    case 'Student':
    case 'Retired':
      return 8;
    default:
      return 5;
  }
};

export const calculateTravelScore = (travelHistory, previousVisaRefusals) => {
  const hasMajorVisa = travelHistory > 0 && previousVisaRefusals === 0;
  
  if (travelHistory === 0) return 5;
  if (travelHistory <= 2) return hasMajorVisa ? 20 : 10;
  if (travelHistory <= 5) return hasMajorVisa ? 20 : 15;
  return 20;
};

export const calculateProfileStrength = (age, maritalStatus, previousVisaRefusals) => {
  let score = 0;
  
  if (age >= 25 && age <= 55) {
    score += 8;
  } else if (age >= 18 && age < 25) {
    score += 5;
  } else if (age > 55) {
    score += 4;
  } else {
    score += 2;
  }
  
  if (maritalStatus === 'Married') {
    score += 7;
  } else if (maritalStatus === 'Divorced' || maritalStatus === 'Widowed') {
    score += 3;
  } else {
    score += 5;
  }
  
  score -= previousVisaRefusals * 5;
  
  return Math.max(0, Math.min(15, score));
};

export const calculateDocumentScore = (documents) => {
  let score = 0;
  if (documents.passport) score += 5;
  if (documents.bankStatement) score += 5;
  if (documents.employmentProof) score += 5;
  return score;
};

export const calculateTotalScore = (profile, documents) => {
  const financialScore = calculateFinancialScore(profile.bankBalance);
  const employmentScore = calculateEmploymentScore(profile.employmentStatus);
  const travelScore = calculateTravelScore(profile.travelHistory, profile.previousVisaRefusals);
  const profileStrength = calculateProfileStrength(profile.age, profile.maritalStatus, profile.previousVisaRefusals);
  const documentScore = calculateDocumentScore(documents);
  
  return {
    total: financialScore + employmentScore + travelScore + profileStrength + documentScore,
    breakdown: {
      financial: financialScore,
      employment: employmentScore,
      travel: travelScore,
      profile: profileStrength,
      documents: documentScore
    }
  };
};

export const calculateCountryScores = (baseScore) => {
  return COUNTRIES.map(country => ({
    ...country,
    successRate: Math.round(baseScore * country.multiplier)
  })).sort((a, b) => b.successRate - a.successRate);
};

export const getRiskLevel = (score) => {
  if (score >= 70) return { level: 'Low', color: 'text-green-400' };
  if (score >= 45) return { level: 'Medium', color: 'text-yellow-400' };
  return { level: 'High', color: 'text-red-400' };
};

export const analyzeRisks = (profile, scores) => {
  const risks = [];
  
  if (profile.bankBalance < 3000) {
    risks.push({
      type: 'financial',
      message: 'Low bank balance - Consider increasing savings before applying',
      severity: profile.bankBalance < 1500 ? 'high' : 'medium'
    });
  }
  
  if (profile.travelHistory === 0) {
    risks.push({
      type: 'travel',
      message: 'No travel history - Building travel history can improve approval chances',
      severity: 'high'
    });
  }
  
  if (profile.employmentStatus === 'Unemployed') {
    risks.push({
      type: 'employment',
      message: 'Unstable employment - Secure employment before applying',
      severity: 'high'
    });
  }
  
  if (profile.previousVisaRefusals > 0) {
    risks.push({
      type: 'refusal',
      message: `Previous visa refusal${profile.previousVisaRefusals > 1 ? 's' : ''} on record`,
      severity: profile.previousVisaRefusals > 1 ? 'high' : 'medium'
    });
  }
  
  if (profile.age < 21 || profile.age > 60) {
    risks.push({
      type: 'age',
      message: profile.age < 21 ? 'Young age may require additional documentation' : 'Senior age may require additional health documentation',
      severity: 'low'
    });
  }
  
  if (scores.breakdown.documents < 15) {
    risks.push({
      type: 'documents',
      message: 'Missing documents - Upload all required documents for best results',
      severity: 'medium'
    });
  }
  
  return risks;
};

export const generateActionPlan = (profile, scores, risks) => {
  const actions = [];
  
  if (profile.bankBalance < 6000) {
    actions.push({
      priority: 'high',
      title: 'Increase Bank Balance',
      description: 'Aim for at least $6,000 in savings. Consider waiting 3-6 months to accumulate funds.',
      icon: '💰'
    });
  }
  
  if (profile.travelHistory === 0) {
    actions.push({
      priority: 'high',
      title: 'Build Travel History',
      description: 'Start with easier destinations. Consider applying for tourist visas to neighboring countries first.',
      icon: '✈️'
    });
  }
  
  if (profile.employmentStatus === 'Unemployed') {
    actions.push({
      priority: 'high',
      title: 'Secure Employment',
      description: 'Get stable employment for at least 6 months before applying.',
      icon: '💼'
    });
  }
  
  if (scores.breakdown.documents < 15) {
    actions.push({
      priority: 'medium',
      title: 'Complete Document Collection',
      description: 'Upload passport, bank statement, and employment proof for maximum score.',
      icon: '📄'
    });
  }
  
  if (profile.previousVisaRefusals > 0) {
    actions.push({
      priority: 'medium',
      title: 'Address Previous Refusals',
      description: 'Ensure underlying issues are resolved. Consider applying to less strict countries first.',
      icon: '⚠️'
    });
  }
  
  if (profile.maritalStatus === 'Single' && profile.bankBalance < 10000) {
    actions.push({
      priority: 'low',
      title: 'Strengthen Ties to Home Country',
      description: 'Demonstrate strong economic ties through property, business, or family.',
      icon: '🏠'
    });
  }
  
  return actions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};
