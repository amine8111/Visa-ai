import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield, Globe, AlertTriangle, CheckCircle, ArrowRight,
  RefreshCw, Download, Share2, Home as HomeIcon
} from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  const { assessment, reset, startSimulator, isSimulatorMode, activeProfile, updateSimulatorProfile, exitSimulator } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!assessment) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No assessment found</p>
          <button onClick={() => navigate('/profile')} className="btn-primary mt-4">
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const { totalScore, breakdown, countryScores, riskLevel, risks, actions } = assessment;

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-400';
    if (score >= 45) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 70) return 'from-green-500 to-emerald-600';
    if (score >= 45) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const handleNewAssessment = () => {
    reset();
    navigate('/profile');
  };

  const handleSimulator = () => {
    if (isSimulatorMode) {
      exitSimulator();
    } else {
      startSimulator();
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Visa Assessment</h1>
            <p className="text-gray-400">Based on your profile and documents</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSimulator}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
                isSimulatorMode
                  ? 'bg-neon-purple text-white border-neon-purple'
                  : 'border-white/20 text-white hover:bg-white/5'
              }`}
            >
              <RefreshCw size={18} />
              {isSimulatorMode ? 'Exit Simulator' : 'What-If Simulator'}
            </button>
          </div>
        </div>

        {isSimulatorMode && (
          <div className="card p-4 mb-6 bg-yellow-500/10 border-yellow-500/30">
            <p className="text-yellow-300 text-sm flex items-center gap-2">
              <RefreshCw size={16} />
              Simulator Mode: Adjust values below to see how they affect your score
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="card p-6 text-center sticky top-24">
              <h3 className="text-gray-400 text-sm mb-2">Overall Score</h3>
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-navy-700"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(totalScore / 100) * 440} 440`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(totalScore)}`}>
                    {totalScore}
                  </span>
                  <span className="text-gray-400 text-sm">out of 100</span>
                </div>
              </div>

              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-700 ${riskLevel.color}`}>
                <Shield size={18} />
                <span className="font-semibold">{riskLevel.level} Risk</span>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Score Breakdown</h4>
                <div className="space-y-3 text-sm">
                  {Object.entries(breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key}</span>
                      <span className="text-white font-medium">{value}/{(key === 'documents' ? 15 : key === 'profile' ? 15 : key === 'travel' ? 20 : key === 'employment' ? 20 : 30)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="text-neon-purple" size={20} />
                <h3 className="text-xl font-semibold text-white">Country Recommendations</h3>
              </div>
              <div className="space-y-3">
                {countryScores.slice(0, 6).map((country, index) => (
                  <div
                    key={country.name}
                    className="flex items-center justify-between p-3 bg-navy-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <p className="text-white font-medium">{country.name}</p>
                        <p className="text-gray-400 text-xs">Multiplier: {country.multiplier}x</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getScoreColor(country.successRate)}`}>
                        {country.successRate}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h3 className="text-xl font-semibold text-white">Risk Factors</h3>
              </div>
              {risks.length > 0 ? (
                <div className="space-y-3">
                  {risks.map((risk, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        risk.severity === 'high'
                          ? 'bg-red-500/10 border border-red-500/30'
                          : risk.severity === 'medium'
                          ? 'bg-yellow-500/10 border border-yellow-500/30'
                          : 'bg-blue-500/10 border border-blue-500/30'
                      }`}
                    >
                      <p className="text-white">{risk.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle size={18} />
                  <span>No significant risk factors identified</span>
                </div>
              )}
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-green-400" size={20} />
                <h3 className="text-xl font-semibold text-white">Action Plan</h3>
              </div>
              <div className="space-y-3">
                {actions.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-navy-700 rounded-lg">
                    <span className="text-2xl">{action.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium">{action.title}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            action.priority === 'high'
                              ? 'bg-red-500/20 text-red-400'
                              : action.priority === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {action.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{action.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6 bg-yellow-500/10 border-yellow-500/30">
              <h4 className="text-yellow-300 font-semibold mb-2">Disclaimer</h4>
              <p className="text-yellow-200/80 text-sm">
                VisaAI provides estimated probabilities based on general criteria and does not guarantee
                visa approval. Actual outcomes depend on individual circumstances and embassy decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleNewAssessment}
            className="btn-primary flex items-center gap-2"
          >
            <HomeIcon size={18} />
            Start New Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
