import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import ApplicationsContainer from './ApplicationsContainer.jsx';
import LoginPage from './LoginPage.jsx';
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';
// import { Redirect } from 'react-router';




const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(undefined)

  const navigate = useNavigate();

  // let username;

  useEffect(() => {
    if (loggedIn) return navigate('/applications', {state: {username: username}});
    // if (loggedIn) return <Navigate to='/search' state={{username: 'mykongee'}} />
    // username = 'mykongee'
  },[loggedIn])

  const handleLogin = () => {
    // OAuth logic here
    console.log('click login');
    setUsername('mykongee');
    setLoggedIn(true);
    
  }

  const searchTo = {
    pathname: '/search',
    param: username
  }

  return (
<>

<NavBar />
  <main>
    <LoginPage handleLogin={handleLogin} />}
    {/* <SearchContainer username={username}> */}
    </main>
  
  </>
  )

}

export default App;