import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { searchCountries } from '../../redux/actions/actions';
import './navbar.styles.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    dispatch(searchCountries(searchTerm));
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleHomeClick = () => {
    // Al hacer clic en el botón "Home", limpiar el término de búsqueda
    setSearchTerm('');
    // Llamar a la función de búsqueda para mostrar todos los países nuevamente
    dispatch(searchCountries(''));
  };

  return (
    <div className='nav-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ display: location.pathname !== '/' ? 'inline-block' : 'none', marginRight: '10px' }}>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/home" onClick={handleHomeClick}>Home</Link>
          </li>
          {/* <li style={{ display: location.pathname !== '/activities' ? 'inline-block' : 'none', marginRight: '10px' }}>
            <Link to="/activities">Activities</Link>
          </li> */}
          <li style={{ display: location.pathname !== '/form' ? 'inline-block' : 'none', marginRight: '10px' }}>
            <Link to="/form">Form</Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar país..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='input'
        />
        <button className='btn' type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default Navbar;
