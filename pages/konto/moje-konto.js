import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../src/context/ModalContext';
import { UserContext } from '../../src/context/UserContext'
import { AccountTemplate } from '../../src/templates/AccountTemplate';
import {MainTemplate} from '../../src/templates/MainTemplate'

const AccountPage = () => {
  const {currentUser,userLogout} = useContext(UserContext);
  const {showModal} = useContext(ModalContext);

  const handleLogout = () => {
    showModal("Pomyślnie wylogowano");
    userLogout();
  }

 // console.log(currentUser)

  return (
    <AccountTemplate>
       <h1>Zalogowano jako {currentUser?.firstname} {currentUser?.lastname}</h1>
       <h2>Email: {currentUser?.email}</h2>
       <button onClick={handleLogout}>Wyloguj</button>
    </AccountTemplate>
  )
}

export default AccountPage