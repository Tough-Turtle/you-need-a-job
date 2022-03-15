import React from 'react';

const LoginPage = (props) => {

  return (
    <div className="login-container container">
      <h1>You need a job. Like seriously.</h1>
      <button onClick={props.handleLogin}> Login </button>
    </div>
  )

}

export default LoginPage