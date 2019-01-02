/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import {get} from './tools';
import {post} from '../fetch'
import React from 'react'

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
//编辑会员
export const editMember = (uid,values) => axios({
  method: 'put',
  url: `/member/${uid}/update`,
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//删除会员
export const delMember = (uid,values) => axios({
  method: 'delete',
  url: `/member/${uid}/delete`,
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));
//========================
//类别列表
export const getCategoryList = () => axios({
  method: 'get',
  url: '/member/type/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//新增类别
export const addCategory = params => axios.post('/member/type/add', params, {
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

//编辑类别
export const editCategory = params => axios.put('/member/type/update', params, {
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



//身份列表
export const getIdentityList = () => axios({
  method: 'get',
  url: '/member/tag/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

// 新增身份
export const addIdentity = params => axios.post('/member/tag/add', params, {
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

//修改身份
export const editIdentity = params => axios.put('/member/tag/update', params, {
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





































export const gitOauthInfo = access_token => axios({
  method: 'get',
  url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});