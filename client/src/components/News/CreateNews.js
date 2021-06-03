import React from 'react';
import Sidenav from '../SideNav/Sidenav';
import { Box, Container } from '@material-ui/core';
import NewsForm from './NewsForm';
import Copyright from '../Footer/Footer';
import { useStyles } from '../Styles';

export default function CreateUser() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <NewsForm />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
