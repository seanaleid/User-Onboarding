import React from "react";

import styled from "styled-components";

const Header = styled.header`
    width: 100%;
    border: 1px solid black;
    padding-bottom: 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    color: black;
    display: flex;
    background-color: rgba(255, 213, 7, 1);
`;

const Logo = styled.p`
    max-width: 100%;
    margin-left: 200px;

`;

const TopHeader = ()=>{
    return(
        <Header>
            <Logo>logo here</Logo>
            <Logo>Hello Test World</Logo>
        </Header>
    )
}

export default TopHeader;