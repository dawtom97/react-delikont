import styled from "styled-components";

export const Wrapper = styled.div`
   &  h3 {
    margin-top: 0px;
   }
`

export const MinorInfo = styled.div`
    padding:10px 20px;
    border: 1px solid #e1e1e1;

    & h4 {
        margin-top: 15px;
        color:${({theme})=>theme.colorPrimary}
    }
`

export const OrderTable = styled.table`
margin-top:20px;
    width: 100%;
  font-size: 14px;
  border-collapse: collapse;
  border: 1px solid #e1e1e1;
  margin-bottom: 20px;


  & thead {
    width: 100%;
    padding: 12px;
    &  tr:first-child {
    border:1px solid #e1e1e1
    }
  }

  & td {
    border-left:1px solid #e1e1e1;
    border-right:1px solid #e1e1e1;
    padding: 20px;
  }



  & tbody {
    cursor: pointer;

    &  > tr:nth-child(2n + 1) {
      background-color: #f6f6f6;;
    }
    &  tr:last-child {
    border:1px solid #e1e1e1;
    background-color: #343434;
    color:#fff
    }
  }
 
`