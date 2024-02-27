const { Country, Sequelize } = require('../db');
const axios = require('axios');
const { cleanInfoAPI } = require('../utils/index');
require("dotenv").config();
const { URL_API } = process.env;
const { Op } = require('sequelize');

// const { Sequelize } = require('sequelize');


const saveCountriesInDB = async () => {
    try {
        // Obtener los datos de la API
        const infoAPI = await axios.get(URL_API);
        const infoFiltrada = cleanInfoAPI(infoAPI.data)

        // Iterar sobre los datos y guardar cada elemento en la base de datos
        for (const item of infoFiltrada) {

            const capital = item.capital || 'Unknown';

            const subregion = item.subregion || 'Unknown';

            await Country.create({
                id: item.id,
                name: item.name,
                flag: item.flag,
                continent: item.continent,
                capital: capital,
                subregion: subregion,
                area: item.area,
                population: item.population,
            });
        }
        console.log('Los datos se han guardado correctamente en la base de datos.');
    } catch (error) {
        console.error('Error al guardar los datos en la base de datos:', error);
    }
}


const getCountriesByName = async (name) => {
    try {
        const countryFiltered = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        
        return countryFiltered;
    } catch (error) {
        console.error('Error fetching or processing country data:', error);
        throw error;
    }
};

const getAllCountries = async () => {

    // saveCountriesInDB()
    try {
        const allCountries = await Country.findAll();
        return allCountries;
    } catch (error) {
        console.error('Error fetching all countries:', error);
        throw error;
    }
};

const getCountryDetail = async (id) => {
    try {
        const countryDetail = await Country.findByPk(id);
        return countryDetail;
    } catch (error) {
        console.error('Error fetching country detail:', error);
        throw error;
    }
}

module.exports = {
    getCountriesByName,
    getAllCountries,
    getCountryDetail,
    saveCountriesInDB
};
