import {combineReducers} from 'redux';
import bus from './reducer';
import {routerReducer} from 'react-router-redux';
import busInfo from "./busInfo";
import stopPointInfo from './stopPoint';
import schedule from './Schedule'
export default combineReducers ({
    schedule,
    stopPointInfo,
    busInfo,
    bus,
    routing: routerReducer,
})