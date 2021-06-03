import React, { useEffect, useContext, useState } from 'react';
import StaffCard from './Card';
import { Grid } from '@material-ui/core';
import { GetUsersContext } from '../../context/GetUsersContext';
import SearchIcon from '@material-ui/icons/Search';
import Gif from '../../assests/gif.gif'
import '../../App.css';

const Content = () => {
  const { allUsers, getAllUsers } = useContext(GetUsersContext);
  const [searchItem, setSearchItem] = useState('');

  useEffect(async () => {
    await getAllUsers();
  }, []);

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + month + '-' + year;
    return correctDate;
  };

  const usersDetails = [];

  if (allUsers) {
    allUsers.map((user) => {
      const data = {
        name: user.name,
        role: user.role,
        gender: user.gender,
        dateOfBirth: getDate(user.dateOfBirth),
        mobileNumber: user.mobileNumber,
        email: user.email,
        userId: user.userId,
        profilePicture: user.profilePictureUrl,
      };
      usersDetails.push(data);
    });
  }

  const getStaffCard = (staffObj) => {
    return (
      <Grid item xs={12} md={6} sm={12}>
        <StaffCard {...staffObj} />
      </Grid>
    );
  };

  return (
    <div>
      <Grid container>
        <Grid xs={12} sm={4}></Grid>
        <Grid xs={12} sm={4}>
          <div className="staff-search">
            <input
              type="text"
              style={{ backgroundColor: '#fefefe' }}
              onChange={(event) => {
                setSearchItem(event.target.value);
              }}
            />
            <SearchIcon />
          </div>
        </Grid>
        <Grid xs={12} sm={4}></Grid>
      </Grid>
      {!allUsers ?
        <Grid container style={{textAlign:"center"}}>
          <Grid xs={12} sm={4}></Grid>
          <Grid xs={12} sm={4}>
            <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
          </Grid>
          <Grid xs={12} sm={4}></Grid>
        </Grid>
        :
        <Grid container spacing={2}>
          {usersDetails
            .filter((value) => {
              if (searchItem === '') {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchItem.toLowerCase())
              ) {
                return value;
              }
            })
            .map((staffObj) => getStaffCard(staffObj))}
        </Grid>}
    </div>
  );
};

export default Content;
