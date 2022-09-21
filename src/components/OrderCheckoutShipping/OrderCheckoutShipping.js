import React from 'react';
import { Heading } from '../Heading';
import * as Styled from './styles';
import {AdditionalAddresses} from '../AdditionalAddresses/AdditionalAddresses'
import {BsCheck} from 'react-icons/bs'
import { magentoSetShippingMethodOnCart } from '../../graphql/magentoSetShippingMethodOnCart';
import { magentoSetShippingAddressOnCart } from '../../graphql/magentoSetShippingAddressOnCart';
import Link from 'next/link';

export const OrderCheckoutShipping = ({addresses,cart}) => {
 // console.log(addresses);

  const defaultShipping = addresses.filter(
    (address) => address.default_shipping === true
  );


  const handleShippingSubmit = () => {
    magentoSetShippingMethodOnCart(cart.id).then(res=>console.log(res));
    magentoSetShippingAddressOnCart(cart.id,defaultShipping[0]).then((res=>console.log(res)))
  }

  return (
    <Styled.Wrapper>
        <Heading level="h3">ADRES DO WYSYŁKI</Heading>
        {defaultShipping.map((shipping, index) => (
                <Styled.PrimaryAddress key={index}>
                    <Styled.CheckIcon><BsCheck/></Styled.CheckIcon>
                  <p>
                    {shipping?.firstname} {shipping?.lastname}
                  </p>
                  <p>{shipping?.telephone}</p>
                  <p>
                    {shipping?.postcode} {shipping?.city}
                  </p>
                  <p>
                    {shipping?.region?.region}, {shipping?.country_code}
                  </p>
                </Styled.PrimaryAddress>
              ))}

        <AdditionalAddresses isCheckout addresses={addresses}/>

        <div>
            <Heading level='h3'>DOSTĘPNE METODY WYSYŁKI</Heading>
            <label><input type="radio"/> 20,00zł Przesyłka kurierska</label>
            <div>
                <label>Data dostawy</label>
                <br/>
                <input type="date"/>
            </div>
            <div>
                <label>Komentarz</label>
                <br/>
                <textarea/>
            </div>

            <button onClick={handleShippingSubmit}><Link href="/podsumowanie/platnosc">DALEJ</Link></button>
        </div>
    </Styled.Wrapper>
  )
}
