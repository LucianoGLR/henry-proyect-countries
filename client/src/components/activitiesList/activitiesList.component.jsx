const ActivitiesList = ({ activityCards }) => {
    return (
      <div>
        <div className="activity-card">
          {activityCards.map(activityCard => (
            <div key={activityCard.id} className="card-container">
              <h3>{activityCard.name}</h3>
              <img src={activityCard.imageUrl} alt="" />
              <p><strong>Duration:</strong> {activityCard.duration}</p>
              <p><strong>Difficulty:</strong> {activityCard.difficulty}</p>
              <p><strong>Countries:</strong> {activityCard.countries}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ActivitiesList;