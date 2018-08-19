import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import combineReducers from "../reducers/index";
import thunk from "redux-thunk";
export const store = createStore(combineReducers,composeWithDevTools(applyMiddleware(thunk)));