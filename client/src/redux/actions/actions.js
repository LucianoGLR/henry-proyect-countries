import axios from 'axios';

export const GET_COUNTRIES = "GET_COUNTRIES";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";

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
