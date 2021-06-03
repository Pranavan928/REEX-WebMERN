import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const GetUsersContext = createContext();

export const GetUsersContextProvider = function (props) {
  const [managers, setManagers] = useState();
  const [employees, setEmployees] = useState();
  const [allUsers, setAllUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();

  const getSelectedUser = async (userId) => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    let url = 'http://localhost:3000/user/' + userId;
    await axios
      .get(url, config)
      .then((response) => {
        setSelectedUser(response.data);
      })
      .catch((err) => {
        console.log('Unable to get Selected User');
      });
  };

  const getAllUsers = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get('http://localhost:3000/getallusers', config)
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.log('Unable...');
      });
  };

  const getEmployees = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get('http://localhost:3000/getallemployee', config)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => {
        console.log('Unable...');
      });
  };

  const reloadUser = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get('http://localhost:3000/users/me', config)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log('Unable to Update');
      });
  };

  const getManagers = async () => {
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get('http://localhost:3000/getallmanager', config)
      .then((response) => {
        setManagers(response.data);
      })
      .catch((err) => {
        console.log('Unable...');
      });
  };

  return (
    <GetUsersContext.Provider
      value={{
        getManagers,
        managers,
        employees,
        getEmployees,
        allUsers,
        getAllUsers,
        reloadUser,
        getSelectedUser,
        selectedUser,
      }}
    >
      {props.children}
    </GetUsersContext.Provider>
  );
};
