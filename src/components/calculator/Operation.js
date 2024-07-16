import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { operation } from "../../controller/calculatorService";

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';




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

          <Grid xs={1}>
          {opName}
          </Grid>

          <Grid xs={3}>

          <label>
            
              {opActionName !== "random_string" &&
                <TextField id="outlined-basic"  name="left" value={state.left} onChange={handleUpdateLeft} />
              }
          </label>
          </Grid>
          <Grid xs={1}>
          <h3>{opSymbol}</h3>

          </Grid>
          <Grid xs={3}>

          {(opActionName !== "square_root" && opActionName !== "random_string") &&

            <label>

                <TextField id="outlined-basic"  name="right" value={state.right} onChange={handleUpdateRight} />
            </label>

          }
          </Grid>

          <Grid xs={2}>
            <Button variant="outlined" type="submit" > {opActionName}</Button>
          </Grid>
          </Grid>

        </form>
  );
}

