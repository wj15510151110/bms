/**
 * Created by hao.cheng on 2017/4/13.
 */
import './index.less'
import React, {Component} from 'react';
import {addMember, editMember, getIdentityList, getCategoryList} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import locale from 'antd/lib/date-picker/locale/zh_CN';

import {
  Card, Form, Input, Select, Row, Col, Button, Radio,
  InputNumber, DatePicker
} from 'antd';


import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const FormItem = Form.Item;
const Option = Select.Option;

class MemberAdd extends Component {
  state = {
    confirmDirty: false,
    IdentityData: '',
    CategoryData: ''
  };

  componentDidMount() {
    getIdentityList().then(res => {
      this.setState({
        IdentityData: res.data
      })
    })
    getCategoryList().then(res => {
      this.setState({
        CategoryData: res.data
      })
    })
  }

  handleSubmit = (e) => {
    let {EditData, getMemberList} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let identity = values.identity.join(',')
        let birthday = values.birthday ? values.birthday.format("YYYY-MM-DD") : ''

        if (EditData) {
          editMember(EditData.id, {...values, identity, birthday, id: EditData.id}).then(res => {
            if (res && res.status) {
              notices.success(res.msg)
              getMemberList()

            } else {
              notices.error(res.msg)
            }
          })
          this.handleCancel()
        } else {
          addMember({...values, identity, birthday}).then(res => {
            if (res && res.status) {
              this.props.history.push('/app/member/list')
            } else {
              notices.error(res.msg)
            }
          })
        }

      }

    });
  };

  handleCancel = () => {
    this.props.form.resetFields()
    this.props.handleCancel()
  }

  render() {
    const {EditData} = this.props

    const {CategoryData, IdentityData} = this.state

    const initIdentity =  IdentityData && new Array(IdentityData[0].name)

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
          {!EditData ? <BreadcrumbCustom first="会员管理" second="新增会员"/> : ''}
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title={!EditData ? "新增会员" : ' 修改会员'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>


                      <FormItem {...formItemLayout} label="姓名">
                        {getFieldDecorator('name', {
                          rules: [{
                            required: true,
                            message: '请填写姓名!'
                          }],
                          initialValue: (EditData && EditData.name) ? EditData.name : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="英文名称">
                        {getFieldDecorator('ename', {
                          rules: [{
                            pattern: /^[a-zA-Z]{0,15}$/,
                            message: '只能是英文!'
                          }],
                          initialValue: (EditData && EditData.ename) ? EditData.ename : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <Form.Item
                          {...formItemLayout}
                          label="性别"
                      >
                        {getFieldDecorator('sex', {
                          initialValue: (EditData && EditData.sex) ? EditData.sex : 0
                        })(
                            <Radio.Group>
                              <Radio value={0}>男</Radio>
                              <Radio value={1}>女</Radio>
                            </Radio.Group>
                        )}
                      </Form.Item>

                      <FormItem {...formItemLayout} label="权重">
                        {getFieldDecorator('weight', {
                          initialValue: (EditData && EditData.weight) ? EditData.weight : 1,
                          rules: [{
                            required: true,
                          }],
                        })(
                            <InputNumber/>
                        )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="分级"
                      >
                        {getFieldDecorator('grade', {
                          rules: [
                            {required: true, message: '请填写类别!'},
                          ],
                          initialValue: (EditData && EditData.grade) ? EditData.grade : CategoryData && CategoryData[0].name,
                        })(
                            <Select>
                              {
                                CategoryData && CategoryData.length > 0 && CategoryData.map((i,key) => (
                                    <Option key={key} value={i.name}>{i.name}</Option>
                                ))
                              }
                            </Select>
                        )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="特殊身份"
                      >
                        {getFieldDecorator('identity', {
                          rules: [
                            {required: true, message: '身份必填!', type: 'array'},
                          ],
                          initialValue: (EditData && EditData.identity) ? EditData.identity.split(',') :initIdentity ? initIdentity : '-' ,
                        })(
                            <Select mode="multiple">
                              {
                                IdentityData && IdentityData.length > 0 && IdentityData.map((v,key) => (
                                    <Option key={key} value={v.name}>{v.name}</Option>
                                ))
                              }
                            </Select>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="公司名称">
                        {getFieldDecorator('company', {
                          initialValue: (EditData && EditData.company) ? EditData.company : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="职位">
                        {getFieldDecorator('position', {
                          initialValue: (EditData && EditData.position) ? EditData.position : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="手机号">
                        {getFieldDecorator('phone', {
                          rules: [{
                            required: true,
                            message: '请填写手机号'
                          }, {
                            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                            message: '请填写正确的手机号'
                          }],
                          initialValue: (EditData && EditData.phone) ? EditData.phone : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="邮箱"
                      >
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: '请输入合理的邮箱地址!',
                          }],
                          initialValue: (EditData && EditData.email) ? EditData.email : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="地址"
                      >
                        {getFieldDecorator('addr', {
                          initialValue: (EditData && EditData.addr) ? EditData.addr : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="地点">
                        {getFieldDecorator('place', {
                          initialValue: (EditData && EditData.place) ? EditData.place : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="身份证号">
                        {getFieldDecorator('id_card', {
                          rules: [{
                            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                            message: '请输入正确的身份证号!',
                          }],
                          initialValue: (EditData && EditData.id_card) ? EditData.id_card : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>

                      <FormItem
                          {...formItemLayout}
                          label="生日"
                      >
                        {getFieldDecorator('birthday', {
                          initialValue: (EditData && EditData.birthday) ? moment(EditData.birthday, 'YYYY-MM-DD') : ''
                        })(
                            <DatePicker locale={locale} format='YYYY-MM-DD'/>
                        )}
                      </FormItem>

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

export default  Form.create()(MemberAdd);