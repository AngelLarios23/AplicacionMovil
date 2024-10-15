import './App.js';
import 'leaflet/dist/leaflet.css'; // Importar los estilos de Leaflet
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import L from 'leaflet'; // Importar Leaflet para el icono del marcador
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faBook,faGraduationCap,  faComments, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [position, setPosition] = useState([21.8853, -102.2910]); // Posición inicial
  const [error, setError] = useState(null);
  <MapContainer 
          center={position} 
          zoom={13} 
          scrollWheelZoom={true} // Permitir desplazamiento con la rueda del ratón y táctil
        ></MapContainer>

  // Lista de lugares peligrosos
  const dangerousPlaces = [
    { position: [21.8853, -102.2910], name: "Colonia Centro", description: "Reportes de robos y asaltos frecuentes en zonas poco iluminadas." },
    { position: [21.8798, -102.3005], name: "Barrio de la Estación", description: "Áreas con alta actividad delictiva durante la noche." },
    { position: [21.9105, -102.2796], name: "Colonia Morelos", description: "Vandalismo y pandillas en las cercanías." },
    { position: [21.8587, -102.2950], name: "Colonia Insurgentes", description: "Robos a mano armada reportados recientemente." }
  ];

  // Lista de lugares seguros
  const safePlaces = [
    { position: [21.8910, -102.2920], name: "Parque Juárez", description: "Área familiar con seguridad." },
    { position: [21.8800, -102.2800], name: "Plaza Patria", description: "Zona comercial con vigilancia." },
    { position: [21.9000, -102.2700], name: "Catedral de Aguascalientes", description: "Zona turística con seguridad." },
    { position: [21.8700, -102.3100], name: "Centro Deportivo", description: "Instalaciones deportivas con seguridad." }
  ];

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          setError(error.message);
        }
      );
    }
  }, []);

  return (
    <div className="container">
      <div>{/* MAPA */}
      <header>
        <h1>SheCurity</h1>
      </header>

      <main style={{ position: 'relative' }}>
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          
          <Marker position={position} icon={new L.Icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}>
            <Popup>
              <strong>Ubicación Actual</strong>
            </Popup>
          </Marker>

          {/* Círculos de lugares peligrosos */}
          {dangerousPlaces.map((place, index) => (
            <Circle 
              key={index} 
              center={place.position} 
              radius={200} // Ajusta el radio según necesites
              color="red" // Color del borde en rojo
              fillColor="red" // Color de relleno en rojo
              fillOpacity={0.1} // Aumentar opacidad del relleno
            >
              <Popup>
                <strong>{place.name}</strong><br />
                {place.description}
              </Popup>
            </Circle>
          ))}

          {/* Círculos de lugares seguros */}
          {safePlaces.map((place, index) => (
            <Circle 
              key={index} 
              center={place.position} 
              radius={200} // Ajusta el radio según necesites
              color="green" // Color del borde en verde
              fillColor="green" // Color de relleno en verde
              fillOpacity={0.1} // Aumentar opacidad del relleno
            >
              <Popup>
                <strong>{place.name}</strong><br />
                {place.description}
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </main>
      </div>
      <div className='body'> {/* Botones */}
        <section className='buttons'>

        <a href="#">
            <FontAwesomeIcon icon={faHouse} />
        </a>
{/* Colocar los links de las paginas que se vayan a utilizar */}
        <a href="#">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </a>

        <a href="#">
        <FontAwesomeIcon icon={faGraduationCap } />
        </a>

        <a href="#">
        <FontAwesomeIcon icon={faComments} />
        </a>

        <a href="#">
        <FontAwesomeIcon icon={faUsers} />
        </a>

      </section>
      </div>
    </div>
  );
}

export default App;
