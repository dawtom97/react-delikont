import React, { useContext, useEffect, useState } from 'react'
import { AccountInfo } from '../../src/components/AccountInfo/AccountInfo';
import AddressInfo from '../../src/components/AddressInfo/AddressInfo';
import { ModalContext } from '../../src/context/ModalContext';
import { UserContext } from '../../src/context/UserContext'
import { AccountTemplate } from '../../src/templates/AccountTemplate';

const AccountPage = () => {
  const {currentUser} = useContext(UserContext);

  console.log(currentUser)

  return (
    <AccountTemplate>
       <AccountInfo user={currentUser} wishlistCount={currentUser?.wishlist?.items_count}/>
       <AddressInfo addresses={currentUser.addresses}/>
    </AccountTemplate>
  )
}

export default AccountPage