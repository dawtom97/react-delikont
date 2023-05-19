import React, { useContext } from 'react'
import { AdditionalAddresses } from '../../src/components/AdditionalAddresses/AdditionalAddresses';
import { AddressInfo } from '../../src/components/AddressInfo/AddressInfo';
import { Loader } from '../../src/components/Loader';
import { UserContext } from '../../src/context/UserContext';
import { AccountTemplate } from '../../src/templates/AccountTemplate'

const UserAddressPage = () => {
  const {addresses} = useContext(UserContext);

  return (
    <AccountTemplate>
        {addresses ? <AddressInfo addresses={addresses}/> : <Loader/>}
        <AdditionalAddresses addresses={addresses}/>
    </AccountTemplate>
  )
}

export default UserAddressPage