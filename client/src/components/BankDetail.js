import React from 'react';
import Sidenav from './SideNav/Sidenav';
import Container from '@material-ui/core/Container';
import BankDetailForm from './BankDetailForm';
import {useStyles} from './Styles';

export default function NewsPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <BankDetailForm />
        </Container>
      </main>
    </div>
  );
}
