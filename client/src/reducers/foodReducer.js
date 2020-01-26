import { GET_FOODS,FOODS_LOADING} from '../actions/types';

const initialState = {
  foods: [],
  loading : false
};

export default function (state = initialState, action) {
  switch(action.type){
    case GET_FOODS: 
    return {
      ...state,
      foods : action.payload,
      loading: false
    };
    case FOODS_LOADING: 
    return {
      ...state,
      loading: true
    };
    default : 
    return state;
  }
}