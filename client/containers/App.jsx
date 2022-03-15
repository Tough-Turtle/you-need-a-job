import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import ApplicationsContainer from './ApplicationsContainer.jsx';
import LoginPage from './LoginPage.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // OAuth logic here
    setLoggedIn(true);
  }

  if (loggedIn) return (
    <div>
      <ApplicationsContainer />
    </div>
  )
  else return (
    <div>
      <LoginPage handleLogin={handleLogin} />
    </div>
  )

}

export default App;