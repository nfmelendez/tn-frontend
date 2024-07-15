

import { navigate } from "gatsby"

import axios from "axios";

const VERSION = "v1"
const URL = ` https://ontmzy9lwe.execute-api.us-east-1.amazonaws.com/dev/${VERSION}/`


const USER_STORAGE = "userStorage"


export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(USER_STORAGE)
    ? JSON.parse(window.localStorage.getItem(USER_STORAGE))
    : {}

const setUser = user =>
  window.localStorage.setItem(USER_STORAGE, JSON.stringify(user))

export const handleLogin = async ({ username, password }) => {
  debugger;
  try {
    const response = await axios.post(URL + "user/login", {
      username: username,
      password: password,
    });
    debugger;
    setUser({
      username: username,
      session: response.data.session,
    })
    navigate('/app');
  } catch (err) {
    //setError('An error occurred');
    console.error(err);
    return err.response.data.error;
  }

}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  //callback()
}