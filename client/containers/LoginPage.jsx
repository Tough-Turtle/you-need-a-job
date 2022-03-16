import React from 'react';

const LoginPage = props => {
  return (
    <div className="login-container container">
      <h1>You need a job. Like seriously.</h1>
      <button onClick={props.handleLogin}> Don't Login Here</button>
    </div>
  );
};

export default LoginPage;
