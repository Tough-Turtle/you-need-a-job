import React,{useState} from 'react';
import NavBar from '../components/NavBar.jsx';

const SearchContainer = () => {

  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [queryResults, setQueryResults] = useState({  })

  const handleJobQueryInput = (e) => {
    setJobQuery(e.target.value)

  }

  const handleLocationQueryInput = (e) => {
    setLocationQuery(e.target.value)

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // api call

    // const body = JSON.stringify({
    //   title: jobQuery,
    //   location: locationQuery
    // });

    



    fetch(`http://localhost:3000/search?title=${jobQuery}&location=${locationQuery}`, {
      method: 'GET',
      header: {
        'Access-Control-Allow-Origin': "*"
      },
      // body: body
    }).then(res => res.json()).then(data => {
      console.log(data);
      setQueryResults({
        title: 'senior cat wrangler',
        location: 'CA'
      })

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
         <input type='text' name="job-title" className="search-input" onChange={handleJobQueryInput}></input>
         </label>
         
         <label className="search-query-label" htmlFor="location">Location
         <input type='text' name="location" className="search-input" onChange={handleLocationQueryInput}></input>
         </label>

        <input type="submit" value="Search"/>

         </form>
        
        </div>
        <h2 style={{ border: '1px white solid'}}> Search results table placeholder </h2>
      </div>
    </>
  )
}

export default SearchContainer;