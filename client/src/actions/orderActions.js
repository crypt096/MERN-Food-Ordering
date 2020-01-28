import { GET_ORDERS,GET_ORDER_BY_ID,ADD_ORDER,DELETE_ORDER,EDIT_ORDER,ORDERS_LOADING } from './types';
import axios from 'axios';

export const getOrders = () => dispatch => {
    dispatch(setOrdersLoading());
    axios.get('/api/orders')
    .then(res => 
        dispatch({
            type : GET_ORDERS,
            payload : res.data
        })
    )
}

export const getOrderById = id => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/orders/${id}`)
    .then(res => 
        dispatch({
            type : GET_ORDER_BY_ID,
            payload : res.data
        })
    )
}

export const addOrder = order => dispatch => {
    axios.post('api/orders/add',order)
    .then(res => dispatch({
        type : ADD_ORDER,
        payload : res.data
    }))
}

export const deleteOrder = id => dispatch => {
    axios.delete(`api/orders/${id}`)
    .then(res => dispatch({
        type : DELETE_ORDER,
        payload : id
    }) )
}

export const editOrder = (id , order) => dispatch => {
    axios.post(`/api/orders/${id}`,order)
    .then(res => dispatch({
        type : EDIT_ORDER,
        payload : res.data
    }) )
}

export const setOrdersLoading = () => {
    return {
        type : ORDERS_LOADING
    }
}