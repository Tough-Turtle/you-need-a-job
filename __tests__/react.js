/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { screen } from '@testing-library/react';


import { JobSearchResult } from '../client/components/JobSearchResult';
import DataTable from '../client/components/DataTable';
import { TrackedJob } from '../client/components/TrackedJob';

describe('Unit Testing React Components', () => {
  describe('JobSearchResult', () => {
    let result;
    const data = {
      title: 'SDE',
      postDate: 'One day ago',
      company: 'Nexus',
      isEasyApply: true,
      salary: '150k',
      url: 'www.nexus-js.com',
      location: 'Toronto',
      summary: 'summary....'     
    }

    beforeAll(() => {
      result = render(<JobSearchResult data={data} />);
    });

    test('Render passed in props', () => {
      expect(result.getByText("Job Title").nextSibling).toHaveTextContent(data.title);
      expect(result.getByText("Company").nextSibling).toHaveTextContent(data.company);
      expect(result.getByText("Location").nextSibling).toHaveTextContent(data.location);
      expect(result.getByText("Description").nextSibling).toHaveTextContent(data.summary);
      expect(result.getByText("Salary").nextSibling).toHaveTextContent(data.salary);
      expect(result.getByText("Easy Apply").nextSibling).toHaveTextContent('Yes');
      
      // expect(result.getByText('Job Title').nextSibling).toHaveTextContent('SDE');
    });

  });

  describe('My Applications Component', () => {
    let dataTable;
    const jobsInDB = [
      {
        _id: 1,
      postDate: 'just posted',
      title: 'SDE',
      company: 'Spotify',
      isEasyApply: 'No',
      salary: 200000,
      url: 'www.google.com',
      location: 'nyc',
      summary: 'listening to good playlists all day',
      note: '',
      date_applied: false,
      status: '',    
      },
      {
        _id: 1,
        postDate: 'just posted',
        title: 'SDE2',
        company: 'Spotify',
        isEasyApply: 'No',
        salary: 200000,
        url: 'www.google.com',
        location: 'nyc',
        summary: 'listening to good playlists all day',
        note: '',
        date_applied: '',
        status: '',  
      },
      {
        _id: 1,
        postDate: 'just posted',
        title: 'SDE3',
        company: 'Spotify',
        isEasyApply: 'No',
        salary: 200000,
        url: 'www.google.com',
        location: 'nyc',
        summary: 'listening to good playlists all day',
        note: '',
        date_applied: '',
        status: '',
      }
    ];

    // beforeEach(() => {
    //   dataTable = render(<DataTable jobs = {jobsInDB}/>)
    // });

    test('renders correct number of jobs', () => {
      render(<DataTable data = {jobsInDB}/>)
      expect(screen.findAllByRole('article').length).toEqual(jobsInDB.length);
    })
  })
});
