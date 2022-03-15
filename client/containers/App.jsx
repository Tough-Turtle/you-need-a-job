import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import LoginPage from './LoginPage.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // OAuth logic here
    setLoggedIn(true);
  }

  if (loggedIn) return (
    <div>
      <NavBar />
    </div>
  )
  else return (
    <div>
      <LoginPage handleLogin={handleLogin} />
    </div>
  )

}

export default App;