import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../redux/actions/actions';
import Card from '../card/card.component';
import './cards.styles.css';

const Cards = ({ selectedFilters }) => {
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries.filteredCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  selectedFilters = Array.isArray(selectedFilters) ? selectedFilters : [selectedFilters];

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const normalizeContinentName = (continentName) => {
    const prefixes = ["North", "South", "Eastern", "Western", "Central"];
    let normalized = continentName;

    prefixes.forEach(prefix => {
      if (normalized.includes(prefix)) {
        normalized = normalized.replace(prefix, "").trim();
      }
    });

    return normalized;
  };

  const applyFilters = (countries, selectedFilters) => {
    let filteredCountries = [...countries];
    // Asegurarse de que selectedFilters es un arreglo antes de continuar
    if (!Array.isArray(selectedFilters)) {
      console.error('selectedFilters debe ser un arreglo');
      return filteredCountries; // Devolver los países sin filtrar si selectedFilters no es un arreglo
    }
    if (selectedFilters.includes('clear') || selectedFilters.length === 0) {
      return filteredCountries;
    }
    if (selectedFilters.includes('a-z')) {
      filteredCountries.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (selectedFilters.includes('z-a')) {
      filteredCountries.sort((a, b) => (a.name > b.name ? -1 : 1));
    }
    if (selectedFilters.includes('population')) {
      filteredCountries.sort((a, b) => a.population - b.population);
    }
      // Filtrado por continente con normalización
  const continentFilters = ["North America", "South America", "Africa", "Europe", "Asia", "Antarctica", "Oceania"];
    selectedFilters.forEach(filter => {
      if (filter === "America") {
        filteredCountries = filteredCountries.filter(country =>
        ["North America", "South America"].includes(country.continent)
        );
      } else if (continentFilters.includes(filter)) {
         filteredCountries = filteredCountries.filter(country =>
         normalizeContinentName(country.continent) === normalizeContinentName(filter)
      );
    }
  });
    
    return filteredCountries;
  };

  // Aplicar filtros a todos los países
  const filteredCountries = applyFilters(allCountries, selectedFilters);

  // Calcular el índice del último país en la página actual
  const indexOfLastCountry = currentPage * countriesPerPage;
  // Calcular el índice del primer país en la página actual
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  // Obtener los países de la página actual después de aplicar filtros
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='cards-container'>
        {currentCountries.map(country => (
          <Card key={country.id} country={country} />
        ))}
      </div>
      {/* Controles de paginación */}
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastCountry >= filteredCountries.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Cards;
