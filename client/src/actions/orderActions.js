import {
  GET_ORDERS,
  GET_ORDER_BY_ID,
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  ORDERS_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getOrders = () => (dispatch, getState) => {
  dispatch(setOrdersLoading());
  axios
    .get("/api/orders", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getOrderById = id => (dispatch, getState) => {
  dispatch(setOrdersLoading());
  axios.get(`/api/orders/${id}`, tokenConfig(getState)).then(res =>
    dispatch({
      type: GET_ORDER_BY_ID,
      payload: res.data
    })
  );
};

export const addOrder = order => (dispatch, getState) => {
  axios
    .post("api/orders/add", order, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteOrder = id => (dispatch, getState) => {
  axios
    .delete(`api/orders/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ORDER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editOrder = (id, order) => (dispatch, getState) => {
  axios.post(`/api/orders/${id}`, order, tokenConfig(getState)).then(res =>
    dispatch({
      type: EDIT_ORDER,
      payload: res.data
    })
  );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};
