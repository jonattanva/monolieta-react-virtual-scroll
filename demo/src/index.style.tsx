import styled from "styled-components";

export const Body = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: center;
`;

export const Row = styled.div`
    align-items: center;
    background: rgb(225 225 225 / 50%);
    color: rgba(0, 0, 0, .5);
    display: flex;
    font-size: 16px;
    height: 100%;
    justify-content: center;
    width: 100%;

    &:hover {
        background: rgb(225 225 225 / 80%);
    }
`;

export const Title = styled.div`
    color: rgba(0, 0, 0, 0.5);
    cursor: default;
    font-size: 20px;
    margin-bottom: 8px;
    text-align: center;
`;

export const Item = styled.div`
    margin: 8px 0;
`
