import { DELETE_USER, SET_USERS, UPDATE_USER } from "../constants/constants";

const initialState = {
  user: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        user: state.user.filter((item) => item.id !== action.payload),
      };
    case UPDATE_USER:
      const filterUser = state.user.filter(
        (person) => person.id !== action.payload.id
      );

      return {
        ...state,
        user: [...filterUser, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
