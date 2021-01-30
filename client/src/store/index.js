import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";

const composeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnchancer(applyMiddleware(thunk))
);
