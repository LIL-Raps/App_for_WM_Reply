import {combineReducers} from 'redux';
import bus from './reducer';
import {routerReducer} from 'react-router-redux';
import busInfo from "./busInfo";
import stopPointInfo from './stopPoint';
import schedule from './Schedule'
import filterTransport from './filterTransport';
export default combineReducers ({
    filterTransport,
    schedule,
    stopPointInfo,
    busInfo,
    bus,
    routing: routerReducer,
})