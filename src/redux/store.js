import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "redux/rootReducer";
import rootSaga from "redux/rootSaga";

//Create a logger with collapsed console log entries
const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(
  //
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
