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

/*
export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        { !isLoggedIn() ? (
        <Login/>
        ) : (<>
          <Button variant="outlined" onClick={() => {
              logout();
            }}>Sign Out
          </Button>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Gatsby example
        </Typography>
        <Link to="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
        </>
        )}
      </Box>
    </Container>
  );
}
*/