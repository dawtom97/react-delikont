import styled from "styled-components";


export const Wrapper = styled.div`
  margin-top: 50px;
`;
export const UpperInfo = styled.div`
  display: flex;
  gap: 30px;
`;

export const BottomInfo = styled.div`
  margin-top: 80px;
`;

export const ImageBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const HeartButton = styled.button`
  position: absolute;
  right: 30px;
  top: 0;
  cursor: pointer;
  width: 40px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colorPrimary};
  color: ${({ isFavorite }) => (isFavorite ? "#fff" : "#f57c00")};
  font-size: 20px;
  text-align: center;
  line-height: 44px;
  height: 40px;
  background-color: ${({ isFavorite }) =>
    isFavorite ? "#f57c00" : "transparent"};
`;

export const TextBox = styled.div`
  flex: 1;
  text-align: center;

  & div {
    width: initial;
  }
  & > button {
    width: 300px;
    height: 40px;
    margin-top: 20px;
  }

  & > div > p {
    text-align: left;
    margin-top: 30px;
  }
`;
export const InnerContent = styled.div`
  font-size: 13px;
  color: #282828;
`;
export const ContentSwitchBox = styled.div`
  border-bottom: 2px solid #ddd;
  display: flex;
  margin-bottom: 25px;
  gap: 30px;
`;
export const SwitchSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #414b56;
  display: block;
  padding: 5px 15px;
  height: 35px;
  cursor: pointer;

  border-bottom: 3px solid transparent;
  transition: 0.4s;

  &:nth-of-type(${({ isActive }) => isActive}) {
    border-bottom: 3px solid #f57c00;
  }
`;
export const StatusMsg = styled.p`
  display: flex;
  align-items: center;
  font-size: 13px;

  & > svg {
    margin-right: 12px;
    color: ${({ isOutOfStock }) => (isOutOfStock ? "#ff1515" : "#f57c00")};
  }

  & a {
    text-decoration: underline;
  }
`;