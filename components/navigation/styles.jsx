import styled from "styled-components/";

export const Container = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 999;
    width: 100%;

    @media (max-width: 1000px) {
        padding-left: 40px;
        padding-right: 40px;
    }
`;

export const NavLink = styled.a`
    font-size: 18px;
    transition: all 350ms ease-out;
    pointer-events: ${({ disabled}) => (disabled ? "none" : "auto")};
    color: ${({active}) => active ? "#3bd4e1" : "#303c3d"};

    &:hover {
        color: #3bd4e1;
        font-weight: bold;
    }
`;