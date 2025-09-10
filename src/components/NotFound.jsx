import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="center-alligned">
      <h1 >404</h1>
      <h2>Sidan kunde inte hittas</h2>
      <p>Tyvärr, sidan du söker finns inte eller har flyttats.</p>
      <Link to="/">
        <button className="link-btn">← Tillbaka till startsidan</button>
      </Link>
    </div>
  );
};

export default NotFound;
