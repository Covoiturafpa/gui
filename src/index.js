import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './services/UserLogin';
import { App } from './App';
import "tailwindcss/tailwind.css";
import "rsuite/dist/rsuite.min.css";


const divRoot = document.querySelector('#root');

const root = ReactDOM.createRoot(divRoot);
root.render(
  <BrowserRouter>
    <Provider>
      <App/>
    </Provider>
  </BrowserRouter>
);
