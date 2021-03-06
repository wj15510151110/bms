import * as type from './type';
import * as http from '../axios/index';

//请求数据
const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});

//接收数据
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    data,
    category
});



//info
export const infoData = (data, category) => ({
    type: type.INFI_DATA,
    data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {

    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));

    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

export const fetchInfo = ({funcName, stateName}) => dispatch => {

    return http[funcName]().then(res => dispatch(infoData(res, stateName)));
};