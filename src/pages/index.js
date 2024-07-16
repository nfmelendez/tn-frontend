import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import { isLoggedIn, logout } from '../controller/authService';
import Button from '@mui/material/Button';
import AppTabs from './app';
import { Router } from "@reach/router"
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/layout';


export default function Index() {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/app" component={AppTabs} />
        <Login path="/" />
      </Router>
    </Layout>
  );
}

