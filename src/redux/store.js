import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import thunk from "redux-thunk";

import reducers from "../redux/rootReducer";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
