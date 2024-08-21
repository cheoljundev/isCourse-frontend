import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "../modules/auth.js";
import {thunk} from "redux-thunk";
import modalReducer from "../modules/modal.js";

const rootReducer = combineReducers({
  authReducer,
  modalReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;