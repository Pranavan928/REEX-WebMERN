import React from 'react';
import Received1 from '../../../assests/received1.jpeg';
import Received2 from '../../../assests/received2.jpeg';
import { Typography, Grid } from '@material-ui/core';

function ReceivedReport() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">Click here to check received reports for you...</Typography>
                <img width="75%" height="auto" src={Received1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Then the received reports will be shown as follows..</Typography>
                <img width="auto" height="400px" src={Received2} alt="" />
            </Grid>
        </Grid>
    )
}

export default ReceivedReport;