import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Library, Download, History, Bookmark, Settings, User, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Compass size={24} />, label: 'Discover', path: '/discover' },
    { icon: <Library size={24} />, label: 'Library', path: '/library' },
    { icon: <Download size={24} />, label: 'Downloads', path: '/downloads' },
    { icon: <History size={24} />, label: 'History', path: '/history' },
    { icon: <Bookmark size={24} />, label: 'Watchlist', path: '/watchlist' },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-logo">
        <div className="logo-box">S</div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            {item.icon}
            <span className="tooltip text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-link" title="Settings">
          <Settings size={24} />
          <span className="tooltip text-sm">Settings</span>
        </button>
        <button className="sidebar-link profile-trigger" title="Profile">
          <div className="avatar-mini">
            <User size={18} />
          </div>
          <span className="tooltip text-sm">Profile</span>
        </button>
      </div>

      <style>{`
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 0;
          z-index: 1000;
          border-left: none;
          transition: width var(--transition-normal);
        }

        .sidebar-logo {
          margin-bottom: 3rem;
        }

        .logo-box {
          width: 40px;
          height: 40px;
          background: var(--accent-gradient);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.5rem;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
        }

        .sidebar-link {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          position: relative;
          background: transparent;
        }

        .sidebar-link:hover, .sidebar-link.active {
          color: var(--accent-primary);
          background: rgba(229, 9, 20, 0.1);
        }

        .sidebar-link.active::before {
          content: '';
          position: absolute;
          left: -16px;
          width: 4px;
          height: 20px;
          background: var(--accent-primary);
          border-radius: 0 4px 4px 0;
          box-shadow: 0 0 10px var(--accent-primary);
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: auto;
        }

        .avatar-mini {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: var(--bg-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--glass-border);
          overflow: hidden;
        }

        .tooltip {
          position: absolute;
          left: 100%;
          margin-left: 15px;
          background: var(--bg-secondary);
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transition: var(--transition-fast);
          white-space: nowrap;
          border: 1px solid var(--glass-border);
          box-shadow: var(--shadow-md);
        }

        .sidebar-link:hover .tooltip {
          opacity: 1;
          transform: translateX(5px);
        }

        @media (max-width: 1024px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
