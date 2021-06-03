import React from 'react';
import Reimburse1 from '../../../assests/reimburse1.png';
import Reimburse2 from '../../../assests/reimburse2.png';
import Reimburse3 from '../../../assests/reimburse3.png';
import { Typography, Grid } from '@material-ui/core';

function Reimbusement() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. In navigation bar you can see a button like this. please click that..</Typography>
                <img width="75%" height="auto" src={Reimburse1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click this button to View the expense details spent by cash..</Typography>
                <img width="auto" height="400px" src={Reimburse2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click the Back button to return Reimbursement table</Typography>
                <img width="auto" height="400px" src={Reimburse3} alt="" />
            </Grid>
        </Grid>
    )
}

export default Reimbusement;