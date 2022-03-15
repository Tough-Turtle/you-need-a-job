import React from 'react';
import NavBar from '../components/NavBar.jsx';
import DataTable from '../components/DataTable.jsx';
import { useLocation } from 'react-router-dom'

const ApplicationsContainer = () => {

  const {state} = useLocation();

  console.log(state.username)

  return (
    <>
    <NavBar username={state.username} />
      <div className='container'>
        <h1>Applications Container</h1>
        <DataTable />
      </div>
    </>
  )
}

export default ApplicationsContainer;