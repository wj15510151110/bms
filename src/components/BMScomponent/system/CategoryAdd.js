/**
 * Created by hao.cheng on 2017/4/13.
 */
import './index.less'
import React, {Component} from 'react';
import {addCategory, editCategory} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Select, Row, Col, Button} from 'antd';

const FormItem = Form.Item;

class CategoryAdd extends Component {
  state = {

  };

  handleSubmit = (e) => {
    let {EditData, getCategoryList} = this.props
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (EditData) {
          editCategory({...values,id: EditData.id}).then(res => {
            if (res && res.status) {
              notices.success(res.msg || '编辑成功')
              getCategoryList()

            } else {
              notices.error(res.msg)
            }
          })
          this.handleCancel()
        } else {
          addCategory(values).then(res => {
            if (res && res.status) {
              this.props.history.push('/app/system/categoryList')
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
          {!EditData ? <BreadcrumbCustom first="系统设置" second="新增类别"/> : ''}
          <div className='member-add-box'>
            <Row gutter={24}>
              <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                  <Card title={!EditData ? "新增类别" : ' 修改类别'} bordered={false}>
                    <Form onSubmit={this.handleSubmit}>


                      <FormItem {...formItemLayout} label="类别名称">
                        {getFieldDecorator('name', {
                          rules: [{
                            required: true,
                            message:'请填写类别名称'
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
export default Form.create()(CategoryAdd);