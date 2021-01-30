import { AUTH_SUCCESS } from "../constans/actionTypes";

const initialState = {
  userID: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { _id, userInfo, postsCreated, friends } = action.payload.data;
      return {
        ...state,
        userID: _id,
        userInfo: userInfo,
        postsCreated: postsCreated,
        friends: friends,
      };
    default:
      return state;
  }
};

export default usersReducer;
