import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../components/NavBar.jsx';
import DataTable from '../components/DataTable.jsx';
import { useLocation } from 'react-router-dom';
import { UserContext } from './UserProvider.jsx';

const ApplicationsContainer = props => {
  //   const [username, setUsername] = useState(undefined);

  //  if (!username) {
  //    let temp = useLocation().state;
  //    setUsername(temp);
  //  }

  //  else

  // console.log(useLocation().state)

  // const {username} = useLocation().state.username;

  // console.log('username', username)

  const [username, setUsername] = useContext(UserContext);
  const [data, setData] = useState([]);

  console.log('username in applications container', username);

  useEffect(() => {
    fetch(`http://localhost:3001/user?user=${username}`, {
      method: 'GET',
      header: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('got data', data);
        setData(data);
      });
  }, []);

  return (
    <>
      {/* <NavBar username={username} /> */}
      <div className="container">
        <h1>Applications Container</h1>
        <DataTable username={username} data={data} />
      </div>
    </>
  );
};

export default ApplicationsContainer;
