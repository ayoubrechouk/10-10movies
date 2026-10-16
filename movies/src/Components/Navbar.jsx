import { useContext, useState } from 'react';
import { movieContext } from './movieContext';
import { Link } from 'react-router-dom';

const Navbar = ({ filter, onFilterChange }) => {
  const { movies } = useContext(movieContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const watchlistCount = movies.filter(movie => movie.inWatchlist).length;
  const likedCount = movies.filter(movie => movie.liked).length;

  const chooseFilter = (nextFilter) => {
    onFilterChange(nextFilter);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="site-brand" to="/" onClick={() => chooseFilter('ALL')}>
          <span className="brand-mark" aria-hidden="true">5</span>
          <span>Stars <strong>Movies</strong></span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`nav-links${menuOpen ? ' nav-links-open' : ''}`}
          id="primary-navigation"
        >
          <button
            className={filter === 'ALL' ? 'nav-link nav-link-active' : 'nav-link'}
            type="button"
            aria-pressed={filter === 'ALL'}
            onClick={() => chooseFilter('ALL')}
          >
            All movies
          </button>
          <button
            className={filter === 'WATCHLIST' ? 'nav-link nav-link-active' : 'nav-link'}
            type="button"
            aria-pressed={filter === 'WATCHLIST'}
            onClick={() => chooseFilter('WATCHLIST')}
          >
            Watchlist <span className="nav-count">{watchlistCount}</span>
          </button>
          <button
            className={filter === 'LIKED' ? 'nav-link nav-link-active' : 'nav-link'}
            type="button"
            aria-pressed={filter === 'LIKED'}
            onClick={() => chooseFilter('LIKED')}
          >
            Favorites <span className="nav-count">{likedCount}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;