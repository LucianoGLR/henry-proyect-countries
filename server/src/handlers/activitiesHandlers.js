const {createActivityDB, getAllActivities} = require('../controllers/activitiesControllers')
const { Country } = require('../db')

const createActivityHandler = async (req, res) => {
    const { name, difficulty, duration, season, country, imageUrl } = req.body;
    try {
        const newActivity = await createActivityDB( name, difficulty, duration, season, country, imageUrl );
        console.log("Actividad creada:", newActivity.dataValues);
        res.status(201).json(newActivity);
    } catch (error) {
        console.error('Error al crear la actividad:', error);
        res.status(500).json({ error: 'Error al crear la actividad' });
    }
}

const getActivitiesHandler = async (req, res) => {
    try {
        const activities = await getAllActivities({
            include: Country
        });
        if(activities.length === 0){
            return res.status(200).json({'message': 'No hay actividades creadas!' })
        }
        res.status(200).json(activities);
    } catch (error) {
        console.log('Error al obtener las actividades:', error);
        res.status(500).json({ error: 'Error al obtener las actividades' });
    }
}

module.exports = {
    createActivityHandler,
    getActivitiesHandler
};