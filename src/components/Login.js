import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { handleLogin } from "../controller/authService";

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
            debugger;
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

        <h1>Log in</h1>
        <form
          method="post"
          onSubmit={event => {
            handleSubmit(event)
          }}
        >
          <label>
            Username
            <input type="text" name="username" value={credentials.username} onChange={handleUpdate} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }

