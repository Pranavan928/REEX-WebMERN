import React from 'react';
import CreateNews1 from '../../../assests/createNews1.png';
import CreateNews2 from '../../../assests/createNews2.png';
import CreateNews3 from '../../../assests/createNews3.png';
import { Typography, Grid } from '@material-ui/core';

function CreateNews() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. Click "Create News" Button..</Typography>
                <img width="75%" height="auto" src={CreateNews1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Enter the news title, News, viewers, Start display on, End Display on details </Typography>
                <img width="75%" height="auto" src={CreateNews2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Then Press Submit you will noticed a success message, shown in the picture..</Typography>
                <img width="auto" height="400px" src={CreateNews3} alt="" />
            </Grid>
        </Grid>
    )
}

export default CreateNews;