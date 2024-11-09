import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/manager'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <Manager />
      <Footer />
    </>
  )
}

export default App