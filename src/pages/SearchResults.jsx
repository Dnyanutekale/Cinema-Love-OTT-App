import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movies } from '../data/mockData';
import MovieCard from '../components/MovieCard';
import { Search as SearchIcon, Filter, X } from 'lucide-react';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const filtered = movies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
      m.director.toLowerCase().includes(query.toLowerCase())
    );
    
    if (activeFilter === 'Movies') {
      setResults(filtered.filter(m => !m.title.toLowerCase().includes('season')));
    } else if (activeFilter === 'Series') {
      setResults(filtered.filter(m => m.title.toLowerCase().includes('season') || m.genre.includes('TV Show')));
    } else {
      setResults(filtered);
    }
  }, [query, activeFilter]);

  return (
    <div className="search-results-page container fade-in">
      <div className="search-header animate-slide-up">
        <h1 className="section-title">
          {query ? `Search results for "${query}"` : "Discover Movies & Series"}
        </h1>
        <p className="text-muted">{results.length} titles found</p>
      </div>

      <div className="filter-bar animate-slide-up">
        <div className="filter-chips">
          {['All', 'Movies', 'Series', 'Recently Added'].map((f) => (
            <button 
              key={f} 
              className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        
        <button className="advanced-filter-btn">
          <Filter size={18} />
          <span>Advanced Filters</span>
        </button>
      </div>

      {results.length > 0 ? (
        <div className="results-grid animate-slide-up">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="no-results animate-slide-up">
          <div className="no-results-icon">
            <SearchIcon size={64} />
          </div>
          <h3>No titles found</h3>
          <p className="text-muted">Try different keywords or browse our categories.</p>
          <button className="btn btn-primary" onClick={() => setSearchParams({ q: '' })}>Clear Search</button>
        </div>
      )}

      <style>{`
        .search-results-page {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .search-header {
          margin-bottom: 2rem;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-chips {
          display: flex;
          gap: 10px;
        }

        .filter-chip {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-weight: 600;
          border: 1px solid var(--glass-border);
        }

        .filter-chip.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .advanced-filter-btn {
          background: transparent;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 2rem;
        }

        .no-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10rem 0;
          text-align: center;
        }

        .no-results-icon {
          color: var(--bg-accent);
          margin-bottom: 1.5rem;
        }

        .no-results h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .no-results p { margin-bottom: 2rem; }

        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchResults;
