import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, fetchActivities, clearActivities } from '../../redux/actions/actions';
import ActivitiesList from '../activitiesList/activitiesList.component';
import Card from '../card/card.component';
import './cards.styles.css';

const Cards = ({ selectedFilters, onFilterChange, onClearFilters }) => {
  const dispatch = useDispatch();
  const allCountries = useSelector(state => state.countries.filteredCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const [hideCountries, setHideCountries] = useState(false)
  const [countriesPerPage] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showContinentMenu, setShowContinentMenu] = useState(false);
  const [showSeasonMenu, setShowSeasonMenu] = useState(false);
  const filteredActivities = useSelector(state => state.activities.activities); // Obtener las actividades filtradas del estado global

  const handleFilterSelection = (filterType) => {
    setSelectedFilter(filterType);
    onFilterChange(filterType);
  };

  const handleClearFilters = () => {
    setSelectedFilter('');
    onClearFilters();
    dispatch(clearActivities());
    setHideCountries(false)
  };

  const handleContinentSelection = (continent) => {
    setSelectedFilter(continent);
    setShowContinentMenu(false);
    onFilterChange(continent);
  };

  const handleSeasonSelection = async (season) => {
    setSelectedFilter(season);
    setShowSeasonMenu(false);
    setHideCountries(true)
    await dispatch(fetchActivities(season));
  };

  // const handleClearSeasonFilter = () => {
  //   console.log('Clearing activities filter...'); 
  //   setSelectedFilter(''); // Limpiar el filtro de temporada
  //   dispatch(clearActivities());
  //   setHideCountries(false)
  // };

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
      if (!Array.isArray(selectedFilters)) {
        console.error('selectedFilters debe ser un arreglo');
        return filteredCountries;
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

    const filteredCountries = applyFilters(allCountries, selectedFilters);

    useEffect(() => {
      const filteredCountries = applyFilters(allCountries, selectedFilters);
      const totalPagesFiltered = Math.ceil(filteredCountries.length / countriesPerPage);
      if (currentPage > totalPagesFiltered) {
        setCurrentPage(1); // Corrección: establecer currentPage a 1 para mostrar la primera página
      }
    }, [selectedFilters, currentPage, countriesPerPage, allCountries]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCountries.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  if (totalPages !== pageNumbers.length) {
    setPageNumbers(Array.from({ length: totalPages }, (_, index) => index + 1));
  }
  const validCurrentPage = Math.min(currentPage, totalPages);
  const indexOfLastCountry = validCurrentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div>
      <nav className='hola'>
        <button
          className={`filter-button ${selectedFilter === 'clear' ? 'active' : ''}`}
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>

        <button
          className={`filter-button ${selectedFilter === 'a-z' ? 'active' : ''}`}
          onClick={() => handleFilterSelection('a-z')}
        >
          a-z
        </button>


        <button
          className={`filter-button ${selectedFilter === 'z-a' ? 'active' : ''}`}
          onClick={() => handleFilterSelection('z-a')}
        >
          z-a
        </button>

        <button
          className={`filter-button ${selectedFilter === 'population' ? 'active' : ''}`}
          onClick={() => handleFilterSelection('population')}
        >
          Population
        </button>

        <div className="dropdown">
          <button
            className={`filter-button ${selectedFilter === 'continent' ? 'active' : ''}`}
            onClick={() => setShowContinentMenu(!showContinentMenu)}
          >
            Filter by Continent
          </button>
          {showContinentMenu && (
            <div className="dropdown-content">
              <button
                className={`filter-button ${selectedFilter === 'America' ? 'active' : ''}`}
                onClick={() => handleContinentSelection('America')}
              >
                America
              </button>
              <button
                className={`filter-button ${selectedFilter === 'Africa' ? 'active' : ''}`}
                onClick={() => handleContinentSelection('Africa')}
              >
                Africa
              </button>
              <button
                className={`filter-button ${selectedFilter === 'Europe' ? 'active' : ''}`}
                onClick={() => handleContinentSelection('Europe')}
              >
                Europe
              </button>
              <button
                className={`filter-button ${selectedFilter === 'Asia' ? 'active' : ''}`}
                onClick={() => handleContinentSelection('Asia')}
              >
                Asia
              </button>
              <button
                className={`filter-button ${selectedFilter === 'Antarctica' ? 'active' : ''}`}
                onClick={() => handleContinentSelection('Antarctica')}
              >
                Antarctica
              </button>
              <button
                className={`filter-button ${selectedFilter === 'Oceania' ? 'active' : ''}`}
                onClick={() => handleContinentSelection('Oceania')}
              >
                Oceania
              </button>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button
            className={`filter-button ${selectedFilter === 'season' ? 'active' : ''}`}
            onClick={() => setShowSeasonMenu(!showSeasonMenu) }
          >
            Filter by Season
          </button>
          {showSeasonMenu && (
            <div className="dropdown-content">
              <button
                className={`filter-button ${selectedFilter === 'summer' ? 'active' : ''}`}
                onClick={() => handleSeasonSelection('summer')}
              >
                Summer
              </button>
              <button
                className={`filter-button ${selectedFilter === 'autumn' ? 'active' : ''}`}
                onClick={() => handleSeasonSelection('autumn')}
              >
                Autumn
              </button>
              <button
                className={`filter-button ${selectedFilter === 'winter' ? 'active' : ''}`}
                onClick={() => handleSeasonSelection('winter')}
              >
                Winter
              </button>
              <button
                className={`filter-button ${selectedFilter === 'spring' ? 'active' : ''}`}
                onClick={() => handleSeasonSelection('spring')}
              >
                Spring
              </button>
            </div>
          )}
        </div>
      </nav>

      <div>
        {filteredActivities.length > 0 && ( <ActivitiesList activityCards={filteredActivities} />)}
      </div>

      <div className='cards-container'>
        { !hideCountries && currentCountries.map(country => ( <Card key={country.id} country={country} /> ))}
      </div>

      <div className="pagination">
  {!hideCountries && (
    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
      Anterior
    </button>
  )}
  {!hideCountries && pageNumbers.map(number => (
    <button
      key={number}
      onClick={() => paginate(number)}
      className={currentPage === number ? 'active' : ''}
    >
      {number}
    </button>
  ))}
  {!hideCountries && (
    <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastCountry >= filteredCountries.length}>
      Siguiente
    </button>
  )}
</div>

    </div>
  );
};

export default Cards;
