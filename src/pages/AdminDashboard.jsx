import React from 'react';
import { 
  Users, TrendingUp, Film, Download, 
  BarChart3, PieChart as PieChartIcon, 
  Plus, Edit2, Trash2, Search, Filter 
} from 'lucide-react';
import { movies } from '../data/mockData';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '12,482', icon: <Users />, color: 'blue' },
    { label: 'Weekly Watch Time', value: '480h', icon: <TrendingUp />, color: 'green' },
    { label: 'Total Movies', value: movies.length, icon: <Film />, color: 'red' },
    { label: 'Active Downloads', value: '1,240', icon: <Download />, color: 'orange' },
  ];

  return (
    <div className="admin-dashboard container fade-in">
      <div className="dashboard-header animate-slide-up">
        <div>
          <h1 className="section-title">Admin Dashboard</h1>
          <p className="text-muted">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          <span>Add New Movie</span>
        </button>
      </div>

      <div className="stats-grid animate-slide-up">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card glass">
            <div className={`stat-icon ${stat.color}`}>{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid animate-slide-up" style={{ animationDelay: '0.2s' }}>
        {/* Reports & Analytics */}
        <div className="dashboard-card glass">
          <div className="card-header">
            <h3><BarChart3 size={20} /> Watch Trends</h3>
          </div>
          <div className="chart-placeholder">
            {/* Simulation of a chart */}
            <div className="chart-bars">
              {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                <div key={i} className="chart-bar-wrapper">
                  <div className="chart-bar" style={{ height: `${h}%` }}></div>
                  <span className="bar-label">Day {i+1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-card glass">
          <div className="card-header">
            <h3><PieChartIcon size={20} /> Genre Popularity</h3>
          </div>
          <div className="genre-stats">
            {[
              { label: 'Action', value: 45, color: '#e50914' },
              { label: 'Sci-Fi', value: 25, color: '#0061ff' },
              { label: 'Drama', value: 20, color: '#ffb800' },
              { label: 'Other', value: 10, color: '#46d369' },
            ].map((g, i) => (
              <div key={i} className="genre-stat-item">
                <div className="genre-info">
                  <span className="dot" style={{ background: g.color }}></span>
                  <span>{g.label}</span>
                </div>
                <span className="genre-value">{g.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Movie Management Table */}
      <div className="movie-management glass animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="card-header flex-between">
          <h3>Movie Management</h3>
          <div className="table-actions">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search movies..." />
            </div>
          </div>
        </div>
        
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Release Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <div className="table-movie-info">
                      <img src={movie.poster} alt="" className="table-thumb" />
                      <span>{movie.title}</span>
                    </div>
                  </td>
                  <td>{movie.genre[0]}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.year}</td>
                  <td>
                    <div className="table-btns">
                      <button className="icon-btn edit"><Edit2 size={16} /></button>
                      <button className="icon-btn delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-dashboard {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon.red { background: rgba(229, 9, 20, 0.15); color: #e50914; }
        .stat-icon.blue { background: rgba(0, 97, 255, 0.15); color: #0061ff; }
        .stat-icon.green { background: rgba(70, 211, 105, 0.15); color: #46d369; }
        .stat-icon.orange { background: rgba(255, 184, 0, 0.15); color: #ffb800; }

        .stat-label { font-size: 0.85rem; color: var(--text-muted); }
        .stat-value { font-size: 1.5rem; font-weight: 800; margin-top: 2px; }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .dashboard-card {
          padding: 1.5rem;
          height: 350px;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
          margin-bottom: 1.5rem;
        }

        .chart-placeholder {
          flex: 1;
          display: flex;
          align-items: flex-end;
          padding-top: 1rem;
        }

        .chart-bars {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 100%;
        }

        .chart-bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .chart-bar {
          width: 30px;
          background: var(--accent-gradient);
          border-radius: 6px 6px 0 0;
          transition: height 1s ease;
        }

        .bar-label { font-size: 0.7rem; color: var(--text-dim); }

        .genre-stats {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .genre-stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .genre-info { display: flex; align-items: center; gap: 10px; font-weight: 500; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .genre-value { color: var(--text-muted); }

        .movie-management {
          padding: 1.5rem;
        }

        .flex-between { justify-content: space-between; }
        
        .search-box {
          background: var(--bg-accent);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          padding: 6px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 0.9rem;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 1rem;
          color: var(--text-dim);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          border-bottom: 1px solid var(--glass-border);
        }

        .admin-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--glass-border);
          font-weight: 500;
        }

        .table-movie-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .table-thumb {
          width: 40px;
          height: 56px;
          border-radius: 4px;
          object-fit: cover;
        }

        .table-btns {
          display: flex;
          gap: 8px;
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
        }

        .icon-btn.edit:hover { background: rgba(0, 97, 255, 0.1); color: #0061ff; }
        .icon-btn.delete:hover { background: rgba(229, 9, 20, 0.1); color: #e50914; }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .dashboard-card { height: 300px; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
