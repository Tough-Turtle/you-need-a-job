import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import App from './containers/App.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import ApplicationsContainer from './containers/ApplicationsContainer.jsx';
import styles from './styles.scss';
// import ReactDOM from 'react'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> } />
        <Route path='/search' element={ <SearchContainer /> } />
        <Route path='/applications' element={ <ApplicationsContainer /> } />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'));