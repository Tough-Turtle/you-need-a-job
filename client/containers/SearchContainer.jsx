import React,{useState, useEffect} from 'react';
import NavBar from '../components/NavBar.jsx';
import {JobSearchResults} from './JobSearchResults.jsx'

const SearchContainer = () => {

  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [queryResults, setQueryResults] = useState([])

  const handleJobQueryInput = (e) => {
    setJobQuery(e.target.value)

  }

  const handleLocationQueryInput = (e) => {
    setLocationQuery(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // api call

    // useEffect(() => {

    // })

    fetch(`http://localhost:3001/search?title=${jobQuery}&location=${locationQuery}`, {
      method: 'GET',
      header: {
        'Access-Control-Allow-Origin': "*"
      },
    }).then(res => res.json()).then(data => {
      setQueryResults(data);
      setJobQuery('');
      setLocationQuery('');
    })
  }

  console.log(jobQuery);
  console.log(locationQuery);
  console.log(queryResults);
 
  return (
    <>
      <NavBar />
      <div className='search-container'>
        <h1>Search Container</h1>
        <div>
        <h2 style={{ border: '1px white solid' }}> Search Jobs</h2>

        <form onSubmit={handleSubmit}>
         
         <label className="search-query-label" htmlFor="job-title">Job Title
         <input type='text' name="job-title" className="search-input" onChange={handleJobQueryInput} value={jobQuery}></input>
         </label>
         
         <label className="search-query-label" htmlFor="location">Location
         <input type='text' name="location" className="search-input" onChange={handleLocationQueryInput} value={locationQuery}></input>
         </label>

        <input type="submit" value="Search"/>

         </form>
        
        </div>
        <div className="job-search-query-container">
        <h2 style={{ border: '1px white solid'}}> Search results table placeholder </h2>
        <JobSearchResults queryResults={queryResults}/>
  </div>
      </div>
    </>
  )
}

export default SearchContainer;