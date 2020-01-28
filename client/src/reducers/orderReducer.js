import { GET_ORDERS,GET_ORDER_BY_ID,ADD_ORDER,DELETE_ORDER,ORDERS_LOADING, EDIT_ORDER } from '../actions/types';

const initialState = {
  orders: [],
  loading : false
};

export default function (state = initialState, action) {
  switch(action.type){
    case GET_ORDERS: 
    return {
      ...state,
      orders : action.payload,
      loading: false
    };
    case GET_ORDER_BY_ID: 
    return {
      ...state,
      orders : action.payload,
      loading: false
    };
    case DELETE_ORDER: 
    return {
      ...state,
      orders : state.orders.filter(order => order._id !== action.payload)
    };
    case ADD_ORDER: 
    return {
      ...state,
      orders : [action.payload,...state.orders]
    };
    case EDIT_ORDER: 
    return {
      ...state,
      orders : state.orders._id === action.payload._id ? action.payload : state.orders
    };
    case ORDERS_LOADING: 
    return {
      ...state,
      loading: true
    };
    default : 
    return state;
  }
}