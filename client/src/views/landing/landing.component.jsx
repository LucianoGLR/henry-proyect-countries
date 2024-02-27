// Dependecias
import { Link } from 'react-router-dom'

// Importaciones

//Estilos

function Landing() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>🗺️ Welcome to my Countries App 🗺️</h1>
        <br />
        <br />
        <br />
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', fontSize: '1em', borderRadius: '5px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>¡Let's get started!</button>
        </Link>
      </div>
    </div>
  );
}
  
  export default Landing
  