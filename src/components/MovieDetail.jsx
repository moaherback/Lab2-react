import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=sv-SE`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta film");
        return res.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Laddar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to="/">← Tillbaka</Link>
      <h1>{movie.title}</h1>
      <p>Släppt: {movie.release_date}</p>
      <p>{movie.overview}</p>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      )}
    </div>
  );
};

export default MovieDetail;
