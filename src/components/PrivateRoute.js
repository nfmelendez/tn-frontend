import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/authService"

export default function PrivateRoute ({ component: Component, location, ...rest })  {
    debugger;
  if (!isLoggedIn() && location.pathname !== '/') {
    navigate('/');
    return null
  }

  return <Component {...rest} />
}
