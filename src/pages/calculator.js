import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Login from '../components/Login';
import { logout } from '../services/authService';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby';
import Operation from '../components/calculator/Operation';


function handleSignOut() {
    logout();
    navigate("/");
}

export default function Calculator() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>

        <Operation opName="Addition" opSymbol="+" opActionName="Add"></Operation>
        <Operation opName="Subtraction" opSymbol="-" opActionName="Substract"></Operation>
        <Operation opName="Multiplication" opSymbol="+*" opActionName="Multiply"></Operation>
        <Operation opName="Division" opSymbol="/" opActionName="Divide"></Operation>
        <Operation opName="Square root" opSymbol="sqr" opActionName="Operate"></Operation>
        <Operation opName="Random String" opSymbol="" opActionName="Execute"></Operation>




        The Calculator
        <Button variant="outlined" onClick={() => {
              handleSignOut();
            }}>Sign Out
          </Button>

      </Box>
    </Container>
  );
}
