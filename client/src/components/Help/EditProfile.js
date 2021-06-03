import React from 'react';
import EditProfile1 from '../../assests/editProfile1.png';
import EditProfile2 from '../../assests/editProfile2.png';
import EditProfile3 from '../../assests/editProfile3.png';
import { Typography, Grid } from '@material-ui/core';

function EditProfile() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. Click "Avatar Icon" in the top navbar and then click "Edit Profile" button..</Typography>
                <img width="75%" height="auto" src={EditProfile1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Edit details and press "confirm" button </Typography>
                <img width="75%" height="auto" src={EditProfile2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Choose image by clicking mention button in the picture and then click "Save" button..</Typography>
                <img width="auto" height="400px" src={EditProfile3} alt="" />
            </Grid>
        </Grid>
    )
}

export default EditProfile;