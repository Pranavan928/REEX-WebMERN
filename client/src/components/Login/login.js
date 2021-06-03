import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { AuthTokenContext } from '../../context/AuthTokenContext';
import { LoginFailed } from '../layouts/Alert';
import { Paper, Grid } from '@material-ui/core';
import { Col, Row} from 'reactstrap';
import LoginBg from '../Login/Secure-login.gif';

function SignIn(props) {
  const [loginData, setLoginData] = useState({
    userId: '',
    password: '',
  });

  const { login, loginStatus } = useContext(AuthTokenContext);

  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(loginData);
    if (localStorage.getItem('token')) {
      props.history.push('/Dashboard');
      console.log('Login Success ... ');
    }
  };

  if (localStorage.getItem('token')) {
    return <Redirect to={'/dashboard'} />;
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Row>
      <Col xs={12} sm={6}>
        <img style={{position:"fixed", height:'90%'}} src={LoginBg} />
      </Col>
      <Col xs={12} sm={6} style={{ paddingTop: 100 }}>
      <Paper elevation={6}>
        <div className="container" style={{ padding: 30 }}>
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: 'center' }}
          >
            Log in
          </Typography>
          {loginStatus === 'fail' ? <LoginFailed /> : null}
          <form onSubmit={(e) => onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User Id"
              name="userId"
              autoFocus
              onChange={(e) => onChange(e)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => onChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Log in
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/helps" variant="body2">
                  {'Have any trouble'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Paper>
      </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
