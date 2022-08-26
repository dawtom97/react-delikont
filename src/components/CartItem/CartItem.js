import React from 'react';
import styled from 'styled-components';
import {AiOutlineClose} from 'react-icons/ai'


export const Wrapper = styled.div`
   display: flex;
   & img {
    width:70px;
   }
   & button {
    border-radius: 50%;
    font-size: 18px;
    line-height: 35px;
    cursor: pointer;
    text-align: center;
    width: 35px;
    background-color: transparent;
    height: 35px;
    border:1px solid #f57c00;
  
    color: ${({ theme }) => theme.colorPrimary};

    &:hover {
      background-color: ${({ theme }) => theme.colorPrimary};
      color: white;
    }
  }
`

export const CartItem = ({item}) => {
    console.log(item)
  return (
    <Wrapper>
        <img src={item.product.small_image.url} alt={item.product.name}/>
        <p>{item.product.name} {item.product.weight}g</p>
        <div>
        <button>
          <AiOutlineClose />
        </button>
        </div>
    </Wrapper>
  )
}
