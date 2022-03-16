import React, {useEffect, useState, useContext} from 'react';
import {JobSearchResult} from '../components/JobSearchResult.jsx'
import {UserContext} from './UserProvider.jsx'

export const JobSearchResults = (props) => {
  // console.log('searchresultsprops', props)

  const [username, setUsername] = useContext(UserContext);

let results = [];
  if (props) results = props.queryResults.map(result => <JobSearchResult data={result} username={username} />)
  

  return (
    <div>
      <p>Check out these sick query results</p>
      {results}
      </div>
  ) 
}