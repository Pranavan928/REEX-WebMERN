import React from 'react';
import Report1 from '../../../assests/report1.png';
import Report2 from '../../../assests/report2.png';
import Report3 from '../../../assests/report3.png';
import Report4 from '../../../assests/report4.png';
import { Typography, Grid } from '@material-ui/core';

function Report() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">First login to your account. then you will be directed to dashboard. In navigation bar you can see a button like this. please click that..</Typography>
                <img width="75%" height="auto" src={Report1} alt="" />
                <br />
                <br />
                <Typography variant="h6">Click this button to create a new report..</Typography>
                <img width="auto" height="400px" src={Report2} alt="" />
                <br />
                <br />
                <Typography variant="h6">Then you will be directed to form like this. Then fill all the necessary input fields report and click the submit button.</Typography>
                <img width="auto" height="400px" src={Report3} alt="" />
                <br />
                <br />
                <Typography variant="h6">If your report sent successfully then you will show a alert like this.</Typography>
                <img width="auto" height="400px" src={Report4} alt="" />
            </Grid>
        </Grid>
    )
}

export default Report;