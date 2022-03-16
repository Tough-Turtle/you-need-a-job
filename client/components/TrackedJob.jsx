import React, { useState, useContext, useEffect } from 'react';

export const TrackedJob = props => {
  console.log(props.jobInfo);

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
    date_apply: dateApply,
    status,
  } = props.jobInfo;

  const [curStatus, setCurStatus] = useState(status);
  const [lastDate, setLastDate] = useState(dateApply);

  console.log('curStatus', curStatus);

  const handleChangeStatus = e => {
    console.log(e.target.value);
    setCurStatus(e.target.value);
    setLastDate(Date.now().toDateString());
  };

  return (
    <div className="search-result favorite-job-result">
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
      <div className="result-col">
        <h2>Status</h2>
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
        <h2>Date Applied</h2>
        <p>{lastDate}</p>
      </div>
      <div className="result-col">
        <h2>Notes</h2>
        <p>{note}</p>
      </div>
    </div>
  );
};
