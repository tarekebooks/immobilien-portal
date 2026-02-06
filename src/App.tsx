import React from 'react'
import './App.css'
import Home from './pages/Home'
import { I18nProvider } from './i18n/I18nProvider'

const App: React.FC = () => {

  return (
    <I18nProvider>
      <Home />
    </I18nProvider>
  )
}

export default App
