import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Library, User } from 'lucide-react';

const BottomNav = () => {
  const items = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <Compass size={22} />, label: 'Discover', path: '/discover' },
    { icon: <Library size={22} />, label: 'Library', path: '/library' },
    { icon: <User size={22} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="bottom-nav glass d-mobile-only">
      {items.map((item, index) => (
        <NavLink 
          key={index} 
          to={item.path} 
          className={({ isActive }) => `bottom-link ${isActive ? 'active' : ''}`}
        >
          {item.icon}
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          display: none;
          align-items: center;
          justify-content: space-around;
          padding-bottom: 5px;
          z-index: 1000;
          border-top: 1px solid var(--glass-border);
          border-bottom: none;
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
        }

        .bottom-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          transition: var(--transition-fast);
          width: 25%;
        }

        .bottom-link.active {
          color: var(--accent-primary);
        }

        .text-xs {
          font-size: 0.7rem;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .bottom-nav {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
