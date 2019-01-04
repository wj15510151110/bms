import './index.less'
import React, {Component} from 'react';
import {getUserInfo, chpwd} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Row, Col, Button} from 'antd';

const FormItem = Form.Item;

class ChangePassword extends Component {

  state = {
    confirmDirty: false,
    UserId: ''
  };


  componentDidMount() {
    getUserInfo().then(res => {
      this.overtime(res)
      if (res && res.status) {
        this.setState({
          UserId: res.data.id
        })
      } else {
        notices.error(res.msg)
      }
    })
  }

  overtime = (v) => {
    if(v){
      if(v.msg === 'unauthorized'){
        return this.props.history.push('/login')
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {UserId} = this.state
        chpwd(UserId, values).then(res => {
          if (res && res.status) {
            notices.success('修改成功')
          } else {
            notices.error(res.msg)
          }
        })
      }
    });
  };

  handleCancel = () => {
    this.props.form.resetFields()
    this.props.handleCancel()
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['repeat'], {force: true});
    }
    callback();
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('new')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  render() {
    const {EditData} = this.props

    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 6,
        },
      },
    };
    return (
        <div className="gutter-example">
          <BreadcrumbCustom first="系统设置" second="修改密码"/>
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title={'修改密码'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>

                      <FormItem {...formItemLayout} label="原密码">
                        {getFieldDecorator('old', {
                          rules: [{
                            required: true,
                            message: '请填写原密码'
                          }],
                        })(
                            <Input type="password"/>
                        )}
                      </FormItem>

                      <Form.Item
                          {...formItemLayout}
                          label="新密码"
                      >
                        {getFieldDecorator('new', {
                          rules: [{
                            required: true, message: '请输入新密码!',
                          }, {
                            validator: this.validateToNextPassword,
                          }],
                        })(
                            <Input type="password"/>
                        )}
                      </Form.Item>
                      <Form.Item
                          {...formItemLayout}
                          label="重复新密码"
                      >
                        {getFieldDecorator('repeat', {
                          rules: [{
                            required: true, message: '请输入新密码!',
                          }, {
                            validator: this.compareToFirstPassword,
                          }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                      </Form.Item>

                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
                        {EditData &&
                        <Button type="primary" htmlType="submit" size="large" onClick={this.handleCancel}>取消</Button>}
                      </FormItem>

                    </Form>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
    )
  }
}

export default Form.create()(ChangePassword);