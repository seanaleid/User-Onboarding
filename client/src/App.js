import React from 'react';
import './App.css';
import FormikUserForm from "./components/Form";
import styled from "styled-components";

import TopHeader from "./components/Header";

const Header = styled.header`
    width: 100%;
    border: 1px solid black;
    padding-bottom: 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: #fff;
`;

function App() {
  return (
    <div className="App">
        {/* <Header>
          <p>Hello Test World</p>
        </Header> */}
        <TopHeader />
        <FormikUserForm />
    </div>
  );
}

export default App;
