import './index.less'
import React, {Component} from 'react';

import {getMailBoxInfo, getMailBoxUpdate} from '../../../axios'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import {notices} from '../../../utils/notification'

import {Card, Form, Input, Select, Row, Col, Button, InputNumber, TimePicker} from 'antd';

const FormItem = Form.Item;

const Option = Select.Option


class MailBox extends Component {
    state = {
        data: ''
    };


    componentDidMount() {
        this.getInfo()
    }


    getInfo = () => {
        getMailBoxInfo().then(v => {
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
                getMailBoxUpdate({...values, id: data.id}).then(res => {
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
                <BreadcrumbCustom first="系统设置" second="邮箱设置"/>
                <div className='member-add-box'>
                    <Row gutter={24}>
                        <Col className="gutter-row" md={24}>
                            <div className="gutter-box">
                                <Card title="邮箱设置" bordered={false}>
                                    <Form onSubmit={this.handleSubmit}>

                                        <Form.Item
                                            {...formItemLayout}
                                            label="邮箱"
                                        >
                                            {getFieldDecorator('email', {
                                                rules: [{
                                                    required: true,
                                                    type: 'email', message: '请输入合理的邮箱地址!',
                                                }],
                                                initialValue: (data && data.email) ? data.email : ''

                                            })(
                                                <Input/>
                                            )}
                                        </Form.Item>


                                        <FormItem {...formItemLayout} label="密码">
                                            {getFieldDecorator('password', {
                                                rules: [{
                                                    required: true,
                                                    message: '请填密码'
                                                }],
                                                initialValue: (data && data.password) ? data.password : ''
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="smtp">
                                            {getFieldDecorator('smtp', {
                                                rules: [{
                                                    required: true,
                                                    message: '请填短信地址'
                                                }],
                                                initialValue: (data && data.smtp) ? data.smtp : ''
                                            })(
                                                <Input/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="端口">
                                            {getFieldDecorator('port', {
                                                rules: [{
                                                    required: true,
                                                    message: '请填端口'
                                                }],
                                                initialValue: (data && data.port) ? data.port : ''
                                            })(
                                                <InputNumber/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="是否使用">
                                            {getFieldDecorator('use', {
                                                rules: [{
                                                    required: true,
                                                    message: '是否使用必填'
                                                }],
                                                initialValue: (data && data.use) ? data.use : 0
                                            })(
                                                <Select>
                                                    <Option key={0} value={0}>关闭 </Option>
                                                    <Option key={1} value={1}>开启</Option>
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

export default Form.create()(MailBox);