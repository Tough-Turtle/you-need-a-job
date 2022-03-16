import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../containers/UserProvider.jsx';
import axios from 'axios';

export const TrackedJob = props => {
  console.log('info', props.jobInfo);

  const [username, setUsername] = useContext(UserContext);

  const {
    _id,
    postDate,
    title,
    company,
    isEasyApply,
    salary,
    url,
    location,
    summary,
    note,
    date_applied: dateAppliedDB,
    status,
  } = props.jobInfo;

  const [curStatus, setCurStatus] = useState(status);
  const [dateApplied, setDateApplied] = useState(dateAppliedDB);

  console.log('curStatus', curStatus);

  const handleChangeStatus = e => {
    console.log(Date());
    // console.log(new Date());
    let date = Date();

    const newStatus = e.target.value;

    // Wed Mar 16 2022 10:56:48 GMT-0700 (Pacific Daylight Time)

    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    date = date.split(' ').slice(1, 4);

    date = `${date[2]}-${months[date[0]]}-${date[1]}`;

    console.log('curDate', date);

    console.log('new status', e.target.value);

    // setLastDate(Date());

    // if (!dateApplied) setDateApplied(date);
    console.log('dateApplied state', dateApplied);

    const data = {
      _id,
      user: username,
      status: e.target.value,
      date_applied: date,
    };

    axios({
      method: 'PATCH',
      url: 'http://localhost:3001/user',
      data: data,
    })
      .then(res => {
        if (res.status === 200) {
          setCurStatus(newStatus);
          if (!dateApplied) setDateApplied(date);
        }
      })
      .catch(err => console.log('error', err));

    // fetch('/user', {
    //   method: 'PATCH',
    //   header: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   body: data,
    // });
  };

  return (
    <div className="search-result favorite-job-result">
      <div className="result-col">
        <h4>Job Title</h4>
        <p>{title}</p>
      </div>
      <div className="result-col">
        <h4>Company</h4>
        <p>{company}</p>
      </div>
      <div className="result-col">
        <h4>Location</h4>
        <p>{location}</p>
      </div>
      <div className="result-col">
        <h4>Description</h4>
        <p>{summary}</p>
      </div>
      <div className="result-col">
        <h4>Salary</h4>
        <p>{salary}</p>
      </div>
      <div className="result-col">
        <h4>Easy Apply</h4>
        <p>{isEasyApply ? 'Yes' : 'No'}</p>
      </div>
      <div className="result-col">
        <h4>Date Posted</h4>
        <p>{postDate}</p>
      </div>
      <div className="result-col">
        <h4>URL</h4>
        <a href={url} target="_blank">
          Link
        </a>
      </div>
      <div className="result-col">
        <h4>Status</h4>
        {/* <p>{status}</p> */}
        <label className="status-header">
          Application Status
          <select value={curStatus} onChange={handleChangeStatus}>
            <option value="none" selected>
              {curStatus}
            </option>
            <option value="not-applied">Not Applied</option>
            <option value="applied">Applied</option>
            <option value="phone-sceen">Phone Screen</option>
            <option value="technical">Technical</option>
            <option value="onsite">Onsite</option>
            <option value="sdi">SDI</option>
            <option value="recieved-offer">Recieved Offer</option>
            <option value="declined-offer">Declined Offer</option>
            <option value="accepted-offer">Accepted Offer</option>
          </select>
        </label>
      </div>
      <div className="result-col">
        <h4>Date Applied</h4>
        <p>{dateApplied ? dateApplied.split('').splice(0, 10).join('') : 'Not Yet Applied'}</p>
      </div>
      <div className="result-col">
        <h4>Notes</h4>
        <p>{note}</p>
      </div>
    </div>
  );
};
