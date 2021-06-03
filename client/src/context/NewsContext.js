import React, { useState } from 'react';
import axios from 'axios';

export const NewsContext = React.createContext();

export const NewsContextProvider = function (props) {
  const [news, setNews] = useState();

  const getAllNews = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get('http://localhost:3000/news', config)
      .then((response) => {
        setNews(response.data);
      })
      .catch((err) => {
        console.log('Unable access ...');
      });
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        getAllNews,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};
