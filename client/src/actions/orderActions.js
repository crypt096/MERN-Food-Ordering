import { GET_ORDERS,ADD_ORDER,DELETE_ORDER,ORDERS_LOADING } from './types';
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



export const setOrdersLoading = () => {
    return {
        type : ORDERS_LOADING
    }
}