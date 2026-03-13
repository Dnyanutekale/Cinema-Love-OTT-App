import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Plus, Info, Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-card hover-scale" onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className="card-image-wrapper">
        <img src={movie.poster} alt={movie.title} className="card-image" loading="lazy" />
        <div className="card-overlay">
          <div className="card-actions">
            <button className="action-btn play-mini" title="Play">
              <Play size={18} fill="currentColor" />
            </button>
            <button className="action-btn add-mini" title="Add to Watchlist">
              <Plus size={18} />
            </button>
            <button className="action-btn info-mini" title="More Info">
              <Info size={18} />
            </button>
          </div>
          <div className="card-details">
            <h4 className="card-title truncate">{movie.title}</h4>
            <div className="card-meta">
              <span className="rating-tag">
                <Star size={10} fill="currentColor" /> {movie.rating}
              </span>
              <span className="duration-text">{movie.duration}</span>
            </div>
            <div className="genre-list">
              {movie.genre.slice(0, 2).map((g, i) => (
                <span key={i} className="genre-tag">{g}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .movie-card {
          position: relative;
          min-width: 220px;
          height: 330px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--bg-secondary);
          cursor: pointer;
        }

        .card-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 11, 16, 0.95) 0%, rgba(10, 11, 16, 0) 70%);
          opacity: 0;
          transition: opacity var(--transition-normal);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
        }

        .movie-card:hover .card-overlay {
          opacity: 1;
        }

        .movie-card:hover .card-image {
          transform: scale(1.1);
        }

        .card-actions {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          transform: translateY(10px);
          transition: transform var(--transition-normal);
        }

        .movie-card:hover .card-actions {
          transform: translateY(0);
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          color: white;
        }

        .action-btn:hover {
          background: white;
          color: black;
          border-color: white;
        }

        .play-mini:hover {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .card-title {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .rating-tag {
          color: #ffb800;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
        }

        .duration-text {
          color: var(--text-muted);
        }

        .genre-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .genre-tag {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 8px;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .movie-card {
            min-width: 160px;
            height: 240px;
          }
          .card-actions { display: none; }
        }
      `}</style>
    </div>
  );
};

export default MovieCard;
