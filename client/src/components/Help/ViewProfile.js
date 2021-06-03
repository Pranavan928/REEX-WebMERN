import React from 'react';
import ViewProfile1 from '../../assests/viewProfile1.png';
import ViewProfile2 from '../../assests/viewProfile2.png';
import ViewProfile3 from '../../assests/viewProfile3.png';
import { Typography, Grid } from '@material-ui/core';

function ViewProfile() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. Click "Avatar Icon" in the top navbar..</Typography>
                <img width="75%" height="auto" src={ViewProfile1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click "View Profile" button </Typography>
                <img width="75%" height="auto" src={ViewProfile2} alt="" />
                <br />
                <br />
                <Typography variant="h6">You will see a sample page as in the picture with your personal details..</Typography>
                <img width="auto" height="400px" src={ViewProfile3} alt="" />
            </Grid>
        </Grid>
    )
}

export default ViewProfile;