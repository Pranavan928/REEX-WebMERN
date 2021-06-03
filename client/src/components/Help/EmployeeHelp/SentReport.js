import React from 'react';
import Sent1 from '../../../assests/sent1.png';
import Sent2 from '../../../assests/sent2.png';
import { Typography, Grid } from '@material-ui/core';

function SentReport() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">Click here to check sent reports for you..</Typography>
                <img width="75%" height="auto" src={Sent1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Then the sent reports will be shown as follows..</Typography>
                <img width="auto" height="400px" src={Sent2} alt="" />
            </Grid>
        </Grid>
    )
}

export default SentReport;