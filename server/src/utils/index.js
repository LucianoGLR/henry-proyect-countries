
// const {Country} = require('../db');
require("dotenv").config();

function cleanInfoAPI(data) {
    if (Array.isArray(data)) {
        return data.map(country => {
            if (country.name) {
                // console.log('Country:', country); // Agrega este console.log para depurar
                return {
                    id: country.cca3,
                    name: country.name.common,
                    flag: country.flags.png,
                    continent: country.continents[0],
                    capital: country.capital ? country.capital[0] : null,
                    subregion: country.subregion,
                    area: country.area,
                    population: country.population
                };
            } else {
                return null;
            }
        }).filter(country => country !== null);
    } else {
        console.log('Los datos de la API no son un array:', data);
        return [];
    }
}



module.exports = {
    cleanInfoAPI,
};
