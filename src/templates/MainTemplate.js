import React from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header/Header'

export const MainTemplate = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

