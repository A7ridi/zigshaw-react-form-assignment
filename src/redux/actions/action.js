import { DELETE_USER, SET_USERS, UPDATE_USER } from "../constants/constants";

export const setAllUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};
