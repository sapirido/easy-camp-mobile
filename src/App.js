import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { ConfigProvider } from 'antd';
import { AppWrapper,GlobalStyle } from './App.styled';
import createStore from './data/store';
import AppRouter from './AppRouter';
import { BrowserRouter } from 'react-router-dom';


function App() {
 
  return (
    <Provider store={createStore()}>
      <ConfigProvider direction="rtl">
        <AppWrapper>
          <GlobalStyle/>
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
        </AppWrapper>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
