import React, { useEffect, useContext, useState } from 'react';
import EmployeeStaffCard from './EmployeeCard';
import { Grid } from '@material-ui/core';
import { GetUsersContext } from '../../context/GetUsersContext';
import SearchIcon from '@material-ui/icons/Search';
import Gif from '../../assests/gif.gif';

const Content = () => {
  const { employees, getEmployees } = useContext(GetUsersContext);
  const [searchItem, setSearchItem] = useState('');

  useEffect(async () => {
    await getEmployees();
  }, []);

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + month + '-' + year;
    return correctDate;
  };

  const employeeDetails = [];

  if (employees) {
    employees.map((employee) => {
      const dataa = {
        name: employee.name,
        role: employee.role,
        gender: employee.gender,
        dateOfBirth: getDate(employee.dateOfBirth),
        mobileNumber: employee.mobileNumber,
        email: employee.email,
        userId: employee.userId,
        profilePicture: employee.profilePictureUrl,
      };
      employeeDetails.push(dataa);
    });
  }

  const getStaffCard = (staffObj) => {
    return (
      <Grid item xs={12} md={6} sm={12}>
        <EmployeeStaffCard {...staffObj} />
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
      {!employees ?
        <Grid container style={{ textAlign: "center" }}>
          <Grid xs={12} sm={4}></Grid>
          <Grid xs={12} sm={4}>
            <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
          </Grid>
          <Grid xs={12} sm={4}></Grid>
        </Grid> :
        <Grid container spacing={2}>
          {employeeDetails
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
