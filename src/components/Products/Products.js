import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { products } from '../../fakeData/fakeData';

export const Wrapper = styled.div`
  display: flex;
`;

export const ProductCard = styled.article`
   width: calc(15% - 20px);
   border: 1px solid #ebebeb;
   padding: 10px;


   & > a {
    display: block;
    width: 100%;
    text-align: center;
   }
`

const Products = () => {
  return (
    <Wrapper>
        {products.map((product,index)=>(
           <ProductCard key={index}>
                <Image src={product.image} layout="responsive" alt={product.name}/>
                <Link href={`/${product.link}`}>{product.name}</Link>
           </ProductCard>
        ))}
    </Wrapper>
  )
}

export default Products