/**
 * Created by 叶子 on 2017/7/30.
 */
import {combineReducers} from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, status: false, data: {}}, action) => {

  console.log(action, 'handleData');
  console.log(state, 'statestatehandleData');
  switch (action.type) {
    case type.REQUEST_DATA:
      return {...state, isFetching: true};
    case type.RECEIVE_DATA:
      return {...state, isFetching: false, data: action.data};
    default:
      return {...state};
  }
};

const httpData = (state = {}, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case type.RECEIVE_DATA:
      return {
        ...state,
        [action.category]: handleData(state[action.category], action)
      }
    case type.REQUEST_DATA:
      return {
        ...state,
        [action.category]: handleData(state[action.category], action)
      };

    case type.LOGINOUT_DATA:
      return {
        ...state,
        [action.category]:{...state, data: action.data}
      };

    default:
      return {...state};
  }
};

export default combineReducers({
  httpData
});
