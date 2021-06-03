import React from 'react';
import Sidenav from './SideNav/Sidenav';
import Tab from './Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Copyright from './Footer/Footer';
import { useStyles } from './Styles';

export default function History() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Tab />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
