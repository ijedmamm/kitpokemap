import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

function MapView({ pokemons = [] }) {
  // Center on Kanchanaburi, Thailand
  const kanchanburiCenter = [14.0227, 99.5328]

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={kanchanburiCenter} 
        zoom={10} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pokemons.map((pokemon) => (
          <Marker 
            key={pokemon.id} 
            position={[pokemon.latitude, pokemon.longitude]}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg">{pokemon.pokemon_name}</h3>
                <p className="text-sm text-gray-600">
                  Spawn Time: {new Date(pokemon.spawn_time).toLocaleString('th-TH')}
                </p>
                {pokemon.expires_at && (
                  <p className="text-sm text-red-600">
                    Expires: {new Date(pokemon.expires_at).toLocaleString('th-TH')}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView

