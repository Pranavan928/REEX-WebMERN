import React from 'react';
import { Box, Container } from '@material-ui/core';
import Sidenav from '../SideNav/Sidenav';
import ReimbursementTab from './ReimbursementTab';
import Copyright from '../Footer/Footer';
import { useStyles } from '../Styles';

export default function Topupreq() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ReimbursementTab />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
