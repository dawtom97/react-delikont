import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../src/context/ModalContext';
import { UserContext } from '../src/context/UserContext'
import {MainTemplate} from '../src/templates/MainTemplate'

const AccountPage = () => {
  const {currentUser,userLogout} = useContext(UserContext);
  const {showModal} = useContext(ModalContext)


  const handleLogout = () => {
    showModal("Pomyślnie wylogowano");
    userLogout()
  }

  return (
    <MainTemplate>
       <h1>Zalogowano jako {currentUser?.firstname} {currentUser?.lastname}</h1>
       <h2>Email: {currentUser?.email}</h2>
       <button onClick={handleLogout}>Wyloguj</button>
    </MainTemplate>
  )
}

export default AccountPage