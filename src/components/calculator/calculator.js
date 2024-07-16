import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../ProTip';
import Link from '../Link';
import Copyright from '../Copyright';
import Login from '../Login';
import { logout } from '../../controller/authService';
import Button from '@mui/material/Button';
import { navigate } from 'gatsby';
import Operation from './Operation';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Divider from '@mui/material/Divider';

export default function Calculator() {

  const [state, setState] = useState({ result: "0", credit: 0 });

  const [error, setError] = useState("");



  const onResult = (r) => {
    debugger;
    if (r.success) {
      setError("");
      setState((prevState) => ({
        ...prevState,
        result: r.result,
        credit: r.credit
      }));
  } else {
    setError(r)
  }

  }


  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        {error !== "" &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
           {error}
        </Alert> 
        }



        <Operation opName="Addition" opSymbol="+" opActionName="add" onResult={onResult} parentState={state}></Operation>
        <Operation opName="Subtraction" opSymbol="-" opActionName="subtraction" onResult={onResult} parentState={state}></Operation>
        <Operation opName="Multiplication" opSymbol="*" opActionName="multiplication" onResult={onResult} parentState={state}></Operation>
        <Operation opName="Division" opSymbol="/" opActionName="division" onResult={onResult} parentState={state}></Operation>
        <Operation opName="Square root" opSymbol="sqr" opActionName="square_root" onResult={onResult} parentState={state}></Operation>
        <Operation opName="Random String" opSymbol="" opActionName="random_string" onResult={onResult} parentState={state}></Operation>

        <Divider>RESULT:</Divider>
        <h1>{state.result}</h1>

        <Divider>CREDIT:</Divider>
        <h1>{state.credit}</h1>

      </Box>
    </Container>
  );
}
