import React, {useEffect, useState, useContext } from 'react';
import NavBar from '../components/NavBar.jsx';
import DataTable from '../components/DataTable.jsx';
import { useLocation} from 'react-router-dom'
import {UserContext} from './UserProvider.jsx'

const ApplicationsContainer = (props) => {

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

  console.log('username in applications container', username)

  // useEffect(() => {

  // })


  return (
    <>
    {/* <NavBar username={username} /> */}
      <div className='container'>
        <h1>Applications Container</h1>
        <DataTable username={username}/>
      </div>
    </>
  )
}

export default ApplicationsContainer;