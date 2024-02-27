const axios = require('axios');

async function fetchCountriesFromAPI() {
    try {
        const response = await axios.get('http://localhost:5000/countries');
        console.log('Datos de la API:');
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
        throw error;
    }
}

module.exports = { fetchCountriesFromAPI };