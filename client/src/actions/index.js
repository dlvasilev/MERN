import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_USERDATA } from './types';

const SERVER_URL = 'http://localhost:3000';

export function signinUser(userData) {
  return dispatch => {
    authUser(
      dispatch,
      'signin',
      userData,
      'The email or password is not correct'
    );
  };
}

export function signupUser(userData) {
  return dispatch => {
    authUser(dispatch, 'signup', userData);
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

function authUser(dispatch, endpoint, { email, password }, errorMessage) {
  axios
    .post(`${SERVER_URL}/${endpoint}`, { email, password })
    .then(response => {
      dispatch({ type: AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/user');
    })
    .catch(error => {
      dispatch(authError(errorMessage || error.response.data.error));
    });
}

export function fetchMessage() {
  return dispatch => {
    axios
      .get(`${SERVER_URL}/user`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_USERDATA,
          payload: response.data
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          dispatch({ type: UNAUTH_USER });
        }
      });
  };
}
