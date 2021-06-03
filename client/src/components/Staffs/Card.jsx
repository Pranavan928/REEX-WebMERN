import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Divider, Grid, Paper, makeStyles } from '@material-ui/core';
import { Row } from 'react-bootstrap';

const StaffCard = (props) => {
  const {
    name,
    role,
    dateOfBirth,
    gender,
    profilePicture,
    userId,
    email,
    mobileNumber,
  } = props;

  let directTo = '/ViewUser/' + userId;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1600,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    // status: {
    //   color: payment
    // }
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {name}
                </Typography>
                <Grid
                  className="tags"
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Row>
                    <img
                      src={profilePicture}
                      alt="profile pic"
                      style={{
                        width: 'auto',
                        height: 40,
                        borderRadius: '50%',
                      }}
                    />
                    <div
                      style={{
                        fontSize: 15,
                        width: 100,
                        marginLeft: 10,
                      }}
                    >
                      {email}
                      <br />
                      {mobileNumber}
                      <div
                        style={{
                          fontSize: 10,
                          width: 100,
                        }}
                      >
                        {gender}
                      </div>
                    </div>
                  </Row>
                </Grid>
                <br />
                <Typography variant="body2" gutterBottom>
                  <div className={classes.status} style={{ color: '#1278B8' }}>
                    {' '}
                    {role}
                  </div>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Divider orientation="vertical" />
            </Grid>
            <br />
            <Grid
              item
              style={{
                marginInlineStart: 5,
                backgroundColor: '#fafafa',
                borderRadius: 15,
                marginRight: 5,
                marginLeft: 5,
              }}
            >
              <br />

              <Typography
                variant="h6"
                style={{
                  color: 'gray',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                ID: {userId}
              </Typography>

              <Typography
                variant="subtitle2"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                DOB: {dateOfBirth}
              </Typography>
              <br />
              <br />
              <Grid align="center">
                <Button size="small">
                  {' '}
                  <Link
                    style={{ textDecoration: 'none', color: 'green' }}
                    to={directTo}
                  >
                    View
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default StaffCard;
