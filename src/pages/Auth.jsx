import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (name.length < 2) {
      setError('Please enter your full name');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-3xl">V</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {step === 1 ? 'Get Started' : step === 2 ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {step === 1 
              ? 'Assess your visa approval chances before you apply' 
              : step === 2 
              ? 'Create your account to get started' 
              : 'Sign in to continue to your account'}
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3 text-lg"
              >
                Create Account
                <ArrowRight size={20} />
              </button>
              
              <button
                onClick={() => setStep(3)}
                className="w-full py-4 px-6 rounded-lg border border-white/20 text-white hover:bg-white/5 flex items-center justify-center gap-3"
              >
                I already have an account
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="input pl-10"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="input pl-10"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div>
                <label className="label">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="input pl-10"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button
                onClick={handleRegister}
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                  </>
                )}
              </button>

              <button
                onClick={() => { setStep(1); setError(''); }}
                className="w-full text-gray-400 text-sm hover:text-white"
              >
                ← Back
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="label">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input pl-10"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input pl-10"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Sign In'
                )}
              </button>

              <button
                onClick={() => { setStep(1); setError(''); }}
                className="w-full text-gray-400 text-sm hover:text-white"
              >
                ← Back
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
