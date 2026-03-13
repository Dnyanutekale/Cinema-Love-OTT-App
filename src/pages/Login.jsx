import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-backdrop">
        <img src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1600&q=80" alt="Backdrop" />
        <div className="backdrop-overlay"></div>
      </div>

      <div className="login-card-container animate-slide-up">
        <div className="login-card glass">
          <div className="login-header text-center">
            <h1 className="brand-logo"><span className="accent-text">Stream</span>Sphere</h1>
            <p className="text-muted">Welcome back! Please enter your details.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="show-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-extras">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button" className="forgot-password">Forgot password?</button>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-footer text-center">
            <p>Don't have an account? <button className="accent-text">Sign up for free</button></p>
            <div className="demo-hint">
              <p className="text-xs">Demo Admin: admin@stream.com</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .login-page {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1005;
          margin-left: -80px; /* Counter sidebar width in central view */
        }

        @media (max-width: 1024px) {
          .login-page { margin-left: 0; }
        }

        .login-backdrop {
          position: fixed;
          inset: 0;
          z-index: -1;
        }

        .login-backdrop img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .login-card-container {
          width: 100%;
          max-width: 450px;
          padding: 1.5rem;
        }

        .login-card {
          padding: 3rem 2.5rem;
          border-radius: var(--radius-lg);
        }

        .brand-logo {
          font-size: 2.25rem;
          margin-bottom: 0.5rem;
        }

        .login-form {
          margin: 2.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-dim);
        }

        .input-with-icon input {
          width: 100%;
          height: 48px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 0 1rem 0 2.75rem;
          color: white;
          font-size: 1rem;
          transition: var(--transition-fast);
        }

        .input-with-icon input:focus {
          border-color: var(--accent-primary);
          background: rgba(255, 255, 255, 0.1);
          outline: none;
        }

        .show-password-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          color: var(--text-dim);
        }

        .form-extras {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: var(--text-muted);
        }

        .forgot-password {
          color: var(--accent-primary);
          background: transparent;
          font-weight: 600;
        }

        .btn-full {
          width: 100%;
          height: 50px;
          justify-content: center;
          font-size: 1.1rem;
        }

        .login-footer p {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .demo-hint {
          margin-top: 1.5rem;
          padding: 8px;
          background: rgba(229, 9, 20, 0.05);
          border: 1px dashed rgba(229, 9, 20, 0.3);
          border-radius: var(--radius-sm);
        }

        .text-xs { font-size: 0.75rem; }
      `}</style>
    </div>
  );
};

export default Login;
