import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouterEmployee = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (user.role === 'employee') {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const ProtectedRouterManager = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (user.role === 'manager') {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const ProtectedRouterAdmin = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (user.role === 'admin') {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const ProtectedRouter = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (token) {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

const ProtectedRouterEmployeeManager = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          if (user.role === 'employee' || user.role === 'manager') {
            return <Component {...props} />;
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export {
  ProtectedRouterEmployee,
  ProtectedRouterManager,
  ProtectedRouterAdmin,
  ProtectedRouter,
  ProtectedRouterEmployeeManager,
};
