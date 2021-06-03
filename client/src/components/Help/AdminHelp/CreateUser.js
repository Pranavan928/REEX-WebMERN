import React from 'react';
import CreateUser1 from '../../../assests/createUser1.png';
import CreateUser2 from '../../../assests/createUser2.png';
import CreateUser3 from '../../../assests/createUser3.png';
import { Typography, Grid } from '@material-ui/core';

function CreateUser() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. Click "Create User" Button..</Typography>
                <img width="75%" height="auto" src={CreateUser1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Enter the user details and then press "submit" button </Typography>
                <img width="75%" height="auto" src={CreateUser2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Then Press Submit you will noticed a success message, shown in the picture..</Typography>
                <img width="auto" height="400px" src={CreateUser3} alt="" />
            </Grid>
        </Grid>
    )
}

export default CreateUser;