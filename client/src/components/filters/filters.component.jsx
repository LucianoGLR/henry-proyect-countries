import React, { useState } from 'react';
import axios from 'axios';
import ActivitiesList from '../activitiesList/activitiesList.component';
import './filters.styles.css';

const Filters = ({ onFilterChange, onClearFilters }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showContinentMenu, setShowContinentMenu] = useState(false);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [showCountries, setShowCountries] = useState(true); // Estado para controlar si se muestran los países

  const handleFilterSelection = (filterType) => {
    setSelectedFilter(filterType);
    onFilterChange(filterType);
  };

  const handleClearFilters = () => {
    setSelectedFilter('');
    onClearFilters();
    setShowCountries(true); // Restablecer el estado para mostrar países
    console.log("Clear filters clicked");
  };

  const handleContinentSelection = (continent) => {
    setSelectedFilter(continent);
    setShowContinentMenu(false);
    onFilterChange(continent);
  };

  const handleActivityFilter = async () => {
    try {
      console.log('Fetching activities...');
      const response = await axios.get('http://localhost:3001/activities');
      console.log('Activities response:', response.data);
  
      const activityCardInfo = response.data.map(activity => ({
        id: activity.id,
        name: activity.name,
        imageUrl: activity.imageUrl,
        duration: activity.duration,
        difficulty: activity.difficulty,
        countries: activity.countries.map(country => country.name).join(', ')
      }));
  
      // Si ya hay actividades filtradas, limpiarlas antes de cargar nuevas actividades
      if (filteredActivities.length > 0) {
        setFilteredActivities([]);
      } else {
        setFilteredActivities(activityCardInfo);
        onFilterChange('activities', activityCardInfo);
      }
      
      // Invertir el estado de showCountries al cargar o limpiar las actividades
      setShowCountries(!showCountries);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  return (
    <div className="filters-container">

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


      <button 
        className="filter-button"
        onClick={handleActivityFilter}
      >
        Tourism Activity
      </button>

      {filteredActivities.length > 0 && (
      <ActivitiesList activityCards={filteredActivities} showCountries={showCountries} />
      )}

    </div>
  );
};

export default Filters;
