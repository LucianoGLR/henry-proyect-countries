const { Activity, Country } = require('../db');

//? Controller para crear una nueva actividad
const createActivityDB = async (name, difficulty, duration, season, countryIds, imageUrl) => {
    // Crear la actividad
    console.log("Datos recibidos en el backend:", name, difficulty, duration, season, countryIds, imageUrl);
    const activity = await Activity.create({ name, difficulty, duration, season, imageUrl });

    // Si se proporcionan countryIds, asociar esos países con la actividad
    if(countryIds && countryIds.length) {
        // Encuentra todos los países que coincidan con los IDs proporcionados
        const countries = await Country.findAll({
            where: {
                id: countryIds
            }
        });

        // Si se encuentran países, asocia esos países con la actividad
        if(countries && countries.length) {
            await activity.setCountries(countries);
        }
    }

    return activity;
}

const getAllActivities = async (options) => {
    const activitiesDB = await Activity.findAll({
        ...options,
        include: [{
            model: Country,
            as: 'countries', // Asegúrate de que este alias coincida con cómo lo definiste en tus modelos
            attributes: ['name'], // Aquí especificas que solo quieres el nombre del país
            through: {
                // Esto es para excluir los atributos de la tabla de unión (si es que no los quieres)
                attributes: [],
            },
        }],
    });
    return activitiesDB;
}


module.exports = {createActivityDB, getAllActivities};