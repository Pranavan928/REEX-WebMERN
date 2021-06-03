import React from 'react';
import History0 from '../../../assests/history0.png';
import History1 from '../../../assests/history1.png';
import History2 from '../../../assests/history2.png';
import History3 from '../../../assests/history3.png';
import { Typography, Grid } from '@material-ui/core';

function History() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. In navigation bar you can see a button like this. please click that..</Typography>
                <img width="75%" height="auto" src={History0} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click the Expense tab to view expense history</Typography>
                <img width="75%" height="auto" src={History1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click this button to View the expense receipt..</Typography>
                <img width="auto" height="400px" src={History2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click the Topup tab to view topup history</Typography>
                <img width="auto" height="400px" src={History3} alt="" />
            </Grid>
        </Grid>
    )
}

export default History;