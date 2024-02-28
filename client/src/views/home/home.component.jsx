import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar.component';
import Cards from '../../components/cards/cards.component';
import './home.styles.css';

function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(searchTerm);
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      console.log(error.response);
    }
  };

  const handleFilters = (filters) => {
    setSelectedFilters(filters);
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
    setCountries([]);
    // Limpiar los filtros al hacer clic en "Clear Filters"
    console.log("Selected filters after clearing:", selectedFilters);
  };

  return (
    <div>
      {/* <h1>🗺️ Welcome to my Countries App 🗺️</h1> */}
      <Navbar onSearch={handleSearch} />
      <Cards countries={countries} selectedFilters={selectedFilters} onFilterChange={handleFilters}  onClearFilters={handleClearFilters}
/>
    </div>
  );
}

export default Home;
