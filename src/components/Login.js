import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { handleLogin } from "../controller/authService";
import { Box } from "@mui/material";

const defaultCredentialsState = {
  username: `john@gmail.com`,
  password: `123`,
}



export default function Login() {

        const [credentials, setCredentials] = useState(defaultCredentialsState);

        const [loginError, setLoginError] = useState("");


        function handleUpdate(event) {
          const { name, value } = event.target;
          setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
          }));
        }

        async function handleSubmit (event) {
          event.preventDefault()
          const err = await handleLogin(credentials);
          if(err) {
            setLoginError(err);
          }
        }


        return (
      <>
        {loginError !== "" &&
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
        {loginError}
        </Alert>
        }

        <h2>Log in</h2>
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
          }}
        >        <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        textAlign='center'
      >        
            <TextField id="outlined-basic" label="Username" variant="outlined" type="text" name="username" value={credentials.username} onChange={handleUpdate} />
             <TextField id="outlined-basic" label="Password" variant="outlined"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleUpdate}
            />

          <Button variant="contained" type="submit" >Log in</Button>

          </Box>
        </form>
      </>
    )
  }

