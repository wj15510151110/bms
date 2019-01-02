/**
 * Created by hao.cheng on 2017/4/13.
 */
import './index.less'
import React, {Component} from 'react';
import {addIdentity, editIdentity} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Select, Row, Col, Button} from 'antd';

const FormItem = Form.Item;

class IdentityAdd extends Component {
  state = {

  };

  handleSubmit = (e) => {
    let {EditData, getIdentityList} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (EditData) {
          editIdentity({...values,id: EditData.id}).then(res => {
            if (res && res.status) {
              notices.success(res.msg || '编辑成功')
              getIdentityList()

            } else {
              notices.error(res.msg)
            }
          })
          this.handleCancel()
        } else {
          addIdentity(values).then(res => {
            if (res && res.status) {
              this.props.history.push('/app/system/identityList')
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
          {!EditData ? <BreadcrumbCustom first="系统设置" second="新增身份"/> : ''}
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title={!EditData ? "新增身份" : ' 修改身份'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>


                      <FormItem {...formItemLayout} label="身份名称">
                        {getFieldDecorator('name', {
                          rules: [{
                            required: true,
                            message:'请填写身份名称'
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
export default Form.create()(IdentityAdd);