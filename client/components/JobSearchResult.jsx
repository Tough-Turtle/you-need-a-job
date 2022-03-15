import React, {useEffect, useState} from 'react';

// import heart from '../../assets/icons/heart.svg'

export const JobSearchResult = (props) => {

  const {date_posted: datePosted, title, source, company_name: companyName, detail_url: detailUrl, location, country, state, city, description} = props.data;

  const username = props.username;

  const [favorited, setFavorited] = useState(false);

  /*
  {
    date_posted: 'Tuesday', title: 'Monkey Manager', source: 'Indeed', company_name: 'Bronx Zoo', detail_url: 'https://uniqueurl1.com', location: 'Bronx', country: 'USA', state: 'NY', city: 'NY', description: 'Must have 2 years prior zookeeping experience. Monkey whispering preferred.'
  }
  */

  const handleSelectFavorite = (e) => {
    // console.log(e)
    console.log(e.target.parentElement)
    console.log(e.target.parentElement.previousSibling.lastChild.innerText)
    console.log(e.target.parentElement.parentElement)

    const data = JSON.stringify({
      user: props.username,
      url: e.target.parentElement.previousSibling.lastChild.innerText
    });
    console.log(data)

    if (!favorited) {

      fetch('http://localhost:3001/user', {
        method: 'POST',
        header: {
          'Access-Control-Allow-Origin': "*",
          'Content-Type': 'application/json'
        },
        body: data
      }).then(res => res.json()).then(data => {
        console.log('got stuff back');
        console.log(data);
        setFavorited(true);
      })
  
    } else {
      fetch('http://localhost:3001/user', {
        method: 'DELETE',
        header: {
          'Access-Control-Allow-Origin': "*",
          'Content-Type': 'application/json'
        },
        body: data
      }).then(res => res.json()).then(data => {
        console.log('got stuff back');
        console.log(data);
        setFavorited(false);
      })
    }
 
  }
  return (
    <div className='search-result'>
      <div className='result-col'>
        <h2>Job Title</h2>
        <p>{title}</p>
        </div>
        <div className='result-col'>
        <h2>Company</h2>
        <p>{companyName}</p>
        </div>
        <div className='result-col'>
        <h2>Location</h2>
        <p>{city}, {state}</p>
        </div>
        <div className='result-col'>
        <h2>Description</h2>
        <p>{description}</p>
        </div>
        <div className='result-col'>
        <h2>Date Posted</h2>
        <p>{datePosted}</p>
        </div>
        <div className='result-col'>
        <h2>Source</h2>
        <p>{source}</p>
        </div>
        <div className='result-col'>
        <h2>URL</h2>
        <p>{detailUrl}</p>
        </div>
        <div className='result-col like-btn-container'>
        <h2>Favorite</h2>
        {/* <img src='../../assets/icons/heart.svg' width='20px'/> */}
        {!favorited ? <div className='favorite-btn' onClick={handleSelectFavorite}></div> : <div className='favorite-btn selected' onClick={handleSelectFavorite}>
        </div>}
        </div>
        
      </div>
  )

}

