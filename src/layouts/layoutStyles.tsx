import { styled } from "styled-components";

const TOP_MENU_HEIGHT = 4;

export const LayoutWrap = styled.div`
  && {
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
  }
`;



export const LayoutTopMenuWrap = styled.div`
  && {
    background-color: white;
    z-index: 999;
    height: ${TOP_MENU_HEIGHT}rem;
    width: 100%;
    padding: 0 1rem;
    position: -webkit-fixed;
    position: fixed;
    z-index: 999;
    top: 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
  }
`;

export const LayoutContentWrap = styled.div`
  && {
    margin-top: ${TOP_MENU_HEIGHT}rem;
    height: calc(100vh - ${TOP_MENU_HEIGHT}rem);
    width: 100vw;
    overflow-x: hidden;
    display: flex;
  }
`;