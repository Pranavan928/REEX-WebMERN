import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Popover, Typography, Button, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AuthTokenContext } from '../context/AuthTokenContext';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function ProfileCircle(props) {
  let history = useHistory();
  const { logout } = useContext(AuthTokenContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  var currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <AccountCircleIcon onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography
          style={{ width: 150, padding: 12, fontFamily: "Montserrat" }}
          className={classes.typography}
        >
          <p style={{ paddingLeft: 5 }}>
            {currentUser.name}
            <br />
            <span style={{ fontSize: 14 }}>{currentUser.role}</span>
          </p>
          <Button>
            <Link
              to="/ViewProfile"
              style={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              View profile
            </Link>
          </Button>
          <Button>
            <Link
              to="/EditProfile"
              style={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Edit profile
            </Link>
          </Button>
          {/* <Button>
            <Link
              to="/BankDetails"
              style={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Bank Details
            </Link>
          </Button> */}
          <br />
          <button
            onClick={() => {
              logout();
              history.push('/');
            }}
            className="btn btn-primary"
          >
            Logout
          </button>
        </Typography>
      </Popover>
    </div>
  );
}
