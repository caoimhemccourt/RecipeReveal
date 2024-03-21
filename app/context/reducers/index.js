import { combineReducers } from "redux"
import feedsReducer from "./feedReducers"
import tipsReducer from "./tipsReducers";

const myReducer = combineReducers({
    feeds : feedsReducer,
    tips : tipsReducer
})


export default myReducer;