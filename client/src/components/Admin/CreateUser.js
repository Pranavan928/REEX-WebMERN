import React from 'react';
import Sidenav from '../SideNav/Sidenav';
import { Box, Container } from '@material-ui/core';
import CreateUserForm from './CreateUserForm';
import Copyright from '../Footer/Footer';
import { useStyles } from '../../components/Styles';

export default function CreateUser() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <CreateUserForm />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
