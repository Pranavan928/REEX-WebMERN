import React, { useState, useEffect, useContext } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Grid} from '@material-ui/core';
import Gif from '../assests/gif.gif';

export default function TopupTable(props) {
  const { managers, topups } = props;

  const columns = [
    { field: 'createdAt', headerName: 'Requested Date', width: 160 },
    { field: 'managerName', headerName: 'Manager Name', width: 151 },
    {
      field: 'amount',
      headerName: 'Amount',
      // type: 'number',
      width: 130,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
  ];

  const getDate = (realDate) => {
    const datee = new Date(realDate);
    const year = datee.getUTCFullYear();
    const month = datee.getUTCMonth();
    const date = datee.getUTCDate();
    const correctDate = date + '-' + month + '-' + year;
    return correctDate;
  };

  const getManagerName = (id) => {
    let manager = managers.find((m) => m._id === id);
    return manager.name;
  };

  const details = [];
  if (topups && managers) {
    topups.map((topup) => {
      const data = {
        id: topup._id,
        createdAt: getDate(topup.createdAt),
        managerName: getManagerName(topup.requestTo),
        amount: topup.amount,
        status: topup.status,
      };
      details.push(data);
    });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h3>Topup-Request History</h3>
      {details.length > 0 ?
      <DataGrid rows={details.reverse()} columns={columns} pageSize={5} />
      :
      <Grid container style={{textAlign:"center"}}>
      <Grid xs={12} sm={4}></Grid>
      <Grid xs={12} sm={4}>
        <img src={Gif} alt="" style={{ alignItems: "center", paddingTop: 50, paddingBottom: 100 }} />
      </Grid>
      <Grid xs={12} sm={4}></Grid>
    </Grid>}
    </div>
  );
}
