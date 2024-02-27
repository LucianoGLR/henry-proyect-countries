import { combineReducers } from 'redux';
import { GET_COUNTRIES, SEARCH_COUNTRIES, GET_COUNTRY_DETAIL } from '../actions/actions';

let initialState = {
  allCountries: [],
  filteredCountries: [],
  countryDetail: null
};

function countriesReducer(state = initialState, action) {
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

export default combineReducers({
  countries: countriesReducer
});
