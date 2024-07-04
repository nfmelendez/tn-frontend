

import { navigate } from "gatsby"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username === `admin` && password === `123`) {
    setUser({
      username: `admin`,
      name: `admin`,
      email: `admin@example.org`,
    })
    navigate('/calculator');
  } else {
    return false;
  }

}

export const isLoggedIn = () => {
    debugger;
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  //callback()
}