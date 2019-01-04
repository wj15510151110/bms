import './index.less'
import React, {Component} from 'react';
import {addAdmin} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Select, Row, Col, Button} from 'antd';

const FormItem = Form.Item;

class AdminAdd extends Component {
  state = {

  };

  handleSubmit = (e) => {
    let {EditData, getAdminList} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (EditData) {
         /* editAdmin({...values,id: EditData.id}).then(res => {
            if (res && res.status) {
              notices.success(res.msg || '编辑成功')
              getAdminList()

            } else {
              notices.error(res.msg)
            }
          })*/
          this.handleCancel()
        } else {
          addAdmin(values).then(res => {
            if (res && res.status) {
              this.props.history.push('/app/admin/list')
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
          {!EditData ? <BreadcrumbCustom first="管理员" second="新增人员"/> : ''}
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title={!EditData ? "新增人员" : ' 修改人员'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>


                      <FormItem {...formItemLayout} label="用户名">
                        {getFieldDecorator('username', {
                          rules: [{
                            required: true,
                            message:'请填写用户名'
                          }],
                          initialValue: (EditData && EditData.name) ? EditData.name : ''
                        })(
                            <Input/>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="密码">
                        {getFieldDecorator('password', {
                          rules: [{
                            required: true,
                            message:'请填写密码'
                          }],
                          initialValue: (EditData && EditData.name) ? EditData.name : ''
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
                          initialValue: (EditData && EditData.name) ? EditData.name : ''
                        })(
                            <Input/>
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
export default Form.create()(AdminAdd);