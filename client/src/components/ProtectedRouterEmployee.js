import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRouterEmployee = ({ component: Component, ...rest }) => {
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

export default ProtectedRouterEmployee;
