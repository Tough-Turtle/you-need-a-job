import React, { useState } from 'react';
// import NavBar from '../components/NavBar.jsx';
import ApplicationsContainer from './ApplicationsContainer.jsx';
import LoginPage from './LoginPage.jsx';
import {Link, Outlet} from 'react-router-dom'




const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // OAuth logic here
    setLoggedIn(true);
  }

  return (
    <div className='main-container'>
    <div className='navigation-container'>
    <h1>YNAJ</h1>
    <nav className='nav-bar'>
      <Link to='/applications' className='link'>My applications</Link>
      <Link to='/search' className='link'>Search Jobs</Link>
    </nav>
    <Outlet/>
  </div>
  <main>
    {loggedIn ? <ApplicationsContainer /> : <LoginPage />}
    </main>
  </div>
  )

}

export default App;