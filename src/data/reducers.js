import { combineReducers } from "redux";
import auth from "./modules/auth/auth.reducer";
import camp from './modules/camp/camp.reducer';
import employee from './modules/employee/employee.reducer';
import schedule from './modules/schedule/schedule.reducer';
import report from './modules/report/report.reducer';
import masterCamp from './modules/master.camp/masterCamp.reducer';
import modal from './modules/modal/modal.reducer';
import feedback from './modules/feedback/feedback.reducer';
import contact from './modules/contact/contact.reducer';

export default combineReducers({
  auth,
  camp,
  employee,
  schedule,
  report,
  masterCamp,
  modal,
  feedback,
  contact
});
