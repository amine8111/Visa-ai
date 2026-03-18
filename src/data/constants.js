export const COUNTRIES = [
  { name: 'France', code: 'FR', flag: '🇫🇷', type: 'Schengen', multiplier: 1.0, fee: 80, processingDays: 15, approvalRate: 84.2 },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', type: 'Schengen', multiplier: 1.05, fee: 80, processingDays: 15, approvalRate: 84.3 },
  { name: 'Italy', code: 'IT', flag: '🇮🇹', type: 'Schengen', multiplier: 1.02, fee: 80, processingDays: 15, approvalRate: 85.0 },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', type: 'Schengen', multiplier: 0.95, fee: 80, processingDays: 15, approvalRate: 86.3 },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱', type: 'Schengen', multiplier: 0.98, fee: 80, processingDays: 15, approvalRate: 82.0 },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹', type: 'Schengen', multiplier: 1.08, fee: 80, processingDays: 15, approvalRate: 88.0 },
  { name: 'Greece', code: 'GR', flag: '🇬🇷', type: 'Schengen', multiplier: 1.10, fee: 80, processingDays: 15, approvalRate: 89.0 },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭', type: 'Schengen', multiplier: 0.92, fee: 80, processingDays: 15, approvalRate: 88.0 },
  { name: 'Austria', code: 'AT', flag: '🇦🇹', type: 'Schengen', multiplier: 0.90, fee: 80, processingDays: 15, approvalRate: 86.3 },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪', type: 'Schengen', multiplier: 0.88, fee: 80, processingDays: 15, approvalRate: 75.8 },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪', type: 'Schengen', multiplier: 0.85, fee: 80, processingDays: 15, approvalRate: 80.0 },
  { name: 'Poland', code: 'PL', flag: '🇵🇱', type: 'Schengen', multiplier: 1.05, fee: 80, processingDays: 10, approvalRate: 92.0 },
  { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿', type: 'Schengen', multiplier: 1.08, fee: 80, processingDays: 10, approvalRate: 91.0 },
  { name: 'Hungary', code: 'HU', flag: '🇭🇺', type: 'Schengen', multiplier: 1.10, fee: 80, processingDays: 10, approvalRate: 93.0 },
  { name: 'Slovakia', code: 'SK', flag: '🇸🇰', type: 'Schengen', multiplier: 1.12, fee: 80, processingDays: 10, approvalRate: 94.0 },
  { name: 'USA', code: 'US', flag: '🇺🇸', type: 'Visa', multiplier: 0.70, fee: 185, processingDays: 30, approvalRate: 80.0 },
  { name: 'UK', code: 'GB', flag: '🇬🇧', type: 'Visa', multiplier: 0.65, fee: 100, processingDays: 21, approvalRate: 85.0 },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', type: 'Visa', multiplier: 0.72, fee: 100, processingDays: 30, approvalRate: 75.0 },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', type: 'Visa', multiplier: 0.70, fee: 190, processingDays: 30, approvalRate: 80.0 },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', type: 'Visa Waiver', multiplier: 0.85, fee: 0, processingDays: 0, approvalRate: 95.0 },
];

export const NATIONALITIES = {
  VISA_FREE: [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore',
    'Malaysia', 'Hong Kong', 'Taiwan', 'Andorra', 'Monaco', 'San Marino', 'Israel', 'Argentina', 'Brazil', 'Chile',
    'Uruguay', 'Paraguay', 'Mexico', 'Guatemala', 'El Salvador', 'Honduras', 'Costa Rica', 'Panama'
  ],
  SCHENGEN_VISA_REQUIRED: [
    'Afghanistan', 'Algeria', 'Bangladesh', 'Egypt', 'Ethiopia', 'Ghana', 'India', 'Indonesia', 'Iran', 'Iraq',
    'Jordan', 'Kenya', 'Lebanon', 'Libya', 'Morocco', 'Nigeria', 'Pakistan', 'Palestine', 'Philippines', 'Saudi Arabia',
    'Somalia', 'South Africa', 'Sri Lanka', 'Sudan', 'Syria', 'Tunisia', 'Turkey', 'Uganda', 'Vietnam', 'Yemen',
    'Zimbabwe', 'Cuba', 'Haiti', 'Nepal', 'Myanmar', 'Cambodia', 'China', 'North Korea', 'Russia', 'Ukraine'
  ]
};

export const DAILY_FINANCIAL_REQUIREMENTS = {
  'France': 65, 'Germany': 45, 'Italy': 50, 'Spain': 60, 'Netherlands': 55,
  'Belgium': 45, 'Portugal': 40, 'Greece': 50, 'Switzerland': 100, 'Austria': 50,
  'Sweden': 50, 'Poland': 40, 'Czech Republic': 40, 'Hungary': 40, 'Slovakia': 40,
  'USA': 150, 'UK': 100, 'Canada': 100, 'Australia': 100, 'Japan': 50
};

export const VISA_REQUIREMENTS = {
  SCHENGEN: {
    minPassportValidity: 3,
    minBlankPages: 2,
    maxApplicationAdvance: 6,
    minApplicationAdvance: 15,
    insuranceMinCoverage: 30000,
    insuranceMinCoverageCurrency: 'EUR',
    fees: { adult: 80, child_6_12: 40, under_6: 0 },
    processingTime: '15 days',
    multipleEntry: true
  },
  USA: {
    minPassportValidity: 6,
    required: ['DS-160 form', 'Photo', 'Interview', 'Fingerprints'],
    fees: { tourist: 185 },
    processingTime: '3-5 weeks'
  },
  UK: {
    minPassportValidity: 6,
    required: ['Online form', 'Photo', 'Biometrics'],
    fees: { tourist: 100 },
    processingTime: '3 weeks'
  }
};

export const REJECTION_REASONS = {
  FINANCIAL_INSUFFICIENT: { weight: 21, priority: 1 },
  INSURANCE_NON_COMPLIANT: { weight: 15, priority: 2 },
  DOUBTS_RETURN: { weight: 12, priority: 3 },
  UNCLEAR_PURPOSE: { weight: 10, priority: 4 },
  ACCOMMODATION_MISSING: { weight: 8, priority: 5 },
  PREVIOUS_REJECTION: { weight: 8, priority: 6 },
  DOCUMENT_FRAUD: { weight: 5, priority: 7 },
  INCOMPLETE_DOCUMENTS: { weight: 5, priority: 8 }
};

export const REFUSAL_RATES_BY_REGION = {
  'North Africa': 32,
  'Sub-Saharan Africa': 26,
  'South Asia': 15,
  'Middle East': 12,
  'East Asia': 6,
  'Americas': 6,
  'Europe': 5
};

export const EASIEST_SCHENGEN_COUNTRIES = [
  { name: 'Slovakia', rate: 94 },
  { name: 'Hungary', rate: 93 },
  { name: 'Poland', rate: 92 },
  { name: 'Czech Republic', rate: 91 },
  { name: 'Greece', rate: 89 },
  { name: 'Portugal', rate: 88 },
  { name: 'Switzerland', rate: 88 }
];

export const HARDEST_SCHENGEN_COUNTRIES = [
  { name: 'Malta', rate: 62 },
  { name: 'Belgium', rate: 76 },
  { name: 'Sweden', rate: 80 },
  { name: 'France', rate: 84 },
  { name: 'Spain', rate: 84 }
];

export const MARITAL_STATUS = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];

export const EMPLOYMENT_STATUS = [
  'Unemployed',
  'Freelancer',
  'Employee (< 1 year)',
  'Employee (1-3 years)',
  'Employee (3-5 years)',
  'Stable job (5+ years)',
  'Self-employed',
  'Business Owner',
  'Student',
  'Retired'
];

export const getVisaRequirement = (nationality, targetCountry) => {
  const visaFreeCountries = NATIONALITIES.VISA_FREE;
  const euCountries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 
    'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 
    'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'];
  
  if (nationality === targetCountry) {
    return { required: false, reason: 'Citizen of this country' };
  }
  
  if (euCountries.includes(nationality) && euCountries.includes(targetCountry)) {
    return { required: false, reason: 'EU/EEA citizen' };
  }
  
  if (visaFreeCountries.includes(nationality)) {
    return { required: false, reason: 'Visa-free travel allowed' };
  }
  
  return { required: true, reason: 'Schengen visa required' };
};

export const getCountryDailyRequirement = (countryName) => {
  return DAILY_FINANCIAL_REQUIREMENTS[countryName] || 50;
};

export const getRegionRefusalRate = (nationality) => {
  const northAfrica = ['Algeria', 'Egypt', 'Libya', 'Morocco', 'Tunisia', 'Sudan'];
  const subSaharanAfrica = ['Nigeria', 'Ghana', 'Kenya', 'Ethiopia', 'South Africa', 'Tanzania', 'Uganda', 'Zimbabwe', 'Cameroon'];
  const southAsia = ['India', 'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'Afghanistan'];
  const middleEast = ['Iran', 'Iraq', 'Jordan', 'Lebanon', 'Saudi Arabia', 'UAE', 'Turkey', 'Israel'];
  const eastAsia = ['China', 'Japan', 'South Korea', 'Taiwan', 'Hong Kong', 'Vietnam', 'Thailand', 'Indonesia'];
  
  if (northAfrica.includes(nationality)) return REFUSAL_RATES_BY_REGION['North Africa'];
  if (subSaharanAfrica.includes(nationality)) return REFUSAL_RATES_BY_REGION['Sub-Saharan Africa'];
  if (southAsia.includes(nationality)) return REFUSAL_RATES_BY_REGION['South Asia'];
  if (middleEast.includes(nationality)) return REFUSAL_RATES_BY_REGION['Middle East'];
  if (eastAsia.includes(nationality)) return REFUSAL_RATES_BY_REGION['East Asia'];
  
  return 15;
};
