import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import axios from 'axios';

export default function Operation({ opName, opSymbol, opActionName }) {

    const defaultState = {
        left: "",
        right: ""
    }

    const [state, setState] = useState(defaultState);



    async function handleSubmit() {
               /* try {
            const response = await axios.post('https://api.example.com/operation', {
            operation: opActionName,
            left: state.left,
            right: state.right,
            });
           // setResult(response.data.result);
        } catch (err) {
            //setError('An error occurred');
            console.error(err);
        }*/
       

    }

    function handleUpdate(){}

  return (
    <form
    method="post"
    onSubmit={event => {
      handleSubmit(event)
    }}
  >
    <label>
      {opName}
      <input type="text" name="left" value={state.left} onChange={handleUpdate} />
    </label>
    <label>
      {opSymbol}
      <input
        type="text"
        name="right"
        value={state.right}
        onChange={handleUpdate}
      />
    </label>
    <input type="submit" value={opActionName} />
  </form>
  );
}
