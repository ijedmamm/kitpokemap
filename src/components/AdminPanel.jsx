import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import pikachu from '../assets/pikachu.png'
import '../App.css'

function AdminPanel({ onNavigateBack }) {
  const [language, setLanguage] = useState('th')
  const [users, setUsers] = useState([])
  const [pokemons, setPokemons] = useState([])
  const [activeTab, setActiveTab] = useState('users')

  const content = {
    th: {
      title: 'แผงควบคุมแอดมิน',
      users: 'ผู้ใช้งาน',
      pokemons: 'โปเกม่อน',
      logout: 'ออกจากระบบ',
      backToDashboard: 'กลับสู่แผนที่',
      email: 'อีเมล',
      username: 'ชื่อผู้ใช้',
      subscriptionStatus: 'สถานะสมาชิก',
      createdAt: 'วันที่สร้าง',
      actions: 'การดำเนินการ',
      pokemonName: 'ชื่อโปเกม่อน',
      location: 'ตำแหน่ง',
      spawnTime: 'เวลา Spawn',
      reportedBy: 'รายงานโดย',
      delete: 'ลบ',
      edit: 'แก้ไข',
      totalUsers: 'ผู้ใช้งานทั้งหมด',
      totalPokemons: 'โปเกม่อนทั้งหมด',
      activeToday: 'ใช้งานวันนี้'
    },
    en: {
      title: 'Admin Control Panel',
      users: 'Users',
      pokemons: 'Pokémon',
      logout: 'Logout',
      backToDashboard: 'Back to Map',
      email: 'Email',
      username: 'Username',
      subscriptionStatus: 'Subscription',
      createdAt: 'Created At',
      actions: 'Actions',
      pokemonName: 'Pokémon Name',
      location: 'Location',
      spawnTime: 'Spawn Time',
      reportedBy: 'Reported By',
      delete: 'Delete',
      edit: 'Edit',
      totalUsers: 'Total Users',
      totalPokemons: 'Total Pokémon',
      activeToday: 'Active Today'
    }
  }

  const t = content[language]

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would fetch from the backend API
    const mockUsers = [
      {
        id: '1',
        email: 'user1@example.com',
        username: 'user1',
        subscription_status: 'premium',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        email: 'user2@example.com',
        username: 'user2',
        subscription_status: 'free',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        email: 'user3@example.com',
        username: 'user3',
        subscription_status: 'premium',
        created_at: new Date().toISOString()
      }
    ]

    const mockPokemons = [
      {
        id: '1',
        pokemon_name: 'Pikachu',
        latitude: 14.0227,
        longitude: 99.5328,
        spawn_time: new Date().toISOString(),
        reported_by: 'user1'
      },
      {
        id: '2',
        pokemon_name: 'Charmander',
        latitude: 14.0350,
        longitude: 99.5450,
        spawn_time: new Date().toISOString(),
        reported_by: 'user2'
      },
      {
        id: '3',
        pokemon_name: 'Charizard',
        latitude: 14.0100,
        longitude: 99.5200,
        spawn_time: new Date().toISOString(),
        reported_by: 'user3'
      }
    ]

    setUsers(mockUsers)
    setPokemons(mockPokemons)
  }, [])

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleDeletePokemon = (pokemonId) => {
    setPokemons(pokemons.filter(pokemon => pokemon.id !== pokemonId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={pikachu} alt="Pikachu" className="w-12 h-12" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              {t.title}
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
            <Button variant="outline" size="sm" onClick={onNavigateBack}>
              {t.backToDashboard}
            </Button>
            <Button variant="destructive" size="sm">
              {t.logout}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{t.totalUsers}</h3>
            <p className="text-4xl font-bold text-purple-600">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{t.totalPokemons}</h3>
            <p className="text-4xl font-bold text-orange-600">{pokemons.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{t.activeToday}</h3>
            <p className="text-4xl font-bold text-green-600">{users.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.users}
            </button>
            <button
              onClick={() => setActiveTab('pokemons')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'pokemons'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.pokemons}
            </button>
          </div>

          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.email}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.username}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.subscriptionStatus}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.createdAt}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.subscription_status === 'premium'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.subscription_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString('th-TH')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          {t.edit}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          {t.delete}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pokemons Table */}
          {activeTab === 'pokemons' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.pokemonName}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.location}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.spawnTime}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.reportedBy}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pokemons.map((pokemon) => (
                    <tr key={pokemon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pokemon.pokemon_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pokemon.latitude.toFixed(4)}, {pokemon.longitude.toFixed(4)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(pokemon.spawn_time).toLocaleString('th-TH')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pokemon.reported_by}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                        >
                          {t.edit}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePokemon(pokemon.id)}
                        >
                          {t.delete}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

