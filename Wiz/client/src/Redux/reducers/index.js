import { combineReducers } from "redux";
import userReducer from "./userReducer.js"
import userSession from "./userSession.jsx"


export default combineReducers({
    users: userReducer,
    session: userSession
    });