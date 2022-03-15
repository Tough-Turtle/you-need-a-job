import React from 'react';
import NavBar from '../components/NavBar.jsx';
import DataTable from '../components/DataTable.jsx';

const ApplicationsContainer = () => {

  return (
    <>
      <NavBar />
      <div className='container'>
        <h1>Applications Container</h1>
        <DataTable />
      </div>
    </>
  )
}

export default ApplicationsContainer;