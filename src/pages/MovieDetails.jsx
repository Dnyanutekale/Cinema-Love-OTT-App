import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Plus, Download, ChevronLeft, Star, Clock, Calendar, Check } from 'lucide-react';
import { movies } from '../data/mockData';
import { motion } from 'framer-motion';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="error-page container">
        <h2>Movie not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back Home</button>
      </div>
    );
  }

  return (
    <div className="details-page fade-in">
      <div className="details-backdrop">
        <img src={movie.poster} alt={movie.title} className="backdrop-img" />
        <div className="backdrop-overlay"></div>
      </div>

      <div className="details-content container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
          <span>Back</span>
        </button>

        <div className="main-info animate-slide-up">
          <img src={movie.logo} alt={movie.title} className="details-logo" />
          
          <div className="details-meta">
            <span className="rating-pill">
              <Star size={16} fill="currentColor" /> {movie.rating}
            </span>
            <span className="meta-item"><Clock size={16} /> {movie.duration}</span>
            <span className="meta-item"><Calendar size={16} /> {movie.year}</span>
            <span className="quality-pill">4K ULTRA HD</span>
          </div>

          <div className="genre-pills">
            {movie.genre.map((g, i) => (
              <span key={i} className="genre-pill">{g}</span>
            ))}
          </div>

          <p className="details-description">{movie.description}</p>

          <div className="details-actions">
            <button className="btn btn-primary btn-lg">
              <Play size={24} fill="currentColor" />
              <span>Watch Now</span>
            </button>
            <button className="btn btn-secondary btn-lg">
              <Plus size={24} />
              <span>Watchlist</span>
            </button>
            <button className="btn btn-icon-glass btn-lg">
              <Download size={24} />
            </button>
          </div>
        </div>

        <section className="cast-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="section-title">Director & Cast</h3>
          <div className="cast-grid">
            <div className="cast-card">
              <div className="cast-avatar">
                <div className="avatar-placeholder">{movie.director.charAt(0)}</div>
              </div>
              <div className="cast-info">
                <p className="cast-role">Director</p>
                <p className="cast-name">{movie.director}</p>
              </div>
            </div>
            {movie.cast.map((person, i) => (
              <div key={i} className="cast-card">
                <img src={person.photo} alt={person.name} className="cast-avatar" />
                <div className="cast-info">
                  <p className="cast-role">Actor</p>
                  <p className="cast-name">{person.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="trailer-section animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="section-title">Trailer Preview</h3>
          <div className="trailer-card glass">
            <div className="trailer-preview">
              <img src={movie.poster} alt="Trailer" className="trailer-thumb" />
              <div className="play-overlay">
                <button className="play-btn-large">
                  <Play size={40} fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .details-page {
          position: relative;
          min-height: 100vh;
          padding-bottom: 5rem;
        }

        .details-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 70vh;
          z-index: -1;
        }

        .backdrop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .backdrop-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-primary) 0%, rgba(10, 11, 16, 0.4) 60%, rgba(10, 11, 16, 0.8) 100%);
        }

        .details-content {
          padding-top: 100px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px 16px;
          border-radius: var(--radius-full);
          backdrop-filter: blur(10px);
          margin-bottom: 3rem;
          font-weight: 600;
        }

        .details-logo {
          max-width: 380px;
          max-height: 180px;
          object-fit: contain;
          margin-bottom: 2rem;
        }

        .details-meta {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
        }

        .rating-pill {
          background: #ffb800;
          color: black;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .quality-pill {
          border: 1.5px solid var(--text-dim);
          padding: 1px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          color: var(--text-dim);
        }

        .genre-pills {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .genre-pill {
          background: var(--bg-accent);
          color: white;
          padding: 6px 16px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .details-description {
          max-width: 800px;
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 3rem;
        }

        .details-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 5rem;
        }

        .btn-lg {
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 2rem;
        }

        .cast-grid {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          padding-bottom: 1rem;
        }

        .cast-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 220px;
          background: var(--bg-secondary);
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--glass-border);
        }

        .cast-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-primary);
        }

        .avatar-placeholder {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--bg-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
        }

        .cast-role {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cast-name {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .trailer-card {
          width: 100%;
          max-width: 900px;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .trailer-preview {
          position: relative;
          aspect-ratio: 16 / 9;
        }

        .trailer-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }

        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-btn-large {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(229, 9, 20, 0.9);
          color: white;
          box-shadow: 0 0 30px rgba(229, 9, 20, 0.4);
        }

        @media (max-width: 1024px) {
          .details-logo { max-width: 280px; }
          .details-description { font-size: 1rem; }
        }

        @media (max-width: 768px) {
          .details-content { padding-top: 60px; }
          .details-logo { max-width: 220px; }
          .details-meta { gap: 1rem; flex-wrap: wrap; }
          .details-actions { flex-direction: column; }
          .btn-lg { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default MovieDetails;
