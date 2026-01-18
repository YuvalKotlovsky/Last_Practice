import { useEffect, useMemo, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
//const apiKey = import.meta.env.VITE_API_KEY;
const ENDPOINT = "http://localhost:3001/api/movies";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchSource, setSearchSource] = useState("");
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(ENDPOINT);
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.log(`Error fetching movie`, error);
      }
    };
    fetchMovies();
  }, []);
  const isIncluding = (string, subString) => {
    return string.toLowerCase().includes(subString.toLowerCase());
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (!searchGenre && !searchSource && !searchTitle && !searchYear)
        return movies;
      const matchTitle = isIncluding(movie.Title, searchTitle);
      const matchYear = !searchYear || Number(movie.Year) <= Number(searchYear);
      const matchGenre = isIncluding(movie.Genre, searchGenre);
      const matchRating = movie.Ratings.some((rating) => {
        return isIncluding(rating.Source, searchSource);
      });
      return matchGenre && matchRating && matchTitle && matchYear;
    });
  }, [movies, searchYear, searchTitle, searchGenre, searchSource]);
  return (
    <div className="app-container">
      <header className="header-container">
        <h1>Movies List</h1>
        <div className="inputs-container">
          <input
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search Movie By Name"
          />
          <input
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            placeholder="Search Movie By Max Year"
          />
          <input
            value={searchGenre}
            onChange={(e) => setSearchGenre(e.target.value)}
            placeholder="Search Movie By Genre"
          />
          <input
            value={searchSource}
            onChange={(e) => setSearchSource(e.target.value)}
            placeholder="Search Movie By Source Rating"
          />
        </div>
      </header>
      <div className="movies-cards-container">
        {filteredMovies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              title={movie.Title}
              year={movie.Year}
              genre={movie.Genre}
              ratings={movie.Ratings}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
