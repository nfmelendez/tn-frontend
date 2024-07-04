import React, { useState } from "react";

import { handleLogin } from "../services/authService";

const defaultCredentialsState = {
  username: `admin`,
  password: `123`,
}



export default function Login() {

        const [credentials, setCredentials] = useState(defaultCredentialsState);

        function handleUpdate(event) {
          const { name, value } = event.target;
          setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
          }));
        }

        function handleSubmit (event) {
          event.preventDefault()
          debugger;
          handleLogin(credentials);
        }


        return (
      <>
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

