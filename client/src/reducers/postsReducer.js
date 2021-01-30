import {
  CREATE,
  CLEAR,
  UPDATE,
  DELETE,
  FETCH_ALL,
  FETCH_ONE,
} from "../constans/actionTypes";
import moment from "moment";

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return [action.payload];
    case FETCH_ONE:
      return [...posts, action.payload];
    case CREATE:
      return [...posts, action.payload];
    case CLEAR:
      return action.payload;
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};

export default postsReducer;
