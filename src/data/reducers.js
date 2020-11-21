import { combineReducers } from "redux";
//! PLOP MAIN_REDUCERS_IMPORT
import auth from "./modules/auth/auth.reducer";
import camp from './modules/camp/camp.reducer';
export default combineReducers({
  //! PLOP MAIN_REDUCERS_APPEND
  auth,
  camp

});
