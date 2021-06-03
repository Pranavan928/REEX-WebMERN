import React from 'react';
import Sidenav from './SideNav/Sidenav';
import Container from '@material-ui/core/Container';
import EditProfileForm from './EditProfileForm';
import {useStyles} from './Styles';

export default function NewsPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <EditProfileForm />
        </Container>
      </main>
    </div>
  );
}
