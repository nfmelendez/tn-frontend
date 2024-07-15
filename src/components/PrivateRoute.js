import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../controller/authService"

export default function PrivateRoute ({ component: Component, location, ...rest })  {
  if (!isLoggedIn() && location.pathname !== '/') {
    navigate('/');
    return null
  }

  return <Component {...rest} />
}
