import React from 'react';
import NavBar from '../components/NavBar.jsx';

const SearchContainer = () => {
 
  return (
    <>
      <NavBar />
      <div className='container'>
        <h1>Search Container</h1>
        <h2 style={{ border: '1px white solid' }}> Search box placeholder </h2>
        <h2 style={{ border: '1px white solid'}}> Search results table placeholder </h2>
      </div>
    </>
  )
}

export default SearchContainer;