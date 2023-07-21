import React from "react";

import styled, { css } from "styled-components";
import { HeadingProps } from "./Heading";

// const THIN = css` font-weight: 200;`
// const UPPERCASE = css`text-transform:uppercase;`

export const Text = styled.h2`
  /* ${({ isThin }) => isThin && THIN};
  ${({ isUpperCase }) => isUpperCase && UPPERCASE}; */
  font-size: 24px;
  text-transform: capitalize;
`;

export const Heading = ({ level = "h2", children }) => {
  const Heading = level;
  return <Text as={Heading}>{children}</Text>;
};
