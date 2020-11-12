import React, { FC, useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import Login from '../../pages/Login';
import api from '../../services/api';

type Props = RouteProps;

const PrivateRoute: FC<Props> = ({ component, ...rest }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    api
      .post('/authenticated')
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  return <Route {...rest} component={auth ? component : Login} />;
};

export default PrivateRoute;
