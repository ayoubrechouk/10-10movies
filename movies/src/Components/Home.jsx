import { useContext } from 'react';
import { movieContext } from './movieContext';

const Home = ({ filter, onFilterChange }) => {
    const { movies, dispatch } = useContext(movieContext);

    const displayedMovies = movies.filter(movie => {
        if (filter === 'WATCHLIST') return movie.inWatchlist;
        if (filter === 'LIKED') return movie.liked;
        return true;
    });

    return (
        <main className="page-content">
            <section className="hero-panel">
                <p className="eyebrow">Your personal cinema</p>
                <h1>Find your next <span>favorite</span> film.</h1>
                <p className="hero-copy">A hand-picked collection of unforgettable movies. Save the ones you love and keep your watchlist close.</p>
                <div className="filter-bar" aria-label="Filter movies">
                    <button
                        className={filter === 'ALL' ? 'filter-button filter-button-active' : 'filter-button'}
                        type="button"
                        aria-pressed={filter === 'ALL'}
                        onClick={() => onFilterChange('ALL')}
                    >
                        All movies <span>{movies.length}</span>
                    </button>
                    <button
                        className={filter === 'WATCHLIST' ? 'filter-button filter-button-active' : 'filter-button'}
                        type="button"
                        aria-pressed={filter === 'WATCHLIST'}
                        onClick={() => onFilterChange('WATCHLIST')}
                    >
                        Watchlist <span>{movies.filter(movie => movie.inWatchlist).length}</span>
                    </button>
                    <button
                        className={filter === 'LIKED' ? 'filter-button filter-button-active' : 'filter-button'}
                        type="button"
                        aria-pressed={filter === 'LIKED'}
                        onClick={() => onFilterChange('LIKED')}
                    >
                        Favorites <span>{movies.filter(movie => movie.liked).length}</span>
                    </button>
                </div>
            </section>

            <section className="catalog" aria-live="polite">
                <div className="catalog-heading">
                    <div>
                        <p className="eyebrow">The collection</p>
                        <h2>{filter === 'WATCHLIST' ? 'Your watchlist' : filter === 'LIKED' ? 'Your favorites' : 'Popular picks'}</h2>
                    </div>
                    <p className="result-count">{displayedMovies.length} {displayedMovies.length === 1 ? 'film' : 'films'}</p>
                </div>
                {displayedMovies.length > 0 ? (
                    <div className="movie-grid">
                    {displayedMovies.map(movie => (
                        <article key={movie.id} className="movie-card">
                            <div className="poster-frame">
                                <div
                                    className="poster-fallback"
                                    role={movie.poster ? undefined : 'img'}
                                    aria-label={movie.poster ? undefined : `${movie.title} poster artwork`}
                                    aria-hidden={movie.poster ? true : undefined}
                                    style={{ '--poster-hue': `${(movie.id * 47) % 360}deg` }}
                                >
                                    <span className="poster-fallback-kicker">A film by</span>
                                    <span className="poster-fallback-director">{movie.directedBy}</span>
                                    <strong>{movie.title}</strong>
                                    <span className="poster-fallback-rule" />
                                    <span className="poster-fallback-genre">{movie.genre}</span>
                                </div>
                                {movie.poster && (
                                    <img
                                        className="movie-poster"
                                        src={movie.poster}
                                        alt={`${movie.title} poster`}
                                        loading="lazy"
                                        onError={(event) => { event.currentTarget.hidden = true; }}
                                    />
                                )}
                                <span className="poster-year">{movie.year}</span>
                            </div>
                            <div className="movie-card-body">
                                <p className="movie-genre">{movie.genre}</p>
                                <h3>{movie.title}</h3>
                                <p className="movie-director">Directed by <span>{movie.directedBy}</span></p>
                                <div className="movie-actions">
                                    <button
                                        className={`action-button watchlist-button${movie.inWatchlist ? ' action-selected' : ''}`}
                                        type="button"
                                        aria-pressed={movie.inWatchlist}
                                        onClick={() => dispatch({ type: 'togWhachlist', payload: movie.id })}
                                    >
                                        {movie.inWatchlist ? 'In watchlist' : 'Add to watchlist'}
                                    </button>
                                    <button
                                        className={`action-button favorite-button${movie.liked ? ' action-selected' : ''}`}
                                        type="button"
                                        aria-label={`${movie.liked ? 'Remove' : 'Add'} ${movie.title} ${movie.liked ? 'from' : 'to'} favorites`}
                                        aria-pressed={movie.liked}
                                        onClick={() => dispatch({ type: 'togLiked', payload: movie.id })}
                                    >
                                        <span aria-hidden="true">{movie.liked ? '♥' : '♡'}</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span aria-hidden="true">{filter === 'WATCHLIST' ? '◷' : '♡'}</span>
                        <h3>{filter === 'WATCHLIST' ? 'Your watchlist is empty' : 'No favorites yet'}</h3>
                        <p>Save a movie from the collection and it will show up here.</p>
                        <button className="empty-state-button" type="button" onClick={() => onFilterChange('ALL')}>
                            Browse all movies
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;