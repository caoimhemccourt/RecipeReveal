import { combineReducers } from "redux"
import feedsReducer from "./feedReducers"

const myReducer = combineReducers({
    feeds : feedsReducer
})

export default myReducer;