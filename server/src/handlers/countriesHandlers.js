const { Country } = require('../db');
const { getCountriesByName, getAllCountries, getCountryDetail } = require('../controllers/countriesControllers')


const getCountries = async (req, res) => {

    const { name } = req.query;

    try {
        if(name){
            const countryByName = await getCountriesByName(name);
            res.status(200).json(countryByName);
        } else {
            const response = await getAllCountries();
            res.status(200).json(response);
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

const getDetail = async (req, res) => {
    let { id } = req.params;
    id = id.toUpperCase();

    try {
        const countryDetail = await getCountryDetail(id);
        if (countryDetail) {
            res.status(200).json(countryDetail);
        } else {
            res.status(404).send(`No se encontró ningún país con el ID: ${id}`);
        }
    } catch (error) {
        console.error('Error al obtener el detalle del país desde la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getCountries,
    getDetail
}
