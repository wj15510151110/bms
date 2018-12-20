/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {PwaInstaller} from '../widget';

import {notices} from '../../utils/notification'

import {gitOauthTokenLogin} from '../../axios';

const FormItem = Form.Item;

class Login extends React.Component {
  componentWillMount() {
    const {receiveData} = this.props;
    console.log(receiveData,'receiveData');
    receiveData(null, 'auth');
  }

  componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
    const {auth: nextAuth = {}, history} = this.props;
    // const { history } = this.props;
    history.push('/');
    if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
      localStorage.setItem('user', JSON.stringify(nextAuth.data));
      history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {fetchData} = this.props;

       /* gitOauthTokenLogin(values).then(res => {
          console.log(res, 'gitOauthTokenLogin');
          if (res.status) {
            fetchData({
              funcName: 'admin',
              stateName: 'auth'
            });
          } else {
            notices.error(res.msg)
          }
        })*/

      /*  fetchData({
          funcName: 'gitOauthTokenLogin',
          params:values,
          stateName: 'auth'
        }).then(res => {
          console.log(res, 'gitOauthTokenLogin');
          if (res.data.status) {
           /!* fetchData({
              funcName: 'admin',
              stateName: 'auth'
            });*!/
          } else {
            notices.error(res.data.msg)
          }
        })*/


        if (values.username === 'admin' && values.password === 'admin') fetchData({
          funcName: 'admin',
          stateName: 'auth'
        });

        if (values.username === 'guest' && values.password === 'guest') fetchData({
          funcName: 'guest',
          stateName: 'auth'
        });
      }
    });
  };
  gitHub = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
        <div className="login">
          <div className="login-form">
            <div className="login-logo">
              <span>会员管理系统</span>
              <PwaInstaller/>
            </div>
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: '请输入用户名!'}],
                })(
                    <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="请输入用户名"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '请输入密码!'}],
                })(
                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="请输入密码"/>
                )}
              </FormItem>

              <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                登录
              </Button>
              {/* <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或 现在就去注册!</span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p>
                        </FormItem>*/}
            </Form>
          </div>
        </div>
    );
  }
}

const mapStateToPorps = state => {
  const {auth} = state.httpData;
  return {auth};
};
const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchData, dispatch),
  receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));