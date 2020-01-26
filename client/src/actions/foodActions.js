import { GET_FOODS,FOODS_LOADING } from './types';
import axios from 'axios';

export const getFoods = () => dispatch => {
   dispatch(setFoodsLoading());
   axios.get('/api/foods/')
   .then(res => 
       dispatch({
           type : GET_FOODS,
           payload : res.data
       })
   )
};

export const setFoodsLoading = () => {
    return {
        type : FOODS_LOADING
    }
}