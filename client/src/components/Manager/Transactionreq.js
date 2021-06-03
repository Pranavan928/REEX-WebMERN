import React from 'react';
import Sidenav from '../SideNav/Sidenav';
import TransactionTab from './TransactionTab';   
import { Box, Container } from '@material-ui/core';
import Copyright from '../Footer/Footer';
import { useStyles } from '../Styles';

export default function Transactionreq() {
    const classes = useStyles();

  return (

    <div className={classes.root}>
        <Sidenav/>
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <TransactionTab/>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>

    
  );
}
