import React from 'react';
import { Grid, Button } from '@material-ui/core';
import Iconimg from './Login/regi.png';
import sampleImage1 from './Login/Payment Information-bro (1).png';
import { Link } from 'react-router-dom';

export default function Landn() {
  return (
    <div className="container">
      <Grid container style={{ minHeight: '' }}>
        <Grid
          item
          xs={12}
          sm={6}
          container
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
          <div>
            <img
              src={Iconimg}
              alt="logo"
              width={100}
              height={80}
              style={{ margin: 10 }}
            />

            <div style={{ marginBottom: 160, marginTop: 60 }}>
              <p style={{ fontSize: 40 }}>
                <b>Welcome to</b>
              </p>
              <p style={{ fontSize: 32 }}>
                <b>Receipt & Expense Management System</b>
              </p>
              <p style={{ fontSize: 20 }}>
                Best place for managing your expenses.
              </p>
              <Button variant="contained" color="primary">
                <Link
                  style={{ color: '#fff', textDecoration: 'none' }}
                  to="/Login"
                >
                  Log In
                </Link>
              </Button>
            </div>
          </div>
          <div />
        </Grid>

        <Grid
          container
          xs={12}
          sm={6}
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 10 }}
        >
          <div />
          <div>
            <Grid container justify="center">
              <img
                className="container"
                src={sampleImage1}
                alt="logo"
                width={400}
                height={500}
              />
            </Grid>
          </div>
          <div />
        </Grid>
      </Grid>
    </div>
  );
}
