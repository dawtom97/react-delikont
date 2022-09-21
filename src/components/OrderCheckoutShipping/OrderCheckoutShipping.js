import React from 'react';
import { Heading } from '../Heading';
import * as Styled from './styles';
import {AdditionalAddresses} from '../AdditionalAddresses/AdditionalAddresses'

export const OrderCheckoutShipping = ({addresses}) => {
  console.log(addresses);
  return (
    <Styled.Wrapper>
        <Heading level="h3">ADRES DO WYSYŁKI</Heading>
        <AdditionalAddresses isCheckout addresses={addresses}/>
    </Styled.Wrapper>
  )
}
