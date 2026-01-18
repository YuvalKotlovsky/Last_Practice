import React from "react";
import "./MovieCard.css";
const MovieCard = ({ title, year, genre, ratings }) => {
  return (
    <div className="movieCard-container">
      <h2>{title}</h2>
      <span>{year}</span>
      <span>{genre}</span>
      <span>
        {ratings.map((rating) => {
          return (
            <>
              <span>{rating.Source}</span> <span>{rating.Value}</span>
            </>
          );
        })}
      </span>
    </div>
  );
};

export default MovieCard;
