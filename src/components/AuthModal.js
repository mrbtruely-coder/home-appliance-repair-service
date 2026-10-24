'use client';
import { useState, useEffect } from 'react';
import { X, UserRound, UserPlus, LockKeyhole, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    setMode(initialMode);
    setError('');
  }, [initialMode, isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.trim().length < 4) {
      setError('Enter at least 4 characters in the password/OTP field.');
      return;
    }

    try {
      const userObj = {
        name: 'Doorstep Member',
        phone: cleanPhone,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('doorstep-user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('doorstep-auth-change'));
      showToast('Signed in successfully!', 'success');
      onClose();
    } catch {
      setError('Could not save login in browser storage.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const userObj = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('doorstep-user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('doorstep-auth-change'));
      showToast(`Welcome, ${name.trim()}! Account created.`, 'success');
      onClose();
    } catch {
      setError('Could not create account in browser storage.');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Tab switch between Sign In and Register */}
        <div className="auth-modal-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setError('');
            }}
          >
            <UserRound size={16} /> Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register');
              setError('');
            }}
          >
            <UserPlus size={16} /> Register
          </button>
        </div>

        <div className="auth-modal-content">
          {mode === 'login' ? (
            <>
              <div className="auth-modal-header">
                <span className="eyebrow" style={{ fontSize: 10 }}>
                  WELCOME BACK
                </span>
                <h2>Sign in to Doorstep</h2>
                <p>Track your appliance service requests & bookings</p>
              </div>

              <form onSubmit={handleLogin} className="auth-form-inner">
                <div className="auth-input-group">
                  <label>Mobile Number</label>
                  <div className="auth-input-field">
                    <Phone size={16} />
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>Password / OTP</label>
                  <div className="auth-input-field">
                    <LockKeyhole size={16} />
                    <input
                      type="password"
                      placeholder="Enter password or OTP"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="button button-primary auth-submit-btn">
                  Sign In <LockKeyhole size={16} />
                </button>
              </form>

              <div className="auth-switch-note">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="auth-link-inline"
                  onClick={() => {
                    setMode('register');
                    setError('');
                  }}
                >
                  Create one now
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="auth-modal-header">
                <span className="eyebrow" style={{ fontSize: 10 }}>
                  CREATE ACCOUNT
                </span>
                <h2>Join Doorstep</h2>
                <p>Fast booking, transparent ₹299 repair & expert support</p>
              </div>

              <form onSubmit={handleRegister} className="auth-form-inner">
                <div className="auth-input-group">
                  <label>Full Name</label>
                  <div className="auth-input-field">
                    <UserRound size={16} />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>Mobile Number</label>
                  <div className="auth-input-field">
                    <Phone size={16} />
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                    />
                  </div>
                </div>

                <div className="auth-input-group">
                  <label>Email Address (Optional)</label>
                  <div className="auth-input-field">
                    <Mail size={16} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="button button-primary auth-submit-btn">
                  Create Account <UserPlus size={16} />
                </button>
              </form>

              <div className="auth-switch-note">
                Already registered?{' '}
                <button
                  type="button"
                  className="auth-link-inline"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                >
                  Sign In
                </button>
              </div>
            </>
          )}

          <div className="auth-modal-perks">
            <span>
              <CheckCircle2 size={13} color="#10B981" /> No OTP delays
            </span>
            <span>
              <CheckCircle2 size={13} color="#10B981" /> Saved Hyderabad locations
            </span>
            <span>
              <CheckCircle2 size={13} color="#10B981" /> 100% Free registration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
