import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const JobSearchResult = props => {
  const { postDate, title, company, isEasyApply, salary, url, location, summary } = props.data;

  const [favorited, setFavorited] = useState(false);

  const handleSelectFavorite = e => {
    //  url: e.target.parentElement.previousSibling.lastChild.innerText

    const data = {
      title,
      summary,
      url,
      company,
      postDate,
      salary,
      isEasyApply,
      user: props.username,
    };

    console.log('body data in handle select favorite', data);

    if (!favorited) {
      axios({
        method: 'POST',
        url: 'http://localhost:3001/user',
        data: data,
      })
        .then(res => {
          if (res.status === 200) setFavorited(true);
        })
        .catch(err => console.log('ERROR: ', err));
    } else {
      setFavorited(false);
    }

    // if (!favorited) {
    //   fetch('http://localhost:3001/user', {
    //     // mode: 'no-cors',
    //     method: 'POST',
    //     header: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //     },
    //     body: data,
    //   })
    //     .then(res => res.json())
    //     .then(data => {
    //       console.log('got stuff back');
    //       console.log(data);
    //       setFavorited(true);
    //     })
    //     .catch(err => console.log('ERROR: ', err));
    // } else {
    //   // fetch('http://localhost:3001/user', {
    //   //   method: 'DELETE',
    //   //   header: {
    //   //     'Access-Control-Allow-Origin': '*',
    //   //     'Content-Type': 'application/json',
    //   //   },
    //   //   body: data,
    //   // })
    //   //   .then(res => res.json())
    //   //   .then(data => {
    //   //     console.log('got stuff back');
    //   //     console.log(data);
    //   setFavorited(false);
    // }
  };
  return (
    <div className="search-result">
      <div className="result-col">
        <h2>Job Title</h2>
        <p>{title}</p>
      </div>
      <div className="result-col">
        <h2>Company</h2>
        <p>{company}</p>
      </div>
      <div className="result-col">
        <h2>Location</h2>
        <p>{location}</p>
      </div>
      <div className="result-col">
        <h2>Description</h2>
        <p>{summary}</p>
      </div>
      <div className="result-col">
        <h2>Salary</h2>
        <p>{salary}</p>
      </div>
      <div className="result-col">
        <h2>Easy Apply</h2>
        <p>{isEasyApply ? 'Yes' : 'No'}</p>
      </div>
      <div className="result-col">
        <h2>Date Posted</h2>
        <p>{postDate}</p>
      </div>

      <div className="result-col">
        <h2>URL</h2>
        <p>{url}</p>
      </div>
      <div className="result-col like-btn-container">
        <h2>Favorite</h2>
        {/* <img src='../../assets/icons/heart.svg' width='20px'/> */}
        {!favorited ? (
          <div className="favorite-btn" onClick={handleSelectFavorite}></div>
        ) : (
          <div className="favorite-btn selected" onClick={handleSelectFavorite}></div>
        )}
      </div>
    </div>
  );
};
