import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SearchResults from './pages/SearchResults';
import Categories from './pages/Categories';
import Subscription from './pages/Subscription';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main-wrapper">
          <Sidebar />
          
          <div className="content-area">
            <Navbar />
            
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/discover" element={<Categories />} />
                <Route path="/subscription" element={<Subscription />} />
              </Routes>
            </main>
          </div>

          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
