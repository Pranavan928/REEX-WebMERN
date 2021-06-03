import React, { useState, createContext } from 'react';
import axios from 'axios';

export const BankDetailsContext = createContext();

export const BankDetailsContextProvider = function (props) {
  const [bankDetails, setBankDetails] = useState();
  const [allBankDetails, setAllBankDetails] = useState();

  const getUserBankDetails = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/bankDetail', config)
      .then((response) => {
        setBankDetails(response.data);
      })
      .catch((err) => {
        console.log('Unable to get Bank Details');
      });
  };

  const getAllBankDetails = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/allBankDetails', config)
      .then((response) => {
        setAllBankDetails(response.data);
      })
      .catch((err) => {
        console.log('Unable to get All Bank Details');
      });
  };

  return (
    <BankDetailsContext.Provider
      value={{
        bankDetails,
        getUserBankDetails,
        getAllBankDetails,
        allBankDetails,
      }}
    >
      {props.children}
    </BankDetailsContext.Provider>
  );
};
