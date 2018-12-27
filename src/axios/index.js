/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import {get} from './tools';
import {post} from '../fetch'

import * as config from './config';

export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
  category: "trending",
  period: "day",
  lang: "javascript",
  offset: 0,
  limit: 30
}).then(function (response) {
  return response.data;
}).catch(function (error) {
  console.log(error);
});

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));


export const gitOauthTokenLogin = params => axios.post('/login', params, {
   transformRequest: [
     function (params) {
       let str = ''
       for (let k in params) {
         if (params.hasOwnProperty(k)) {
           str += `${k}=${params[k]}&`
         }
       }
       return str.slice(0, -1)
     }
   ]
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//用户信息
export const getUserInfo = () => axios({
  method: 'get',
  url: '/user/info'
}).then(res => {
  return {
   ...res.data,
 }
}).catch(err => console.log(err));


//会员列表
export const getMemberList = () => axios({
  method: 'get',
  url: '/member/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//增加会员
export const addMember = (values) => axios({
  method: 'post',
  url: '/member/add',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));



export const gitOauthInfo = access_token => axios({
  method: 'get',
  url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));


// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});