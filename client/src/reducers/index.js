import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import orderReducer from './orderReducer';
import foodReducer from './foodReducer';

export default combineReducers({
  item: itemReducer,
  order: orderReducer,
  food : foodReducer
});
