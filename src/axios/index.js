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


export const gitOauthTokenLogin = params => axios.post('/kylinclub/login', params, {
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
  url: '/kylinclub/user/info'
}).then(res => {
  return {
   ...res.data,
 }
}).catch(err => console.log(err));

//退出用户  http://member.kylinclub.org/kylinclub/logout
export const logout = () => axios({
  method: 'get',
  url: '/kylinclub/logout'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//用户自行修改密码 http://member.kylinclub.org/kylinclub/user/{uid}/chpwd
export const chpwd = (uid,values) => axios({
  method: 'put',
  url: `/kylinclub/user/${uid}/chpwd`,
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//http://member.kylinclub.org/kylinclub//user/{uid}/reset
export const reset = (uid,params) => axios.post(`/kylinclub/user/${uid}/reset`, params, {
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


//会员列表
export const getMemberList = () => axios({
  method: 'get',
  url: '/kylinclub/member/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//增加会员
export const addMember = (values) => axios({
  method: 'post',
  url: '/kylinclub/member/add',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));


export const daochu = (values) => axios({
  method: 'get',
  url: '/kylinclub/member/exports',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//编辑会员
export const editMember = (uid,values) => axios({
  method: 'put',
  url: `/kylinclub/member/${uid}/update`,
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//删除会员
export const delMember = (uid,values) => axios({
  method: 'delete',
  url: `/kylinclub/member/${uid}/delete`,
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
  url: '/kylinclub/member/type/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//新增类别
export const addCategory = params => axios.post('/kylinclub/member/type/add', params, {
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
export const editCategory = params => axios.put('/kylinclub/member/type/update', params, {
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
  url: '/kylinclub/member/tag/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

// 新增身份
export const addIdentity = params => axios.post('/kylinclub/member/tag/add', params, {
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
export const editIdentity = params => axios.put('/kylinclub/member/tag/update', params, {
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


//管理员列表getAdminList
export const getAdminList = () => axios({
  method: 'get',
  url: '/kylinclub/user/list'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//添加管理员addAdmin
export const addAdmin = (values) => axios({
  method: 'post',
  url: '/kylinclub/user/add',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));


//管理员删除
export const delAdmin = (uid,values) => axios({
  method: 'delete',
  url: `/kylinclub/user/${uid}/del`,
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));



//系统信息详情
export const getSetUpInfo = () => axios({
  method: 'get',
  url: '/kylinclub/sys/info'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//系统信息更新
export const getSetUpUpdate = (values) => axios({
  method: 'put',
  url: '/kylinclub/sys/update',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));


//短信详情
export const getShortMessageInfo = () => axios({
  method: 'get',
  url: '/kylinclub/sms/info'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//短信信息更新
export const getShortMessageUpdate = (values) => axios({
  method: 'put',
  url: '/kylinclub/sms/update',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//邮箱详情
export const getMailBoxInfo = () => axios({
  method: 'get',
  url: '/kylinclub/email/info'
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));

//邮箱更新
export const getMailBoxUpdate = (values) => axios({
  method: 'put',
  url: '/kylinclub/email/update',
  data:values,
}).then(res => {
  return {
    ...res.data,
  }
}).catch(err => console.log(err));


// 导出数据 http://member.unicloud.cn/kylinclub/member/exports























export const gitOauthInfo = access_token => axios({
  method: 'get',
  url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});