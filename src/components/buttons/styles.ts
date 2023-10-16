import { styled } from "styled-components";

interface StyledAppButtonProps {
  primary?: boolean;
  variant?: "primary" | "outline" | "text";
  fontSize?: Number;
}

export const StyledAppButtonPrimary = styled.button<StyledAppButtonProps>`
  /* Adapt the colors based on primary prop */
  background: blue;
  color: white;

  font-size: ${(props) => (props?.fontSize ? `${props?.fontSize}px` : "16px")};
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  outline: none;
  border-radius: 3px;
  &:hover {
    background-color: yellow;
  }
`;
export const StyledAppButtonOutline = styled.button<StyledAppButtonProps>`
  /* Adapt the colors based on primary prop */
  background: transparent;
  color: blue;

  font-size: ${(props) => (props?.fontSize ? `${props?.fontSize}px` : "16px")};
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  outline: none;
  border-radius: 3px;
`;
export const StyledAppButtonText = styled.button<StyledAppButtonProps>`
  /* Adapt the colors based on primary prop */
  background: transparent;
  color: blue;

  font-size: ${(props) => (props?.fontSize ? `${props?.fontSize}px` : "16px")};
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  outline: none;
  border-radius: 3px;
  &:hover {
    background-color: grey;
  }
`;
