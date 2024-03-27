import { combineReducers } from "redux"
import feedsReducer from "./feedReducers"
import tipsReducer from "./tipsReducers";
import foodReducer from "./foodReducers";

const myReducer = combineReducers({
    feeds : feedsReducer,
    tips : tipsReducer,
    food : foodReducer,
})


export default myReducer;