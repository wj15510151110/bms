import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchData, receiveData} from '@/action';
import {PwaInstaller} from '../widget';

import {notices} from '../../utils/notification'

import {gitOauthTokenLogin,getUserInfo} from '../../axios';

const FormItem = Form.Item;

class Login extends React.Component {
  componentWillMount() {
    const {receiveData} = this.props;
    receiveData(null, 'login');
  }

  componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
    const {login: nextLogin  ={}, history} = this.props;

    if (nextLogin.data && nextLogin.data.status) { // 判断是否登陆
      localStorage.setItem('login', JSON.stringify(nextLogin.data));
      localStorage.setItem('user', JSON.stringify(nextLogin.data));
      history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {fetchData} = this.props;

        fetchData({
          funcName: 'gitOauthTokenLogin',
          params:values,
          stateName: 'login'
        }).then(res => {
          if (res.data && res.data.status) {
            this.getInfo()
          } else {
            notices.error(res.data.msg)
          }
        })


      }
    });
  };


  getInfo = () => {
    getUserInfo().then(res =>  {
      if(res.status){
        localStorage.setItem('info', JSON.stringify(res.data));
      }else {
        notices.error(res.msg)
        this.props.history.push('/login')
      }
    })
  }

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
            </Form>
          </div>
        </div>
    );
  }
}

const mapStateToPorps = state => {
  const {auth,login} = state.httpData;
  return {auth,login};
};
const mapDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchData, dispatch),
  receiveData: bindActionCreators(receiveData, dispatch),
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));