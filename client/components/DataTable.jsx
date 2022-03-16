import React from 'react';
import { TrackedJob } from './TrackedJob.jsx';

const DataTable = props => {
  const jobs = props.data.map(job => {
    <TrackedJob jobInfo={job} />;
  });

  return (
    <div>
      <h2>Data Table</h2>
      {jobs}
    </div>
  );
};

export default DataTable;
