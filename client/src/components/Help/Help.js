import React from 'react';
import Sidenav from '../SideNav/Sidenav';
import Container from '@material-ui/core/Container';
import HelpDetails from './HelpDetails';
import {useStyles} from '../Styles';

// .................Help sections.....................

export default function NewsPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <HelpDetails />
        </Container>
      </main>
    </div>
  );
}
