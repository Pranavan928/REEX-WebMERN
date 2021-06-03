import React, { useState, createContext } from 'react';
import axios from 'axios';

export const ReportsContext = createContext();

export const ReportsContextProvider = function (props) {
  const [receivedReports, setReceivedReports] = useState();
  const [sentReports, setSentReports] = useState();

  const getReceivedReports = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/reportReceiver', config)
      .then((response) => {
        setReceivedReports(response.data);
      })
      .catch((err) => {
        console.log('Unable to get Received Reports');
      });
  };

  const getSentReports = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/reportSender', config)
      .then((response) => {
        setSentReports(response.data);
      })
      .catch((err) => {
        console.log('Unable to get sent reports');
      });
  };

  return (
    <ReportsContext.Provider
      value={{
        getSentReports,
        sentReports,
        getReceivedReports,
        receivedReports,
      }}
    >
      {props.children}
    </ReportsContext.Provider>
  );
};
