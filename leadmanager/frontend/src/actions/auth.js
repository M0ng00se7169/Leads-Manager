import axios from "axios";
import { returnErrors } from "./messages";
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token from the state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token then add him to headers config
  if (config) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  // Request to GET user object
  axios
    .get("/api/auth/user", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: user.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ 
        type: AUTH_ERROR
      })
    });
};
