import React, { useState, createContext } from 'react';
import axios from 'axios';

export const ReimbursementContext = createContext();

export const ReimbursementContextProvider = function (props) {
  const [reimbursements, setReimbursements] = useState();

  const getEmployeeReimbursement = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/reimbursementTo', config)
      .then((response) => {
        setReimbursements(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  const getManagerReimbursement = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/reimbursementBy', config)
      .then((response) => {
        setReimbursements(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  const getAllReimbursement = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/allReimbursement', config)
      .then((response) => {
        setReimbursements(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  return (
    <ReimbursementContext.Provider
      value={{
        reimbursements,
        getEmployeeReimbursement,
        getManagerReimbursement,
        getAllReimbursement,
      }}
    >
      {props.children}
    </ReimbursementContext.Provider>
  );
};
