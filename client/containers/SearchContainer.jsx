import React,{useState, useEffect, useContext} from 'react';
import NavBar from '../components/NavBar.jsx';
import {JobSearchResults} from './JobSearchResults.jsx'
import { useLocation, useParams } from 'react-router-dom'
import {UserContext} from './UserProvider.jsx';

const SearchContainer = (props) => {

  // const {state} = useLocation();

  // console.log('state', state)

  // console.log('search container props',props)
  // console.log('search container props location',props.location)

  // const {username} = useParams();
  // console.log('params', username);

  // const location = useLocation();
  // console.log('location', location)

  // console.log('query', query);

  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  
  const [username, setUsername] = useContext(UserContext);

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

    fetch(`http://localhost:3001/search?title=${jobQuery}&location=${locationQuery}&username=${username}`, {
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
    {/* <NavBar /> */}
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