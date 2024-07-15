import React, {useState} from 'react';
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


export default function Calculator() {

  const [state, setState] = useState({result : 0, credit: 0});



  const onResult = (r) => {
    setState((prevState) => ({
      ...prevState,
      result: r.result,
      credit : r.credit
    }));

  }


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>

        <Operation opName="Addition" opSymbol="+" opActionName="Add" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Subtraction" opSymbol="-" opActionName="Substract" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Multiplication" opSymbol="+*" opActionName="Multiply" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Division" opSymbol="/" opActionName="Divide" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Square root" opSymbol="sqr" opActionName="Operate" onResult={onResult} parentState={state}></Operation>
            <Operation opName="Random String" opSymbol="" opActionName="Execute" onResult={onResult} parentState={state}></Operation>
            The Calculator result {state.result}
            The credit {state.credit}

      </Box>
    </Container>
  );
}
