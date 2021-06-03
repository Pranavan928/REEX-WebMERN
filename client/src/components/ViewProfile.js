import React, { useContext, useEffect } from 'react';
import Sidenav from '../components/SideNav/Sidenav';
import {Box,Container} from '@material-ui/core';
import ViewProfileForm from './ViewProfileForm';
import Copyright from '../components/Footer/Footer';
import { BankDetailsContext } from '../context/BankDetailsContext';
import {useStyles} from './Styles';

export default function CreateUser() {
  const classes = useStyles();

  const { bankDetails, getUserBankDetails } = useContext(BankDetailsContext);

  useEffect(() => {
    getUserBankDetails();
  }, []);

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <ViewProfileForm bankDetails={bankDetails} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
