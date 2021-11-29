import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import App from './App';








ReactDOM.render(

  <Router >
    <CookiesProvider >
      <App />
    </CookiesProvider>
  </Router>,

  document.getElementById('root')
);


