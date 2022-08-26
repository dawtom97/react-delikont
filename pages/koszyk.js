import React, { useContext } from 'react';
import { UserContext } from '../src/context/UserContext';
import {MainTemplate} from '../src/templates/MainTemplate';
import {Loader} from '../src/components/Loader'
import { CartInfo } from '../src/components/CartInfo/CartInfo';

const Cart = () => {
  const {cart} = useContext(UserContext);


  if(!cart) return (
    <MainTemplate>
        <Loader/>
    </MainTemplate>
  )
  
  return (
    <MainTemplate>
        <CartInfo cart={cart}/>
    </MainTemplate>
  )
}

export default Cart