import { combineReducers } from 'redux';
import { GET_COUNTRIES, SEARCH_COUNTRIES, GET_COUNTRY_DETAIL, GET_ACTIVITIES, CLEAR_ACTIVITIES } from '../actions/actions';

let initialState = {
  allCountries: [],
  filteredCountries: [],
  activities: [],
  countryDetail: null
};

export function countriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        filteredCountries: action.payload
      };
    case SEARCH_COUNTRIES:
      return {
        ...state,
        filteredCountries: action.payload
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: action.payload
      };
    default:
      return state;
  }
}

export function activitiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload, // Cambiado de 'activities' a 'filteredActivities'
        error: null
      };
      case CLEAR_ACTIVITIES:
        return {
          ...state,
          activities: [],
          error: null
        };
    default:
      return state;
  }
}


export default combineReducers({
  countries: countriesReducer,
  activities: activitiesReducer
});
