import React, { useState, useEffect } from 'react';
import { Search, Bell, User, ChevronDown, Menu, LogIn, LayoutDashboard } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container container">
        <div className="nav-left">
          <button className="mobile-menu-btn d-mobile">
            <Menu size={24} />
          </button>
          <Link to="/" className="brand d-mobile">
            <span className="accent-text">Stream</span>Sphere
          </Link>
        </div>

        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search titles, actors, genres..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <span className="search-shortcut">/</span>
        </div>

        <div className="nav-right">
          <button className="nav-icon-btn" title="Notifications">
            <Bell size={22} />
            <span className="notification-dot"></span>
          </button>
          
          {user ? (
            <div className="user-profile-wrapper">
              <div 
                className="user-profile" 
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div className="user-avatar">
                  <img src={user.avatar} alt="User" />
                </div>
                <span className="user-name d-tablet">{user.name}</span>
                <ChevronDown size={14} className="chevron d-tablet" />

                {showDropdown && (
                  <div className="profile-dropdown glass animate-slide-up">
                    <div className="dropdown-user-info">
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    {isAdmin && (
                      <Link to="/admin" className="dropdown-item">
                        <LayoutDashboard size={18} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button className="dropdown-item" onClick={logout}>
                      <User size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="btn btn-primary login-btn" onClick={() => navigate('/login')}>
              <LogIn size={20} />
              <span className="d-tablet">Sign In</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          right: 0;
          left: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 900;
          transition: all var(--transition-normal);
        }

        .navbar.scrolled {
          height: 70px;
          background: rgba(10, 11, 16, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .nav-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .brand {
          font-size: 1.5rem;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
        }

        .accent-text {
          color: var(--accent-primary);
        }

        .search-bar {
          flex: 0 1 500px;
          height: 46px;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          padding: 0 1rem;
          gap: 0.75rem;
          transition: var(--transition-fast);
        }

        .search-bar:focus-within {
          border-color: var(--accent-primary);
          background: var(--bg-accent);
          box-shadow: 0 0 0 4px rgba(229, 9, 20, 0.1);
        }

        .search-icon {
          color: var(--text-muted);
        }

        .search-bar input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          width: 100%;
          font-size: 0.95rem;
        }

        .search-shortcut {
          background: var(--bg-accent);
          color: var(--text-dim);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          border: 1px solid var(--glass-border);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-icon-btn {
          color: var(--text-muted);
          background: transparent;
          position: relative;
        }

        .nav-icon-btn:hover {
          color: white;
        }

        .notification-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
          border: 2px solid var(--bg-primary);
        }

        .user-profile-wrapper { 
          position: relative; 
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: var(--radius-md);
          transition: var(--transition-fast);
        }

        .user-profile:hover {
          background: var(--glass-bg);
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .chevron {
          color: var(--text-dim);
        }

        .profile-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 240px;
          margin-top: 15px;
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          z-index: 1000;
        }

        .dropdown-user-info { margin-bottom: 1rem; }
        .user-email { font-size: 0.75rem; color: var(--text-dim); }
        .dropdown-divider { height: 1px; background: var(--glass-border); margin-bottom: 1rem; }
        
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          color: var(--text-muted);
          transition: var(--transition-fast);
          width: 100%;
          background: transparent;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .login-btn {
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
          border-radius: var(--radius-sm);
        }

        .d-mobile { display: none; }
        
        @media (max-width: 1024px) {
          .navbar {
            left: 0;
            background: var(--bg-primary);
          }
          .d-mobile { display: block; }
          .d-tablet { display: none; }
          .search-bar {
            flex: 0 1 40px;
            padding: 0;
            justify-content: center;
            border: none;
            background: transparent;
          }
          .search-bar input, .search-shortcut {
            display: none;
          }
      `}</style>
    </header>
  );
};

export default Navbar;
