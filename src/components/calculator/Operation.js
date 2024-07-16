import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { operation } from "../../controller/calculatorService";

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';



export default function Operation({ opName, opSymbol, opActionName, onResult, parentState }) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const defaultState = {
    left: "0",
    right: "0"
  }

  const [state, setState] = useState(defaultState);



  async function handleSubmit(e) {
    e.preventDefault();
    const result = await operation(opActionName, state.left, state.right);
    onResult(result);

  }

  function handleUpdateRight(e) {
    e.preventDefault();
    const value = e.target.value;
    //accept only numbers
    setState(prev => (
      {
        ...prev,
        right: value
      }
    ))

  }

  function handleUpdateLeft(e) {
    e.preventDefault();
    const value = e.target.value;
    setState(prev => (
      {
        ...prev,
        left: value
      }
    ))
  }

  return (
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
          }}
        >
                <Grid container  spacing={2}>

          <Grid xs={4}>
          <label>
            
              {opName}


              {opActionName !== "random_string" &&
                <TextField id="outlined-basic" label="Outlined" variant="outlined" name="left" value={state.left} onChange={handleUpdateLeft} />
              }
          </label>
          </Grid>

          {(opActionName !== "square_root" && opActionName !== "random_string") &&
            <Grid xs={4}>
            <label>
                {opSymbol}
                <TextField id="outlined-basic" label="Outlined" variant="outlined" name="right" value={state.right} onChange={handleUpdateRight} />
            </label>
            </Grid>

          }
          <Grid xs={4}>
            <input type="submit" value={opActionName} />
          </Grid>
          </Grid>

        </form>
  );
}


{/* <Grid container spacing={2}>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
</Grid> */}