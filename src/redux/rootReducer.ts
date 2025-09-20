import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import jobsReducer from "./features/jobs/jobsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobsReducer,
});

export default rootReducer;
