import React from 'react'
import styled from 'styled-components'
import { CartItem } from '../CartItem/CartItem'
import { Heading } from '../Heading'

export const Wrapper = styled.div`
`

export const CartInfo = ({cart}) => {

  if(!cart) return "Loading..."
  console.log(cart.items)
  return (
    <Wrapper>
        <Heading level='h1'>Koszyk</Heading>
        
        {!cart.items.length > 1 ? <p>Nie masz żadnych produktów w koszyku</p> : (
            cart.items.map((item) => (
                <CartItem key={item.id} item={item}/>
            ))
        )}
    </Wrapper>
  )
}
