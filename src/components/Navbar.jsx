import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, User, RotateCcw, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { reset } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    reset();
    navigate('/auth');
  };

  const handleNewAssessment = () => {
    reset();
    navigate('/profile');
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/documents', label: 'Documents', icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to={user ? "/home" : "/auth"} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold gradient-text">VisaAI</span>
          </Link>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-neon-purple/20 text-neon-purple'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleNewAssessment}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors"
                >
                  <RotateCcw size={18} />
                  <span>New</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>

              <button
                className="md:hidden text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}
        </div>

        {user && menuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === item.path
                    ? 'bg-neon-purple/20 text-neon-purple'
                    : 'text-gray-300'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={() => { handleNewAssessment(); setMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 w-full"
            >
              <RotateCcw size={18} />
              <span>New Assessment</span>
            </button>
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 w-full"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
