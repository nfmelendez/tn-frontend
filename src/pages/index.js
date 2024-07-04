import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import { isLoggedIn, logout } from '../services/authService';
import Button from '@mui/material/Button';
import Calculator from './calculator';
import { Router } from "@reach/router"
import PrivateRoute from '../components/PrivateRoute';



export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        Hola
      <Router>
        <PrivateRoute path="/calculator" component={Calculator} />
        <Login path="/" />
      </Router>
      </Box>
    </Container>
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