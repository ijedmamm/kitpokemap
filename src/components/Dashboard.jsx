import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import MapView from './MapView'
import pikachu from '../assets/pikachu.png'
import '../App.css'

function Dashboard({ onNavigateToAdmin, backendApiUrl }) {
  const [language, setLanguage] = useState('th')
  const [pokemons, setPokemons] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPokemon, setNewPokemon] = useState({
    pokemon_name: '',
    latitude: '',
    longitude: '',
  })

  const content = {
    th: {
      title: 'แผนที่โปเกม่อน - กาญจนบุรี',
      addPokemon: 'เพิ่มโปเกม่อน',
      pokemonName: 'ชื่อโปเกม่อน',
      latitude: 'ละติจูด',
      longitude: 'ลองจิจูด',
      submit: 'บันทึก',
      cancel: 'ยกเลิก',
      logout: 'ออกจากระบบ',
      recentPokemons: 'โปเกม่อนล่าสุด',
      noPokemonsFound: 'ยังไม่มีโปเกม่อนในระบบ'
    },
    en: {
      title: 'Pokémon Map - Kanchanaburi',
      addPokemon: 'Add Pokémon',
      pokemonName: 'Pokémon Name',
      latitude: 'Latitude',
      longitude: 'Longitude',
      submit: 'Submit',
      cancel: 'Cancel',
      logout: 'Logout',
      recentPokemons: 'Recent Pokémon',
      noPokemonsFound: 'No Pokémon found yet'
    }
  }

  const t = content[language]

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would fetch from the backend API
    // Example fetch:
    // fetch(`${backendApiUrl}/pokemons`)
    //   .then(res => res.json())
    //   .then(data => setPokemons(data))
    const mockPokemons = [
      {
        id: '1',
        pokemon_name: 'Pikachu',
        latitude: 14.0227,
        longitude: 99.5328,
        spawn_time: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600000).toISOString()
      },
      {
        id: '2',
        pokemon_name: 'Charmander',
        latitude: 14.0350,
        longitude: 99.5450,
        spawn_time: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600000).toISOString()
      },
      {
        id: '3',
        pokemon_name: 'Charizard',
        latitude: 14.0100,
        longitude: 99.5200,
        spawn_time: new Date().toISOString(),
        expires_at: new Date(Date.now() + 3600000).toISOString()
      }
    ]
    setPokemons(mockPokemons)
  }, [])

  const handleAddPokemon = (e) => {
    e.preventDefault()
    // In a real app, this would POST to the backend API
    const newPokemonData = {
      id: String(pokemons.length + 1),
      ...newPokemon,
      latitude: parseFloat(newPokemon.latitude),
      longitude: parseFloat(newPokemon.longitude),
      spawn_time: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3600000).toISOString()
    }
    setPokemons([...pokemons, newPokemonData])
    setNewPokemon({ pokemon_name: '', latitude: '', longitude: '' })
    setShowAddForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={pikachu} alt="Pikachu" className="w-12 h-12" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              KitPokeMap by OtrackZ
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant={language === 'th' ? 'default' : 'outline'}
              onClick={() => setLanguage('th')}
              size="sm"
            >
              ไทย
            </Button>
            <Button 
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
              size="sm"
            >
              English
            </Button>
            <Button variant="outline" size="sm" onClick={onNavigateToAdmin}>
              Admin
            </Button>
            <Button variant="destructive" size="sm">
              {t.logout}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t.title}</h2>
                <Button 
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                >
                  {t.addPokemon}
                </Button>
              </div>

              {/* Add Pokemon Form */}
              {showAddForm && (
                <form onSubmit={handleAddPokemon} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder={t.pokemonName}
                      value={newPokemon.pokemon_name}
                      onChange={(e) => setNewPokemon({...newPokemon, pokemon_name: e.target.value})}
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder={t.latitude}
                      value={newPokemon.latitude}
                      onChange={(e) => setNewPokemon({...newPokemon, latitude: e.target.value})}
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <input
                      type="number"
                      step="any"
                      placeholder={t.longitude}
                      value={newPokemon.longitude}
                      onChange={(e) => setNewPokemon({...newPokemon, longitude: e.target.value})}
                      className="px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button type="submit" size="sm">{t.submit}</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                      {t.cancel}
                    </Button>
                  </div>
                </form>
              )}

              <MapView pokemons={pokemons} />
            </div>
          </div>

          {/* Sidebar - Recent Pokemon */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-bold mb-4">{t.recentPokemons}</h3>
              <div className="space-y-3">
                {pokemons.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">{t.noPokemonsFound}</p>
                ) : (
                  pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <h4 className="font-bold text-purple-700">{pokemon.pokemon_name}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(pokemon.spawn_time).toLocaleString('th-TH')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {pokemon.latitude.toFixed(4)}, {pokemon.longitude.toFixed(4)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

