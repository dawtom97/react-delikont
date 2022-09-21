import styled from "styled-components";

export const Wrapper = styled.div``

export const PrimaryAddress = styled.div`
   border: 2px solid ${({theme})=>theme.colorPrimary};
   padding: 15px;
   font-size: 14px;
   margin-bottom: 25px;
   position: relative;
`

export const CheckIcon = styled.div`
   position: absolute;
   top:0;
   right:0;
   width: 30px;
   height: 30px;
   display: flex;
   color: #fff;
   font-size: 26px;
   align-items: center;
   justify-content: center;
   background-color: ${({theme})=>theme.colorPrimary};
`