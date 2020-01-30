import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import orderReducer from "./orderReducer";
import foodReducer from "./foodReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  order: orderReducer,
  food: foodReducer,
  error: errorReducer,
  auth: authReducer
});
