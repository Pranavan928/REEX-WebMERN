import React from 'react';
import Sidenav from '../SideNav/Sidenav';
import { Box, Container, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Copyright from '../Footer/Footer';
import CardView from './CardView';
import { useStyles } from '../Styles';
import '../../App.css';

export default function History() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container style={{ paddingBottom: '20px' }}>
            <Grid xs={12} sm={4}></Grid>
            <Grid xs={12} sm={4}>
              {/* <div className="staff-search">
                <input type="text" style={{ backgroundColor: '#fefefe' }} />
                <SearchIcon />
              </div> */}
            </Grid>
            <Grid xs={12} sm={4}></Grid>
          </Grid>
          <CardView />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
