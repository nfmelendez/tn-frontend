import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { operation } from "../../controller/calculatorService";

import TextField from '@mui/material/TextField';


import { Box, styled } from '@mui/system';


export default function Operation({ opName, opSymbol, opActionName, onResult, parentState}) {

    const defaultState = {
        left: parentState.result,
        right: 0
    }

    const [state, setState] = useState(defaultState);



    async function handleSubmit(e) {
        e.preventDefault();
        debugger;
        const result = await operation(opSymbol, parentState.result, state.right);

        onResult(result);
    
    }

    function handleUpdate(e){
        debugger;
        e.preventDefault();
        const value = e.target.value;
        //accept only numbers
        setState(prev => (
            {...prev,
            right: value
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
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  name="left" value={parentState.result}   />

    </label>
    <label>
      {opSymbol}
      <TextField id="outlined-basic" label="Outlined" variant="outlined"  name="right" value={state.right}  onChange={handleUpdate} />

    </label>
    <input type="submit" value={opActionName} />
  </form>
  );
}
