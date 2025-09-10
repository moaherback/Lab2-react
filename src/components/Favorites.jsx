import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    if (favorites.length === 0) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    Promise.all(
      favorites.map((id) =>
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=sv-SE`,
          options
        ).then((res) => res.json())
      )
    ).then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, [favorites]);

  if (loading) return <p>Laddar...</p>;
  if (movies.length === 0)
    return (
      <div>
        <p>Inga favoriter ännu.</p>
        <Link to="/">← Tillbaka till listan</Link>
      </div>
    );

  return (
    <div>
      <h1>Favoriter</h1>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-listing">
            <button
              onClick={() => toggleFavorite(movie.id)}
              className={`favorite-btn ${
                favorites.includes(movie.id) ? "active" : ""
              }`}
            >
              ★
            </button>
            <Link to={`/movie/${movie.id}`}>
              {movie.title} ({movie.release_date})
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/">← Tillbaka till listan</Link>
    </div>
  );
};

export default Favorites;
