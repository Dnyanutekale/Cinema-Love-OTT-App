import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { movies, sections } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const featuredMovies = movies.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextHero = () => setActiveHeroIndex((prev) => (prev + 1) % featuredMovies.length);
  const prevHero = () => setActiveHeroIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeHeroIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="hero-slide"
          >
            <div className="hero-image-container">
              <img src={featuredMovies[activeHeroIndex].poster} alt={featuredMovies[activeHeroIndex].title} className="hero-image" />
              <div className="hero-overlay-top"></div>
              <div className="hero-overlay"></div>
            </div>

            <div className="hero-content container">
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <img src={featuredMovies[activeHeroIndex].logo} alt="Logo" className="hero-logo" />
                <div className="hero-meta">
                  <span className="match-score">98% Match</span>
                  <span>{featuredMovies[activeHeroIndex].year}</span>
                  <span className="age-rating">13+</span>
                  <span>{featuredMovies[activeHeroIndex].duration}</span>
                  <span className="hd-tag">HD</span>
                </div>
                <p className="hero-description">{featuredMovies[activeHeroIndex].description}</p>
                <div className="hero-actions">
                  <button className="btn btn-primary">
                    <Play size={24} fill="currentColor" />
                    <span>Watch Now</span>
                  </button>
                  <button className="btn btn-secondary">
                    <Plus size={24} />
                    <span>Watchlist</span>
                  </button>
                  <button className="btn btn-icon-glass">
                    <Info size={24} />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-navigation container">
          <button className="hero-nav-btn" onClick={prevHero}><ChevronLeft size={30} /></button>
          <button className="hero-nav-btn" onClick={nextHero}><ChevronRight size={30} /></button>
        </div>

        <div className="hero-indicators container">
          {featuredMovies.map((_, i) => (
            <div 
              key={i} 
              className={`indicator ${i === activeHeroIndex ? 'active' : ''}`}
              onClick={() => setActiveHeroIndex(i)}
            ></div>
          ))}
        </div>
      </section>

      {/* Movie Sections */}
      <div className="sections-container container">
        {sections.map((section, idx) => (
          <section key={idx} className="movie-row">
            <div className="row-header">
              <h2 className="row-title">{section.title}</h2>
              <button className="view-all">View All <ChevronRight size={16} /></button>
            </div>
            <div className="movie-slider">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <style>{`
        .home-page {
          padding-bottom: 5rem;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          height: 85vh;
          width: 100%;
          overflow: hidden;
          background: #000;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
        }

        .hero-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(77deg, rgba(10, 11, 16, 0.8) 0%, rgba(10, 11, 16, 0.2) 50%, rgba(10, 11, 16, 0.8) 100%),
                      linear-gradient(to top, rgba(10, 11, 16, 1) 0%, rgba(10, 11, 16, 0) 50%);
        }

        .hero-overlay-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 150px;
          background: linear-gradient(to bottom, rgba(10, 11, 16, 0.9) 0%, rgba(10, 11, 16, 0) 100%);
        }

        .hero-content {
          position: absolute;
          bottom: 20%;
          left: 0;
          right: 0;
          z-index: 10;
        }

        .hero-logo {
          max-width: 350px;
          max-height: 150px;
          object-fit: contain;
          margin-bottom: 2rem;
          filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .match-score { color: #46d369; }
        .age-rating { border: 1px solid var(--text-dim); padding: 1px 6px; border-radius: 4px; font-size: 0.8rem; }
        .hd-tag { border: 1px solid var(--text-dim); padding: 0px 4px; border-radius: 2px; font-size: 0.7rem; }

        .hero-description {
          max-width: 600px;
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn {
          padding: 0.8rem 2rem;
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 1rem;
          gap: 0.75rem;
        }

        .btn-primary {
          background: white;
          color: black;
        }

        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.05);
        }

        .btn-secondary {
          background: rgba(100, 100, 100, 0.3);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(100, 100, 100, 0.5);
          transform: scale(1.05);
        }

        .btn-icon-glass {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(100, 100, 100, 0.3);
          color: white;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-navigation {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          z-index: 5;
          pointer-events: none;
        }

        .hero-nav-btn {
          pointer-events: auto;
          background: transparent;
          color: rgba(255, 255, 255, 0.3);
          transition: var(--transition-fast);
        }

        .hero-nav-btn:hover {
          color: white;
          transform: scale(1.2);
        }

        .hero-indicators {
          position: absolute;
          bottom: 30px;
          right: 0;
          left: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 10;
        }

        .indicator {
          width: 30px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .indicator.active {
          background: var(--accent-primary);
          width: 50px;
        }

        /* Movie Rows */
        .sections-container {
          margin-top: -100px;
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .movie-row {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .row-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .row-title {
          font-size: 1.75rem;
          font-weight: 800;
        }

        .view-all {
          background: transparent;
          color: var(--accent-primary);
          font-weight: 600;
          gap: 4px;
        }

        .movie-slider {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 1rem 0;
          scroll-behavior: smooth;
          scrollbar-width: none; /* Firefox */
        }

        .movie-slider::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        @media (max-width: 1024px) {
          .hero-section { height: 75vh; }
          .hero-logo { max-width: 250px; }
          .hero-description { font-size: 0.95rem; }
          .sections-container { margin-top: -50px; }
          .hero-navigation { display: none; }
        }

        @media (max-width: 768px) {
          .hero-section { height: 60vh; }
          .hero-logo { max-width: 200px; }
          .hero-description { display: none; }
          .hero-actions { scale: 0.8; origin-x: left; }
          .row-title { font-size: 1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default Home;
