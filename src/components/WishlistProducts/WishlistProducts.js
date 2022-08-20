import React from 'react';
import styled from 'styled-components';
import { Heading } from '../Heading';

export const Wrapper = styled.div``

export const WishlistProducts = ({items}) => {
  return (
    <Wrapper>
        <Heading level='h1'>Twoje ulubione produkty</Heading>
        {items.map(({product})=><p key={product.id}>{product.name}</p>)}
    </Wrapper>
  )
}

