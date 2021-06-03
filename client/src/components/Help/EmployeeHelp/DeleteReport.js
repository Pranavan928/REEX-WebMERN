import React from 'react';
import Delete1 from '../../../assests/delete1.png';
import Delete2 from '../../../assests/delete2.png';
import { Typography, Grid } from '@material-ui/core';

function DeleteReport() {
    return (
        <Grid container>
            <Grid xs={12} sm={12}>
                <Typography variant="h6">If you want to delete a report which s sent by you permanently for everyone. then click the following button...</Typography>
                <img width="75%" height="auto" src={Delete1} alt="" />
                <br />
                <br />
                <Typography variant="h6">If your report deleted successfully then you will show a alert like this...</Typography>
                <img width="auto" height="400px" src={Delete2} alt="" />
            </Grid>
        </Grid>
    )
}

export default DeleteReport;