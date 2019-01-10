import './index.less'
import React, {Component} from 'react';

import moment from 'moment';

import {getShortMessageInfo, getShortMessageUpdate} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Select, Row, Col, Button, InputNumber, TimePicker} from 'antd';

const FormItem = Form.Item;

const Option = Select.Option


class ShortMessage extends Component {
  state = {
    data: ''
  };


  componentDidMount() {
    this.getInfo()
  }


  getInfo = () => {
    getShortMessageInfo().then(v => {
      this.setState({
        data: v.data
      })
    })
  }

  handleSubmit = (e) => {
    let {data} = this.state
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        getShortMessageUpdate({...values, id: data.id}).then(res => {
          if (res && res.status) {
            notices.success(res.msg || '修改成功')

          } else {
            notices.error(res.msg)
          }
        })

      }
    });
  };

  handleCancel = () => {
    this.props.form.resetFields()
  }

  render() {
    const {data} = this.state

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
    let _this = this
    return (
        <div className="gutter-example">
          <BreadcrumbCustom first="系统设置" second="短信设置"/>
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title="短信设置" bordered={false}>
                    <Form onSubmit={this.handleSubmit}>

                      <Form.Item
                          {...formItemLayout}
                          label="账户"
                      >
                        {getFieldDecorator('account', {
                          rules: [{
                            required: true,
                            message: '请填写账户'
                          }],
                          initialValue: (data && data.account) ? data.account : ''

                        })(
                            <Input/>
                        )}
                      </Form.Item>


                      <FormItem {...formItemLayout} label="密码">
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true,
                            message: '请填写类类型'
                          }],
                          initialValue: (data && data.password) ? data.password : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="短信地址">
                        {getFieldDecorator('addr', {
                          rules: [{
                            required: true,
                            message: '请填短信地址'
                          }],
                          initialValue: (data && data.addr) ? data.addr : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="是否使用">
                        {getFieldDecorator('use', {
                          rules: [{
                            required: true,
                            message: '请填是否使用'
                          }],
                          initialValue: (data && data.use) ? data.use : 0
                        })(
                            <Select>
                              <Option key={0} value={0}>关闭 </Option>
                              <Option key={1} value={1}>开启 </Option>
                            </Select>
                        )}
                      </FormItem>

                      <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">提交</Button>
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

export default Form.create()(ShortMessage);