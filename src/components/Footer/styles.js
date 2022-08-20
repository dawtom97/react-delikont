import styled from "styled-components";

export const Wrapper = styled.footer`
  border-top: 1px solid #f5f3ea;
  margin-top:70px;
`
export const InnerWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 10px;
  display: flex;
  align-items: flex-start;
  gap:20px;

  & > div {
    flex:1;
  }

  & span {
    font-weight: 600;
    font-size: 14px;
    color: #000;
  }


  & ul {
    list-style: none;
    padding: 0;
  }
  & li, & p {
    color:#b1b1b1;
    font-size:14px;
    margin:10px 0;
  }
`
export const BottomWrapper = styled.div`
  background-color: #f2f8fd;
    padding: 15px 0 15px;

    & > div {
      max-width: 1400px;
  margin: 0 auto;
  font-size: 12px;
    }
`