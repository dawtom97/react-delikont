import styled from "styled-components";


export const Wrapper = styled.div`
  & h3 {
    font-size: 18px;
  }

  & div {
    margin-bottom: 30px;
  }

`

export const ButtonsBox = styled.div `
  margin-top:20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 992px) {
    gap: 10px;
  }

  & a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

export const BillingBox = styled.div`
 border: 2px solid ${({theme})=>theme.colorPrimary};
   padding: 15px;
   font-size: 14px;
   margin-bottom: 25px;
   position: relative;
`

export const BillingMethodBox = styled.div`
  width: 80px;
  height: 80px;
  border:2px solid ${({theme})=>theme.colorPrimary};
  padding:10px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  align-items: center;
  font-size: 50px;
  cursor: pointer;
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
   margin-top:-25px;
   width:120px;
  }

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