import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import {Switch} from 'react-router';
import App from './containers/App.jsx';
import SearchContainer from './containers/SearchContainer.jsx';
import ApplicationsContainer from './containers/ApplicationsContainer.jsx';
import styles from './styles.scss';
import {UserProvider} from './containers/UserProvider.jsx';
import NavBar from './components/NavBar.jsx'

// const UserContext = createContext();

ReactDOM.render(
  <UserProvider>
  <BrowserRouter>
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={ <App /> } />
        <Route path='/search' element={ <SearchContainer/> } />
        <Route path='/applications' element={ <ApplicationsContainer /> } />
      </Routes>
    </div>
  </BrowserRouter>
  </UserProvider>,
  document.getElementById('root'));