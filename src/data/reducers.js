import { combineReducers } from "redux";
//! PLOP MAIN_REDUCERS_IMPORT
import auth from "./modules/auth/auth.reducer";
import camp from './modules/camp/camp.reducer';
import employee from './modules/employee/employee.reducer';
import schedule from './modules/schedule/schedule.reducer';
import report from './modules/report/report.reducer';
export default combineReducers({
  //! PLOP MAIN_REDUCERS_APPEND
  auth,
  camp,
  employee,
  schedule,
  report
});
