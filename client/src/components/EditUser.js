import React, { useEffect, useContext } from 'react';
import Sidenav from '../components/SideNav/Sidenav';
import { Box, Container } from '@material-ui/core';
import EditUserForm from './EditUserForm';
import Copyright from '../components/Footer/Footer';
import { GetUsersContext } from '../context/GetUsersContext';
import { useStyles } from './Styles';

export default function CreateUser(props) {
  const classes = useStyles();
  let editUserId = props.match.params.userId;

  const { selectedUser, getSelectedUser } = useContext(GetUsersContext);

  useEffect(() => {
    getSelectedUser(editUserId);
  }, []);

  return (
    <div className={classes.root}>
      <Sidenav />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <EditUserForm selectedUser={selectedUser} />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
