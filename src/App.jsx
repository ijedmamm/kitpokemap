import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import pikachu from './assets/pikachu.png'
import charmander from './assets/charmander.png'
import charizard from './assets/charizard.png'
import pokemonLogo from './assets/pokemon-logo.png'
import './App.css'

function App() {
  const [backendApiUrl, setBackendApiUrl] = useState('')

  useEffect(() => {
    setBackendApiUrl(import.meta.env.VITE_BACKEND_API_URL)
  }, [])

  if (!backendApiUrl) {
    return <div>Loading configuration...</div>
  }
  const [language, setLanguage] = useState('th')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard' or 'admin'

  const content = {
    th: {
      welcome: 'ยินดีต้อนรับสู่ KitPokeMap',
      subtitle: 'ค้นหาและแชร์ตำแหน่งโปเกม่อนในจังหวัดกาญจนบุรี',
      login: 'เข้าสู่ระบบ',
      register: 'สมัครสมาชิก',
      learnMore: 'เรียนรู้เพิ่มเติม',
      usernameLabel: 'ชื่อผู้ใช้',
      passwordLabel: 'รหัสผ่าน'
    },
    en: {
      welcome: 'Welcome to KitPokeMap',
      subtitle: 'Find and share Pokémon locations in Kanchanaburi',
      login: 'Sign In',
      register: 'Sign Up',
      learnMore: 'Learn More',
      usernameLabel: 'Username',
      passwordLabel: 'Password'
    }
  }

  const t = content[language]

  const handleLogin = (e) => {
    e.preventDefault()
    // In a real app, this would authenticate with the backend
    if (username && password) {
      setIsLoggedIn(true)
    }
  }

  // If logged in, show Dashboard or AdminPanel based on currentView
  if (isLoggedIn) {
    if (currentView === 'admin') {
      return <AdminPanel onNavigateBack={() => setCurrentView('dashboard')} backendApiUrl={backendApiUrl} />
    }
    return <Dashboard onNavigateToAdmin={() => setCurrentView('admin')} backendApiUrl={backendApiUrl} />
  }

  // Otherwise, show Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          variant={language === 'th' ? 'default' : 'outline'}
          onClick={() => setLanguage('th')}
          className="rounded-full"
        >
          ไทย
        </Button>
        <Button 
          variant={language === 'en' ? 'default' : 'outline'}
          onClick={() => setLanguage('en')}
          className="rounded-full"
        >
          English
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl w-full">
          {/* Pokemon Characters */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <img src={pikachu} alt="Pikachu" className="w-20 h-20 md:w-24 md:h-24 animate-bounce" />
            <img src={charmander} alt="Charmander" className="w-20 h-20 md:w-24 md:h-24 animate-bounce delay-100" />
            <img src={charizard} alt="Charizard" className="w-20 h-20 md:w-24 md:h-24 animate-bounce delay-200" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
            {t.welcome}
          </h1>
          
          <p className="text-xl text-center text-gray-600 mb-8">
            {t.subtitle}
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.usernameLabel}
              </label>
              <input 
                type="text" 
                placeholder={t.usernameLabel}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.passwordLabel}
              </label>
              <input 
                type="password" 
                placeholder={t.passwordLabel}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Button 
                type="submit"
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.login}
              </Button>
              <Button 
                type="button"
                size="lg" 
                variant="outline"
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t.register}
              </Button>
            </div>
          </form>

          {/* Learn More Link */}
          <div className="text-center mt-6">
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">
              {t.learnMore}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white text-sm">
            © 2025 KitPokeMap by OtrackZ. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

