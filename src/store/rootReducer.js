import { combineReducers } from "@reduxjs/toolkit";
import  taskSlice  from "./taskSlice";

const rootReducer = combineReducers({
    tasks: taskSlice
})

export default rootReducer;