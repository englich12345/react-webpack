import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './views/App';

const AppRouter = () => (
    <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<AppRouter />, document.querySelector('#root'));
