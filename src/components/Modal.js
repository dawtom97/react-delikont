import React, { useContext, useEffect } from 'react'
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { ModalContext } from '../context/ModalContext';


export const Wrapper = styled.div`
    position: fixed;
    bottom:50px;
    left:50%;
    height: 50px;
     display: flex;
     align-items: center;
     justify-content: center;
    transform: translateX(-50%);
    background-color: #f2f8fd;
    padding: 20px;
    font-size: 12px;
    text-align: center;
    border-radius: 30px;
    box-shadow:0px 5px 5px -5px #bbb;
    font-weight: 700;
    z-index: 1000;
    color: ${({isError})=> isError ? "red" : '#000'};
`

export const Modal = ({msg, isError = false}) => {
  const {isModalVisible,setIsModalVisible} = useContext(ModalContext)

  const element = document.getElementById('modal');

  useEffect(()=>{
    // setTimeout(() => setIsModalVisible(false) ,2000)
  },[])

  return createPortal(
    <Wrapper isError={isError}>
        <p>{msg}</p>
    </Wrapper>,
    element
  )
}

