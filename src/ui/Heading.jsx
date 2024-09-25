import styled, { css } from "styled-components";
/* eslint-disable no-constant-condition */

// const test = `text-align: center;`;

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-weight: 600;
      font-size: 3rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-weight: 500;
      font-size: 2rem;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-weight: 400;
      font-size: 1.5rem;
    `}
  line-height: 1.4;
`;

export default Heading;
