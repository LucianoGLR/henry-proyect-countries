import "../activitiesList/activitiesList.styles.css";

const ActivitiesList = ({ activityCards }) => {
  return (
    <div className="cards-box">
      {activityCards.map(activityCard => (
        <div key={activityCard.id} className="card-container">
          <h3>{activityCard.name}</h3>
          <img src={activityCard.imageUrl} alt={activityCard.name} />
          <p><strong>Duration:</strong> {activityCard.duration}</p>
          <p><strong>Difficulty:</strong> {activityCard.difficulty}</p>
          <p><strong>Countries:</strong> {activityCard.countries}</p>
          <p><strong>Season:</strong> {activityCard.season}</p>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesList