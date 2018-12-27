import {combineReducers} from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, status: false, data: {}}, action) => {

  switch (action.type) {
    case type.REQUEST_DATA:
      return {...state, isFetching: true};
    case type.RECEIVE_DATA:
      let state = {...state, isFetching: false, data: action.data}
      return state;
    default:
      return {...state};
  }
};

const httpData = (state = {}, action) => {

  switch (action.type) {
    case type.RECEIVE_DATA:
      let data = {[action.category]: handleData(state[action.category], action)}
      return {
        ...state,
        ...data,
      }
    case type.REQUEST_DATA:
      return {
        ...state,
        [action.category]: handleData(state[action.category], action)
      };
    default:
      return {...state};
  }
};

const infoData = (state = {}, action) => {

  switch (action.type) {
    case type.INFI_DATA:
      return {
        ...state,
        ...action.data,
      }
    default:
      return {...state};
  }
};

export default combineReducers({
  httpData,
  infoData,
});
