import styled from "styled-components";

export const UButton = styled.button`
  width: ${({ width }) => width ?? "fit-content"};
  outline: none;
  height: ${({ fit }) => (fit ? "fit-content" : "42px")};
  ${({ height }) => height && `height: ${height}`};
  cursor: pointer;
  font-size: 16px;
`;

export const UInput = styled.input`
  background: #fff;
  border: none;
  outline: none;
  color: #303c3d;
  height: 100%;
  width: 100%;
  padding: 4px 8px;
`;
