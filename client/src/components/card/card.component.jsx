import React from 'react';
import { Link } from 'react-router-dom';
import './card.styles.css'

const Card = ({ country }) => {
  return (
    <div className="card-container">
      <Link to={`/home/${country.id}`} className='Link'>
        <img src={country.flag} alt={country.name} />
        <h2>{country.name}</h2>
        <h2>{country.continent}</h2>
      </Link>
    </div>
  );
};

export default Card;
