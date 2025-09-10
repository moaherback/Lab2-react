import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/top_rated?language=sv-SE&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("Något gick fel med fetch");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Kunde inte hämta filmer");
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1 className="center-alligned">Populära Filmer</h1>
      <Link to="/favorites">
        <button className="link-btn">Gå till favoriter</button>
      </Link>
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
    </div>
  );
};

export default MovieList;
