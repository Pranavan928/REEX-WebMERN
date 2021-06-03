import React, { useState, createContext } from 'react';
import axios from 'axios';

export const CardDetailsContext = createContext();

export const CardDetailsContextProvider = function (props) {
  const [cardDetails, setCardDetails] = useState();
  // const [allBankDetails, setAllBankDetails] = useState();

  const getUserCardDetails = async (id) => {
    const token = localStorage.getItem('token');
    let url = 'http://localhost:3000/cardBalance/' + id;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(url, config)
      .then((response) => {
        setCardDetails(response.data);
      })
      .catch((err) => {
        console.log('Unable to get Card Details');
      });
  };

  return (
    <CardDetailsContext.Provider
      value={{
        cardDetails,
        getUserCardDetails,
      }}
    >
      {props.children}
    </CardDetailsContext.Provider>
  );
};
