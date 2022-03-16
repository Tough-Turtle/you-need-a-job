import React, { useState, useContext, useEffect } from 'react';

export const TrackedJob = props => {
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
  } = props.data;
};
