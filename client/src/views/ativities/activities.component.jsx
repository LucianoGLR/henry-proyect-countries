import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar.component';
import axios from 'axios';
import './activities.styles.css'

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3001/activities');
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log('Activities received:', activities);

  return (
    <div>
      <Navbar/>
      <h2>Activities List</h2>
      <div className="activity-card"> {/* Utilizando la clase activity-card como contenedor */}
        {activities.map(activity => (
          <div key={activity.id} className="card-container"> {/* Cada actividad como una tarjeta */}
            <h3>{activity.name}</h3>
            <img src={activity.imageUrl} alt="" />
            <p><strong>Duration:</strong> {activity.duration}</p>
            <p><strong>Difficulty:</strong> {activity.difficulty}</p>
            <p><strong>Countries:</strong> {activity.countries.map(country => country.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesList;
