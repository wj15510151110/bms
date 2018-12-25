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

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {
  ...{
    client_id: '792cdcd244e98dcd2dee',
    client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
    redirect_uri: 'http://localhost:3006/',
    state: 'reactAdmin'
  }, code: code
}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));


const data = {
  uid: 1,
  permissions: ["auth", "auth/testPage", "auth/authPage", "auth/authPage/edit", "auth/authPage/visit"],
  role: "系统管理员",
  roleType: 1,
  userName: "系统管理员"
}

export const gitOauthTokenLogin = params => axios.post('http://member.kylinclub.org/kylinclub/login', params, {
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
  console.log(res, 'resresres');
  return {
    ...res.data,
    ...data,
  }
}).catch(err => console.log(err));


export const gitOauthTokenLoginF = params => post('http://member.kylinclub.org/kylinclub/login', params).then(res => {
  return {
    ...res.data,
    ...data,
  }
}).catch(err => console.log(err));


export const getUserInfo = () => axios({
  method: 'get',
  url: 'http://member.kylinclub.org/kylinclub/user/info'
}, {
  credentials: 'include',
  mode: 'cors',
  cache: 'default',
}).then(res => res.data).catch(err => console.log(err));


export const gitOauthInfo = access_token => axios({
  method: 'get',
  url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));


// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});