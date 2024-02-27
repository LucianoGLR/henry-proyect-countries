import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetail } from '../../redux/actions/actions';
import Navbar from '../../components/navbar/navbar.component';
import './detail.styles.css'

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector(state => state.countries.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(id));
  }, [dispatch, id]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div  className="detail-container">
      <Navbar />
      <div  className="card">
        <p>{country.id}</p>
        <p>{country.name}</p>
        <img src={country.flag} alt={country.name} />
        <p>Continente: {country.continent}</p>
        <p>Capital: {country.capital}</p>
        {country.subregion && <p>Subregion: {country.subregion}</p>}
        {country.area && <p>Area: {country.area}</p>}
        <p>Poblacion: {country.population}</p>
      </div>
    </div>
  );
}

export default Detail;
