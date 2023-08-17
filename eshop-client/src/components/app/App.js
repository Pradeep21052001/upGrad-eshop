import React from 'react';
import MainComponent from '../main component/MainComponent';
import UserContext from '../user cotext/userContext';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <MainComponent></MainComponent>
      </UserContext>
    </BrowserRouter>
  );
}
export default App;
