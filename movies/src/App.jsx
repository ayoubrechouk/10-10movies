import { useState } from 'react';
import { MovieProvider } from './Components/movieContext.jsx';
import Home from './Components/Home.jsx';
import Navbar from './Components/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [filter, setFilter] = useState('ALL');

  return (
    <MovieProvider>
      <Navbar filter={filter} onFilterChange={setFilter} />
      <Routes>
        <Route path="/" element={<Home filter={filter} onFilterChange={setFilter} />} />
      </Routes>
    </MovieProvider>
  );
}

export default App;