import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

const composeEnhancers = compose;

const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, composeEnhancers(middleware));

export { store };
