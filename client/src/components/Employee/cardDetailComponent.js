import React, { useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CardImg from '../../assests/cardImg.svg';

export default function DisplayCardDetail(props) {
  const { cardDetails } = props;
  let amount = 0;
  if (cardDetails) {
    amount = cardDetails.balanceAmount;
  }

  return (
    <Grid container>
      <Grid item xl={6} lg={6} sm={12} xs={12}>
        <Typography variant="caption" display="block" gutterBottom
          style={{
            fontSize: 30, fontWeight: 500, color: "grey"
          }}>
          Card Balance
          </Typography>
        <Typography variant="caption" gutterBottom style={{ fontSize: 22, fontWeight: 800 }}>
          Amount(Rs.) : {amount}
        </Typography>
        <br />
        <br />
        <Typography color="textSecondary">
          until: {new Date().toDateString()}
        </Typography>
      </Grid>
      <Grid xl={6} lg={6} sm={12} xs={12}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img src={CardImg} alt="" style={{ width: "60%" }} />
      </Grid>
    </Grid>
  );
}
