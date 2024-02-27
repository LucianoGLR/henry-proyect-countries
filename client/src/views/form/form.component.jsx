//Dependecias
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar.component';

//Importaciones

//Estilos
import './form.styles.css'

function Form() {

  const [formData, setFormData] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    country: [],
  });

  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        setCountries(response.data);
      } catch (error) {
        console.log('Ocurrio un error!', error);
      }
    }
    fetchCountries()
  }, [])


  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === 'country') {
      const selectedCountries = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({
        ...formData,
        country: selectedCountries,
      });
         console.log(formData.country);
    } 
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  
  const handleImageChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === '' ? null : value,
    });
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Por favor, ingresa un nombre.');
      return;
    }    if (isNaN(formData.difficulty) || formData.difficulty < 1 || formData.difficulty > 5) {
      alert('La dificultad debe ser un número entre 1 y 5.');
      return;
    }    if (isNaN(formData.duration) || formData.duration < 1 || formData.duration > 10) {
      alert('La duracion debe ser un número entre 1 y 10.');
      return;
    }
    if (!formData.season) {
      alert('Por favor, selecciona una temporada.');
      return;
    }    


    try {

      const formDataWithImage = {
        ...formData,
        imageUrl: formData.image, // Agrega la URL de la imagen al objeto formData
      };

      const response = await axios.post('http://localhost:3001/activities', formDataWithImage);

      if (response.status === 201) {
        alert('Actividad creada correctamente');
      } else {
        alert('Hubo un error al crear la actividad');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al crear la actividad');
    }
  };



  return (
<div className='form-container'>
    <Navbar />
  <div className='form-wrapper'>

    <h2>Crea tu nueva aventura</h2>

    <form onSubmit={handleSubmit}>
      
      <label htmlFor="name">
        Nombre:
      </label>
      
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}  />
      
      <br />

      <label htmlFor="image">Imagen:</label>

      <input type="url" id="image" name="image" accept="image" onChange={handleImageChange} />

      <br />
      
      <label htmlFor="difficulty">
        Dificultad:
      </label>

      <input type="number" id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}  />
      
      <br />
      
      <label htmlFor="duration">
        Duración (opcional):
      </label>
      
      <input type="number" id="duration" name="duration" value={formData.duration || ''} onChange={handleChange} />
      
      <br />

      <label htmlFor="season">
        Temporada:
      </label>

      <select name="season" id="season" value={formData.season} onChange={handleChange}  >
        <option value="">Seleccione la temporada</option>
        <option value="Summer">Summer</option>
        <option value="Autumn">Autumn</option>
        <option value="Winter">Winter</option>
        <option value="Spring">Spring</option>
      </select>

      <br />

      <label htmlFor="country">
        País:
      </label>

      <select multiple id="country" name="country" onChange={handleChange} className="country-select" >
        
        <option value="">
          Seleccione un país
        </option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>{country.name}</option>
        ))}

      </select>
      
      <br />

      <button type="submit">Crear Actividad</button>

    </form>
  </div>
</div>

  );
}

export default Form;
