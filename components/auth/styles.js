import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 60px 0;
    width: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFF;
    max-width: 528px;
`;

export const TitleContainer =  styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 1rem;
    width: 100%;
    border-bottom: 1px solid #e4e4e4;
`;

export const AuthTitle = styled.h1`
    font-weight: 500;
    line-height: 3rem;
    color: #333333;
`;

export const InputField= styled.input`
    background: none;
    outline: none;
    border: 1px solid #e4e4e4;
    color: #333333;
    width: 100%;
    border-radius: 2px;
`;