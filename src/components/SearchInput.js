import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";

export const SearchBox = styled.div`
  display: flex;
  width: 37.5%;
  @media (max-width: 992px) {
    display: none;
  }

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 0px 20px 20px 0;
    width: 9%;
    border: 1px solid #e1e1e1;
    border-left: none;
    min-width: 44px;
    color: #fff;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colorPrimary};
    & > svg {
      font-size: 20px;
    }
  }
  & > input {
    padding: 10px 0;
    border-radius: 20px 0 0 20px;
    width: 91%;
    outline: none;
    display: block;
    height: 100%;
    padding-left: 20px;
    border: 1px solid #e1e1e1;
    border-right: none;
  }
`;

const SearchInput = () => {
  const [queryText, setQueryText] = useState("");
  const router = useRouter();

  const handleNavigate = () => {
    if (queryText.length > 0) {
      router.push(`/katalog/${queryText}`);
    }
  };

  const handleKeyup = (e) => {
    if (e.key === "Enter") {
      handleNavigate();
    }
  };

  return (
    <SearchBox>
      <input
        onKeyUp={handleKeyup}
        onChange={(e) => setQueryText(e.target.value)}
        type="text"
        placeholder="Szukaj w sklepie..."
      />
      <button onClick={handleNavigate}>
        <FiSearch />
      </button>
    </SearchBox>
  );
};
export default SearchInput;
