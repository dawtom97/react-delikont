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

export const ShippingMethodsBox = styled.div`
    & input[type="date"] {
      display: block;
      width: 100%;
      border: 1px solid #e1e1e1;
    }
    & label {
      margin-top:10px;
      display: block;
      font-size: 14px;
      font-weight: 500;

    }
    & textarea {
      font-size: 12px;
      display: block;
    background-color: transparent;
    width: 100%;
    padding: 5px;
    line-height: 40px;
    border: none;
    border: 1px solid #e1e1e1;
    outline: none;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    }

`

export const ButtonsBox = styled.div `
  margin-top:20px;
  display: flex;
  justify-content: space-between;
`

export const ShippingMethodBox = styled.div`
  width: 80px;
  height: 80px;
  border:2px solid ${({theme})=>theme.colorPrimary};
  padding:10px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  align-items: center;
  cursor: pointer;
  font-size: 50px;
  color: ${({theme})=>theme.colorPrimary};
`

export const RadioBox = styled.div`
  display: flex;
  align-items: center;
  gap:12px;
  font-size: 14px;
  margin-bottom:25px;
 
  & input[type="radio"] {
   display: none;
   visibility: hidden;
  }

  & span {
   font-weight: 700;
  }

  & p {
   margin:0;
  }

`