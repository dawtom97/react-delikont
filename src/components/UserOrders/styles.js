import styled from "styled-components";

export const Wrapper = styled.div`

  & h3 {
    margin-top:0;
  }
`

export const OrdersTable = styled.table`
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
  border: 1px solid 1px solid #e1e1e1;

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
  }
`

export const NumberRow = styled.td`
text-align: center;

  & span {
    background-color: #343434;
    padding: 5px 10px;
    border-radius: 6px;
    color: #fff;
  }
`

export const StatusRow = styled.td`
  color: ${({theme})=>theme.colorPrimary};
`