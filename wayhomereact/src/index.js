import React from 'react';
import ReactDOM from 'react-dom/client';
import Footertag from './footer/footer';
import Headertag from './header/header';
import Maintag from './main/main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Headertag />
    <Maintag />
    <Footertag />
  </React.StrictMode>
);


