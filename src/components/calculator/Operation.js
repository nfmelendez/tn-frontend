import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { operation } from "../../controller/calculatorService";

import TextField from '@mui/material/TextField';


import { Box, styled } from '@mui/system';


export default function Operation({ opName, opSymbol, opActionName, onResult, parentState}) {

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

    function handleUpdateRight(e){
        e.preventDefault();
        const value = e.target.value;
        //accept only numbers
        setState(prev => (
            {...prev,
            right: value
            }
        ))

    }

    function handleUpdateLeft(e) {
      e.preventDefault();
      const value = e.target.value;
      setState(prev => (
          {...prev,
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
    <label>
      {opName}
      { opActionName !== "random_string"  &&
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  name="left" value={state.left}  onChange={handleUpdateLeft}  />
      }
    </label>
    {(opActionName !== "square_root" && opActionName !== "random_string")  &&
    <label>
      {opSymbol}
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  name="right" value={state.right}  onChange={handleUpdateRight} />

    </label>
    }
    <input type="submit" value={opActionName} />
  </form>
  );
}
