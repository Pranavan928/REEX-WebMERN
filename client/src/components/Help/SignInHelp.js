import React from 'react';
import SignIN1 from '../../assests/SignIN1.jpg';
import SignIN2 from '../../assests/SignIN2.jpg';
import { Typography, Grid, Link } from '@material-ui/core';
import Logo from '../../assests/logoReEx.png';

function SignInHelp() {
    return (
        <div style={{ padding: 20 }}>
            <Grid container style={{marginBottom:"40px"}}>
                <Grid xs={12} sm={1}></Grid>
                <Grid xs={12} sm={10}>
                    <img src={Logo} alt="" style={{ width: 100 }} />
                </Grid>
                <Grid xs={12} sm={1}>
                    <Link href="/login" style={{textDecoration:"none", fontWeight:500}}>Login</Link>
                </Grid>
            </Grid>
            <Grid container>
                <Grid xs={12} sm={1}></Grid>
                <Grid xs={12} sm={10}>
                    <Typography variant="h6">For sign in, first enter your "User Id" and "Password" then press "LOG IN" button. for future easy login tick "Remember me".</Typography>
                    <img width="auto" height="400px" src={SignIN1} alt="" />
                    <br />
                    <Typography variant="h6">Steps Here</Typography>
                    <img width="auto" height="400px" src={SignIN2} alt="" />
                </Grid>
                <Grid xs={12} sm={1}></Grid>
            </Grid>
        </div>
    )
}

export default SignInHelp;