import { combineReducers } from "redux";
import auth from "./auth";
import links from './links';
import filter from './filter';


export default combineReducers({ auth });
export default combineReducers({ auth, links, filter });
