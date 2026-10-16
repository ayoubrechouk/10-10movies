import { useReducer, createContext } from 'react';
import matrixPoster from '../assets/matrix.webp';
import pulpFictionPoster from '../assets/pup.webp';
import reservoirDogsPoster from '../assets/res.webp';
import ingloriousBasterdsPoster from '../assets/inglo.webp';
import deathProofPoster from '../assets/pro.webp';
import deadPoetsSocietyPoster from '../assets/dead.webp';

export const movieContext = createContext();

const initialMovies = [
    { id: 1, title: "The Matrix", year: 1999, genre: "Sci-Fi / Action", directedBy: "Lana Wachowski, Lilly Wachowski", poster: matrixPoster, liked: false, inWatchlist: false },
    { id: 2, title: "Pulp Fiction", year: 1994, genre: "Crime / Drama", directedBy: "Quentin Tarantino", poster: pulpFictionPoster, liked: false, inWatchlist: false },
    { id: 3, title: "Fight Club", year: 1999, genre: "Drama", directedBy: "David Fincher", poster: null, liked: false, inWatchlist: false },
    { id: 4, title: "Reservoir Dogs", year: 1992, genre: "Crime / Thriller", directedBy: "Quentin Tarantino", poster: reservoirDogsPoster, liked: false, inWatchlist: false },
    { id: 5, title: "Full Metal Jacket", year: 1987, genre: "War / Drama", directedBy: "Stanley Kubrick", poster: null, liked: false, inWatchlist: false },
    { id: 6, title: "Inglourious Basterds", year: 2009, genre: "War / Action", directedBy: "Quentin Tarantino", poster: ingloriousBasterdsPoster, liked: false, inWatchlist: false },
    { id: 7, title: "The Game", year: 1997, genre: "Mystery / Thriller", directedBy: "David Fincher", poster: null, liked: false, inWatchlist: false },
    { id: 8, title: "2001: A Space Odyssey", year: 1968, genre: "Sci-Fi / Adventure", directedBy: "Stanley Kubrick", poster: null, liked: false, inWatchlist: false },
    { id: 9, title: "Dr. Strangelove", year: 1964, genre: "Comedy / War", directedBy: "Stanley Kubrick", poster: null, liked: false, inWatchlist: false },
    { id: 10, title: "Death Proof", year: 2007, genre: "Action / Thriller", directedBy: "Quentin Tarantino", poster: deathProofPoster, liked: false, inWatchlist: false },
    { id: 11, title: "Memento", year: 2000, genre: "Mystery / Thriller", directedBy: "Christopher Nolan", poster: null, liked: false, inWatchlist: false },
    { id: 12, title: "Se7en", year: 1995, genre: "Crime / Mystery", directedBy: "David Fincher", poster: null, liked: false, inWatchlist: false },
    { id: 13, title: "A Clockwork Orange", year: 1971, genre: "Crime / Sci-Fi", directedBy: "Stanley Kubrick", poster: null, liked: false, inWatchlist: false },
    { id: 14, title: "Cinema Paradiso", year: 1988, genre: "Drama / Romance", directedBy: "Giuseppe Tornatore", poster: null, liked: false, inWatchlist: false },
    { id: 15, title: "Dead Poets Society", year: 1989, genre: "Drama", directedBy: "Peter Weir", poster: deadPoetsSocietyPoster, liked: false, inWatchlist: false }
];

const gestionreducer = (state, action) => {
    switch (action.type) {
        case "togWhachlist":
            return state.map(movie =>
                movie.id === action.payload ? { ...movie, inWatchlist: !movie.inWatchlist } : movie
            );
        case "togLiked":
            return state.map(movie =>
                movie.id === action.payload ? { ...movie, liked: !movie.liked } : movie
            );
        default:
            return state;
    }
};

export const MovieProvider = ({ children }) => {
    const [movies, dispatch] = useReducer(gestionreducer, initialMovies);

    return (
        <movieContext.Provider value={{ movies, dispatch }}>
            {children}
        </movieContext.Provider>
    );
};