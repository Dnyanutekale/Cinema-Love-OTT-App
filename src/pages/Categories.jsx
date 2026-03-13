import React from 'react';
import { movies } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { Film, Tv, PlayCircle, Heart } from 'lucide-react';

const Categories = () => {
  const allGenres = [...new Set(movies.flatMap(m => m.genre))];
  
  const categoryIcons = {
    'Action': <Film />,
    'Sci-Fi': <Tv />,
    'Drama': <PlayCircle />,
    'Comedy': <Heart />,
  };

  return (
    <div className="categories-page container fade-in">
      <div className="categories-header animate-slide-up">
        <h1 className="section-title">Explore Categories</h1>
        <p className="text-muted">Browse through our curated collection of genres.</p>
      </div>

      <div className="category-grid animate-slide-up">
        {allGenres.map((genre, i) => (
          <div key={i} className="category-card glass">
            <div className="category-icon">
              {categoryIcons[genre] || <Film />}
            </div>
            <h3 className="category-name">{genre}</h3>
            <p className="category-count">
              {movies.filter(m => m.genre.includes(genre)).length} titles
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .categories-page {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .categories-header {
          margin-bottom: 3rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .category-card {
          padding: 2.5rem;
          text-align: center;
          cursor: pointer;
          transition: var(--transition-normal);
        }

        .category-card:hover {
          background: rgba(229, 9, 20, 0.05);
          border-color: var(--accent-primary);
          transform: translateY(-5px);
        }

        .category-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1.5rem;
          background: var(--bg-accent);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
        }

        .category-name { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .category-count { color: var(--text-dim); font-size: 0.9rem; }
      `}</style>
    </div>
  );
};

export default Categories;
