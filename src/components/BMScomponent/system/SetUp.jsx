import './index.less'
import React, {Component} from 'react';

import moment from 'moment';

import {getSetUpInfo, getSetUpUpdate} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Select, Row, Col, Button, InputNumber,TimePicker} from 'antd';

const FormItem = Form.Item;

const Option = Select.Option




class SetUp extends Component {
  state = {
    data: ''
  };


  componentDidMount() {
    this.getInfo()
  }


  getInfo = () => {
    getSetUpInfo().then(v => {
      this.overtime(v)
      this.setState({
        data: v.data
      })
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
    let {data} = this.state
    let {fieldsValue}  = this.props.form
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let  remind_time = moment(values['remind_time']).format('HH:mm');
        getSetUpUpdate({...values,remind_time, id: data.id}).then(res => {
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

  gitStamp = (time) => {
    let date = `2019-12-12 ${time}:00.0`;
    date = date.substring(0,19);
    date = date.replace(/-/g,'/');
    let timestamp = new Date(date).getTime();
    return timestamp
  }

  render() {
    const {EditData, data} = this.state

    const {getFieldDecorator,getFieldProps} = this.props.form;

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
          <BreadcrumbCustom first="系统设置" second="系统信息"/>
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title="系统信息" bordered={false}>
                    <Form onSubmit={this.handleSubmit}>


                      <FormItem {...formItemLayout} label="提前几天生日提醒">
                        {getFieldDecorator('remind_date', {
                          rules: [{
                            required: true,
                            message: '请填写生日提醒!'
                          }],
                          initialValue: (data && data.remind_date) ? data.remind_date : 1
                        })(
                            <InputNumber min={1} max={1000}/>
                        )}
                      </FormItem>

                      <Form.Item
                          {...formItemLayout}
                          label="每天提醒时间"
                      >
                        {getFieldDecorator('remind_time',{
                          rules: [{
                            required: true,
                            message: '请填写每天提醒时间!'
                          }],
                          initialValue: (data && data.remind_time) ?  moment(this.gitStamp(data.remind_time)): ''

                        })(
                            <TimePicker format="HH:mm"/>
                        )}
                      </Form.Item>


                      <FormItem {...formItemLayout} label="提醒类型">
                        {getFieldDecorator('remind_type', {
                          rules: [{
                            required: true,
                            message: '请填写类类型'
                          }],
                          initialValue: (data && data.remind_type) ? data.remind_type : 1
                        })(
                            <Select>
                              <Option key={1} value={1}>短信提醒 </Option>
                              <Option key={2} value={2}>邮件提醒</Option>
                              <Option key={3} value={3}>短信+邮件</Option>
                              <Option key={0} value={0}>不提醒"</Option>
                            </Select>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="提醒手机号">
                        {getFieldDecorator('phone', {
                          rules: [{
                            required: true,
                            message: '请填写手机号'
                          }, {
                            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                            message: '请填写正确的手机号'
                          }],
                          initialValue: (data && data.phone) ? data.phone : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="提醒邮箱">
                        {getFieldDecorator('e_mail', {
                          rules: [{
                            type: 'email', message: '请输入合理的邮箱地址!',
                          }],
                          initialValue: (data && data.e_mail) ? data.e_mail : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="提醒模板">
                        {getFieldDecorator('template', {
                          initialValue: (data && data.template) ? data.template : ''
                        })(
                            <Input rows={4} type='textarea'/>
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

export default Form.create()(SetUp);