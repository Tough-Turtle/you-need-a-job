import React, {useEffect, useState} from 'react';
import {JobSearchResult} from '../components/JobSearchResult.jsx'

export const JobSearchResults = (props) => {
  console.log('searchresultsprops', props)
let results = [];
  if (props) results = props.queryResults.map(result => <JobSearchResult data={result} username={props.username} />)
  

  return (
    <div>
      <p>Check out these sick query results</p>
      {results}
      </div>
  ) 
}