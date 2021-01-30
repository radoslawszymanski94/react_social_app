import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ONE,
  CLEAR,
  AUTH_SUCCESS,
  AUTH_REQUEST,
  AUTH_FAILURE,
} from "../constans/actionTypes";
import { messages } from "../constans/messages";
import { message } from "../utils/message";
import * as api from "../api";

// Users actions
export const authenticate = (username, password) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  return api
    .login(username, password)
    .then((payload) => dispatch({ type: AUTH_SUCCESS, payload }))
    .then(() => message("success", messages.loginSuccess, 3))

    .catch((err) => {
      message("error", messages.loginFailed, 3);
      dispatch({ type: AUTH_FAILURE });
    });
};

export const register = (username, password) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  return api
    .register(username, password)
    .then((payload) => dispatch({ type: AUTH_SUCCESS, payload }))
    .then(() => message("success", messages.registerSuccess, 3))
    .catch(() => {
      message("error", messages.registerFailed, 3);
      dispatch({ type: AUTH_FAILURE });
    });
};

export const logout = () => (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  return api
    .logout()
    .then((payload) => dispatch({ type: AUTH_SUCCESS, payload }))
    .then(() =>
      dispatch({
        type: CLEAR,
        payload: [],
      })
    )
    .then(() => message("success", messages.logoutSuccess, 3))
    .catch((err) => {
      console.log(err);
      dispatch({ type: AUTH_FAILURE });
    });
};

export const getUser = (id) => async (dispatch) => {
  try {
    const data = await api.getUser(id);
    dispatch({
      type: AUTH_SUCCESS,
      payload: {
        ...data,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Posts actions
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.getPost(id);
    dispatch({
      type: FETCH_ONE,
      payload: {
        ...data,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const clearPost = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR, payload: [] });
  } catch (error) {
    console.log(error.message);
  }
};
