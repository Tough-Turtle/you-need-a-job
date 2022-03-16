import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar.jsx';
import ApplicationsContainer from './ApplicationsContainer.jsx';
import LoginPage from './LoginPage.jsx';
import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';
// import { Redirect } from 'react-router';
import { UserContext } from './UserProvider.jsx';
import OAuthLogin from './OAuthLogin.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [username, setUsername] = useState(undefined)

  const [username, setUsername] = useContext(UserContext);
  const navigate = useNavigate();

  // let username;

  useEffect(() => {
    console.log('RENDERED');
    const oAuthUser = new URL(window.location).search.split('=')[1];
    console.log(oAuthUser);
    if (oAuthUser) {
      setUsername(oAuthUser);
      console.log('oAuthUser', oAuthUser);
      fetch(`http://localhost:3001/signin?user=${oAuthUser}`, {
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
        },
      });
      setLoggedIn(true);
    }
    // const username = url.search.split('=')[1];
  }, []);

  useEffect(() => {
    if (loggedIn) return navigate('/applications', { state: { username: username } });
  }, [loggedIn]);

  const handleLogin = () => {
    // OAuth logic here
    console.log('click login');
    setUsername('mykongee');
    setLoggedIn(true);
  };

  // const searchTo = {
  //   pathname: '/search',
  //   param: username
  // }

  return (
    <>
      {/* <NavBar /> */}
      <main>
        <OAuthLogin />
        <LoginPage handleLogin={handleLogin} />
        {/* <SearchContainer username={username}> */}
      </main>
    </>
  );
};

export default App;
