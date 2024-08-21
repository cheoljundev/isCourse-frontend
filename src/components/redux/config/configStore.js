import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "../modules/auth.js";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
  authReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;