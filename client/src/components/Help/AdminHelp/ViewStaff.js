import React from 'react';
import ViewStaff1 from '../../../assests/viewStaff1.png';
import ViewStaff2 from '../../../assests/viewStaff2.png';
import ViewStaff3 from '../../../assests/viewStaff3.png';
import { Typography, Grid } from '@material-ui/core';

function ViewStaff() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. In navigation bar you can see a button like this. please click that..</Typography>
                <img width="75%" height="auto" src={ViewStaff1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Press the "View" button to view the user details </Typography>
                <img width="75%" height="auto" src={ViewStaff2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Then Press "Personal Detail" from to view the details of staffs</Typography>
                <img width="auto" height="400px" src={ViewStaff3} alt="" />
            </Grid>
        </Grid>
    )
}

export default ViewStaff;