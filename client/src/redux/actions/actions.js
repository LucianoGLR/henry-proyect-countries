import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const CLEAR_ACTIVITIES = 'CLEAR_ACTIVITIES';


export function getCountries() {
  return async function(dispatch) {
    try {
      const response = await axios.get('http://localhost:3001/countries');
      dispatch({
        type: GET_COUNTRIES,
        payload: response.data
      });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
}

export function searchCountries(name) {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/countries?name=${name}`);
      dispatch({
        type: SEARCH_COUNTRIES,
        payload: response.data
      });
    } catch (error) {
      console.error('Error searching countries:', error);
    }
  };
}

export function getCountryDetail(id) {
  return async function(dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({
        type: GET_COUNTRY_DETAIL,
        payload: response.data
      });
    } catch (error) {
      console.error('Error fetching country detail:', error);
    }
  };
}

export const fetchActivities = (selectedSeason) => {
  return async (dispatch) => {
    try {
      console.log('Fetching activities...');
      const response = await axios.get('http://localhost:3001/activities');
      console.log('Activities response:', response.data);

      let activityCardInfo = response.data.map(activity => ({
        id: activity.id,
        name: activity.name,
        imageUrl: activity.imageUrl,
        duration: activity.duration,
        difficulty: activity.difficulty,
        season: activity.season,
        countries: activity.countries.map(country => country.name).join(', ')
      }));

      // Filtrar por temporada si se ha seleccionado una
      if (selectedSeason && ["summer", "autumn", "winter", "spring"].includes(selectedSeason.toLowerCase())) {
        activityCardInfo = activityCardInfo.filter(activity => activity.season.toLowerCase() === selectedSeason.toLowerCase());
      }

      // Despachar la acción con las nuevas actividades filtradas
      dispatch({
        type: GET_ACTIVITIES,
        payload: activityCardInfo
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };
};

export function clearActivities() {
  return {
    type: CLEAR_ACTIVITIES
  };
}

// export const filterActivitiesBySeason = (season) => {
//   return {
//     type: 'FILTER_ACTIVITIES_BY_SEASON',
//     payload: season
//   };
// };