import { COUNTRIES, getVisaRequirement, getCountryDailyRequirement, getRegionRefusalRate, EASIEST_SCHENGEN_COUNTRIES } from '../data/constants';

export const calculateFinancialScore = (bankBalance, targetCountry) => {
  const balance = parseFloat(bankBalance) || 0;
  const dailyReq = getCountryDailyRequirement(targetCountry);
  const totalRequired = dailyReq * 30;
  
  if (balance < dailyReq * 7) return 3;
  if (balance < dailyReq * 14) return 8;
  if (balance < totalRequired * 0.5) return 12;
  if (balance < totalRequired) return 18;
  if (balance < totalRequired * 1.5) return 24;
  return 30;
};

export const calculateEmploymentScore = (employmentStatus, monthlyIncome) => {
  let score = 0;
  const income = parseFloat(monthlyIncome) || 0;
  
  switch (employmentStatus) {
    case 'Unemployed':
      score = 2;
      break;
    case 'Student':
      score = 5;
      break;
    case 'Retired':
      score = 6;
      break;
    case 'Freelancer':
      score = income > 3000 ? 14 : 10;
      break;
    case 'Employee (< 1 year)':
      score = 8;
      break;
    case 'Employee (1-3 years)':
      score = 12;
      break;
    case 'Employee (3-5 years)':
      score = 16;
      break;
    case 'Stable job (5+ years)':
      score = 20;
      break;
    case 'Self-employed':
      score = income > 5000 ? 16 : 12;
      break;
    case 'Business Owner':
      score = income > 10000 ? 20 : 16;
      break;
    default:
      score = 5;
  }
  
  return score;
};

export const calculateTravelScore = (travelHistory, previousVisaRefusals) => {
  const refusals = parseInt(previousVisaRefusals) || 0;
  const trips = parseInt(travelHistory) || 0;
  
  if (trips === 0) return 5;
  if (trips === 1) return 10;
  if (trips <= 3) return 14;
  if (trips <= 5) return 17;
  if (trips <= 10) return 19;
  return 20;
};

export const calculateProfileStrength = (age, maritalStatus, previousVisaRefusals) => {
  const ageNum = parseInt(age) || 0;
  const refusals = parseInt(previousVisaRefusals) || 0;
  let score = 0;
  
  if (ageNum >= 25 && ageNum <= 55) {
    score += 8;
  } else if (ageNum >= 18 && ageNum < 25) {
    score += 5;
  } else if (ageNum > 55 && ageNum <= 65) {
    score += 4;
  } else if (ageNum > 65) {
    score += 2;
  } else {
    score += 2;
  }
  
  if (maritalStatus === 'Married') {
    score += 7;
  } else if (maritalStatus === 'Divorced' || maritalStatus === 'Widowed') {
    score += 3;
  } else {
    score += 4;
  }
  
  score -= refusals * 5;
  
  return Math.max(0, Math.min(15, score));
};

export const calculateDocumentScore = (documents) => {
  let score = 0;
  if (documents.passport) score += 5;
  if (documents.bankStatement) score += 5;
  if (documents.employmentProof) score += 5;
  return score;
};

export const calculateTotalScore = (profile, documents, targetCountry = 'France') => {
  const financialScore = calculateFinancialScore(profile.bankBalance, targetCountry);
  const employmentScore = calculateEmploymentScore(profile.employmentStatus, profile.monthlyIncome);
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

export const calculateCountryScores = (baseScore, nationality) => {
  const regionRefusalRate = getRegionRefusalRate(nationality);
  const baseRisk = regionRefusalRate / 100;
  
  return COUNTRIES.map(country => {
    const visaReq = getVisaRequirement(nationality, country.name);
    
    let adjustedScore = baseScore;
    
    if (!visaReq.required) {
      adjustedScore = Math.min(100, adjustedScore + 15);
    }
    
    if (country.approvalRate) {
      const countryApproval = country.approvalRate / 100;
      adjustedScore = adjustedScore * ((countryApproval + 0.5) / 1.5);
    }
    
    adjustedScore = Math.max(0, Math.min(100, adjustedScore));
    
    return {
      ...country,
      visaRequired: visaReq.required,
      visaReason: visaReq.reason,
      successRate: Math.round(adjustedScore)
    };
  }).sort((a, b) => b.successRate - a.successRate);
};

export const getRiskLevel = (score) => {
  if (score >= 75) return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/20' };
  if (score >= 55) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
  if (score >= 35) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-500/20' };
  return { level: 'Very High', color: 'text-red-400', bg: 'bg-red-500/20' };
};

export const analyzeRisks = (profile, scores) => {
  const risks = [];
  const bankBalance = parseFloat(profile.bankBalance) || 0;
  const travelHistory = parseInt(profile.travelHistory) || 0;
  const refusals = parseInt(profile.previousVisaRefusals) || 0;
  const age = parseInt(profile.age) || 0;
  const monthlyIncome = parseFloat(profile.monthlyIncome) || 0;
  
  const dailyRequired = getCountryDailyRequirement('France');
  
  if (bankBalance < dailyRequired * 14) {
    risks.push({
      type: 'financial',
      title: 'Insufficient Financial Proof',
      message: bankBalance < dailyRequired * 7 
        ? `Critical: Bank balance is very low. Schengen countries typically require €${dailyRequired}/day. Aim for at least €${dailyRequired * 14} (2 weeks).`
        : `Bank balance may be insufficient. Most Schengen countries require €${dailyRequired}/day. Current balance covers approximately ${Math.floor(bankBalance / dailyRequired)} days.`,
      severity: bankBalance < dailyRequired * 7 ? 'high' : 'medium'
    });
  }
  
  if (!monthlyIncome || monthlyIncome < 500) {
    risks.push({
      type: 'income',
      title: 'Low or No Regular Income',
      message: 'Stable monthly income is crucial. Consulates prefer seeing regular salary credits for at least 6 months.',
      severity: 'high'
    });
  }
  
  if (travelHistory === 0) {
    risks.push({
      type: 'travel',
      title: 'No International Travel History',
      message: 'First-time travelers face higher rejection. Consider building travel history with easier destinations (Turkey, Georgia, Southeast Asia) before applying for Schengen.',
      severity: 'high'
    });
  } else if (travelHistory < 3) {
    risks.push({
      type: 'travel',
      title: 'Limited Travel History',
      message: 'Having only a few trips may raise concerns. Stronger applications typically have 3+ international trips.',
      severity: 'medium'
    });
  }
  
  if (profile.employmentStatus === 'Unemployed') {
    risks.push({
      type: 'employment',
      title: 'Unemployment Risk',
      message: 'Being unemployed significantly increases rejection risk. Secure employment first, or consider having a sponsor.',
      severity: 'high'
    });
  } else if (profile.employmentStatus === 'Freelancer' || profile.employmentStatus === 'Self-employed') {
    risks.push({
      type: 'employment',
      title: 'Freelancer/Self-Employed Consideration',
      message: 'Self-employment requires stronger financial proof. Provide contracts, invoices, and 6+ months of business bank statements.',
      severity: 'medium'
    });
  }
  
  if (refusals > 0) {
    risks.push({
      type: 'refusal',
      title: refusals > 1 ? 'Multiple Previous Refusals' : 'Previous Visa Refusal',
      message: refusals > 1
        ? `${refusals} previous refusals on record. Each rejection makes future applications harder. Address all issues before reapplying.`
        : 'Previous refusal must be addressed. Explain what changed in your circumstances in your cover letter.',
      severity: refusals > 1 ? 'high' : 'medium'
    });
  }
  
  if (age < 21 || age > 65) {
    risks.push({
      type: 'age',
      title: age < 21 ? 'Young Applicant' : 'Senior Applicant',
      message: age < 21
        ? 'Young applicants need stronger proof of ties to home country (university enrollment, family property, sponsored trip).'
        : 'Senior applicants may need additional documentation: pension proof, medical insurance, sponsor letter.',
      severity: 'low'
    });
  }
  
  if (profile.maritalStatus === 'Single' && !profile.employmentStatus.includes('Employee') && bankBalance < 10000) {
    risks.push({
      type: 'ties',
      title: 'Weak Ties to Home Country',
      message: 'Single applicants with unstable employment and low savings may be seen as potential overstay risk. Strengthen ties with property, family, or business proof.',
      severity: 'medium'
    });
  }
  
  if (scores.breakdown.documents < 15) {
    risks.push({
      type: 'documents',
      title: 'Incomplete Documents',
      message: 'Missing documents are a common rejection reason. Required: passport, photos, travel insurance (€30,000+), bank statements, employment letter.',
      severity: 'high'
    });
  }
  
  return risks;
};

export const generateActionPlan = (profile, scores, risks) => {
  const actions = [];
  const bankBalance = parseFloat(profile.bankBalance) || 0;
  const travelHistory = parseInt(profile.travelHistory) || 0;
  const refusals = parseInt(profile.previousVisaRefusals) || 0;
  const monthlyIncome = parseFloat(profile.monthlyIncome) || 0;
  
  if (bankBalance < 3000 || monthlyIncome < 1000) {
    actions.push({
      priority: 'high',
      title: 'Improve Financial Position',
      description: `Aim for at least €3,000-5,000 in savings. Show 3-6 months of consistent bank statements. Consider a sponsor if needed.`,
      icon: '💰'
    });
  }
  
  if (travelHistory === 0) {
    actions.push({
      priority: 'high',
      title: 'Build Travel History First',
      description: 'Start with visa-free or easier destinations: Turkey, Georgia, Albania, or Southeast Asia. These builds credibility for future Schengen applications.',
      icon: '✈️'
    });
  }
  
  if (profile.employmentStatus === 'Unemployed') {
    actions.push({
      priority: 'high',
      title: 'Secure Employment',
      description: 'Get stable employment for at least 6 months before applying. Employment is one of the strongest factors for visa approval.',
      icon: '💼'
    });
  }
  
  if (refusals > 0) {
    actions.push({
      priority: 'high',
      title: 'Address Previous Rejections',
      description: 'If rejected, wait 3-6 months, fix the specific reason for rejection, and apply to an easier Schengen country (Poland, Hungary, Czech Republic have higher approval rates).',
      icon: '📋'
    });
  }
  
  if (scores.breakdown.documents < 15) {
    actions.push({
      priority: 'medium',
      title: 'Complete Document Checklist',
      description: 'Ensure: (1) Valid passport 3+ months, (2) Travel insurance €30,000+, (3) 3-month bank statements with stamps, (4) Employment letter on letterhead, (5) Hotel bookings, (6) Flight reservation.',
      icon: '📄'
    });
  }
  
  if (profile.employmentStatus === 'Freelancer' || profile.employmentStatus === 'Self-employed') {
    actions.push({
      priority: 'medium',
      title: 'Strengthen Self-Employment Proof',
      description: 'Provide: business registration, 6+ months business bank statements, client contracts, invoices, and tax returns.',
      icon: '📊'
    });
  }
  
  if (profile.maritalStatus === 'Single' && bankBalance < 15000) {
    actions.push({
      priority: 'medium',
      title: 'Strengthen Home Country Ties',
      description: 'Show property documents, family certificates, business ownership, or enrollment in local university/college.',
      icon: '🏠'
    });
  }
  
  if (scores.breakdown.travel < 15) {
    actions.push({
      priority: 'low',
      title: 'Travel More Before Schengen',
      description: 'Build a travel portfolio with 3-5 international trips to demonstrate good travel history.',
      icon: '🌍'
    });
  }
  
  actions.push({
    priority: 'medium',
    title: 'Apply to Easiest Schengen Countries',
    description: `Highest approval rates: Slovakia (94%), Hungary (93%), Poland (92%), Czech Republic (91%). Avoid Malta, Belgium if possible.`,
    icon: '🎯'
  });
  
  actions.push({
    priority: 'low',
    title: 'Apply During Off-Peak Season',
    description: 'Apply in winter (November-February) for faster processing and less competition. Avoid summer peak (June-August).',
    icon: '📅'
  });
  
  return actions.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};
