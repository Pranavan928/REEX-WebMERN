import React, { useState, createContext } from 'react';
import axios from 'axios';

export const TopupContext = createContext();

export const TopupContextProvider = function (props) {
  const [topups, setTopups] = useState();

  const getManagerTopups = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/topUpRequestReceived', config)
      .then((response) => {
        setTopups(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  const getEmployeeTopups = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/topUpRequestSended', config)
      .then((response) => {
        setTopups(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  const getAllTopups = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/allTopUpRequests', config)
      .then((response) => {
        setTopups(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  return (
    <TopupContext.Provider
      value={{ topups, getEmployeeTopups, getManagerTopups, getAllTopups }}
    >
      {props.children}
    </TopupContext.Provider>
  );
};
