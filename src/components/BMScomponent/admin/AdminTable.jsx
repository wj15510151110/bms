/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';

import './index.less'

import filter from 'lodash/filter';

import AdminEdit from "./AdminEdit";
import {getAdminList, delAdmin, reset} from '../../../axios'

import {notices} from '../../../utils/notification'
import classNames from 'classnames'

import moment from 'moment';

import {Table, Input, Popconfirm, Button, Modal, Form, Card} from 'antd';

const InputGroup = Input.Group;

class CategoryTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      token: '',
      EditData: '',
      selectedColumnKeys: [],
      selectedColumnIndexes: [],
      visibleReset: false,
      initialData: [],
      UserId: '',
      columns: [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '用户名',
        dataIndex: 'username',
        key: 'name',
      },{
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '创建时间',
        dataIndex: 'c_time',
        key: 'c_time',
        render: (v) => this.getTime(v)
      }, {
        title: '更新时间',
        dataIndex: 'up_time',
        key: 'up_time',
        render: (v) => this.getTime(v)
      }, {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 200,
        render: (text, record) => {
          return <div style={{display:'flex'}}>

            {/* <a style={{color: '#40a9ff', marginRight: 8}} onClick={() => this.Edit(record)}>编辑</a>*/}


            <a style={{color: '#40a9ff', marginRight: 8}} onClick={() => this.reset(record.id)}>重置密码</a>

            <Popconfirm
                title="是否删除?"
                onConfirm={() => this.del(record.id)}
            >
              <a style={{color: '#40a9ff'}}>删除</a>
            </Popconfirm>

          </div>
        }
      },]
    }
  }

  componentDidMount() {
    this.getAdminList()
  }


  getTime = (v) => {
    return moment(v).format('YYYY-MM-DD HH:mm')
  }

  handleOkReset = (e) => {
    console.log(e);
    this.setState({
      visibleReset: false,
    });
  }

  handleCancelReset = (e) => {
    console.log(e);
    this.setState({
      visibleReset: false,
    });
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
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let {UserId} = this.state
        reset(UserId, values).then(res => {
          if (res && res.status) {
            notices.success('修改成功')
            this.setState({
              visibleReset: false
            })
          } else {
            notices.error(res.msg)
          }
        })
      }
    });
  };

  reset = (id) => {
    this.setState({
      visibleReset: true,
      UserId: id
    })
  }

  del = (id) => {
    delAdmin(id).then(res => {
      if (res && res.status) {
        notices.success(res.msg)
        this.getAdminList()
      } else {
        notices.error(res.msg)
      }
    })
  }

  getAdminList = () => {
    getAdminList().then(res => {
      this.overtime(res)
      if (res && res.status) {
        this.setState({
          initialData: res.data,
          data: res.data || [],
        })
      } else {
        notices.error(res && res.msg === 'unauthorized' ? '没有权限' : res.msg)
      }
    })
    this.setStateData()
  }

  overtime = (v) => {
    if (v) {
      if (v.msg === 'unauthorized') {
        return this.props.history.push('/login')
      }
    }

  }

  setStateData = () => {
    let selectedColumnIndexes = [];
    let selectedColumnKeys = [];
    this.state.columns.forEach((column, idx) => {
      selectedColumnKeys.push(column.dataIndex);
      selectedColumnIndexes.push(idx);
    });
    this.setState({
      selectedColumnKeys,
      selectedColumnIndexes
    })
  }

  onPressEnter = () => {
    let dataset = [];
    if (!this.state.token) {
      dataset = this.state.initialData.slice();
    } else {
      let columnKeysLen = this.state.selectedColumnKeys.length;
      dataset = filter(this.state.initialData, o => {
        for (var i = 0; i < columnKeysLen; i++) {
          let key = this.state.selectedColumnKeys[i];
          let str = String(o[key]);
          if (str.indexOf(this.state.token) >= 0) {
            return true;
          }

          let column = this.state.columns[this.state.selectedColumnIndexes[i]];

          if (column && typeof column.render == 'function') {
            str = column.render(o[key], o);

            if (typeof str === 'string' && str.indexOf(this.state.token) >= 0) {
              return true;
            }

            if (
                typeof str === 'object' &&
                typeof str.$$typeof === 'symbol' &&
                typeof str.props.children === 'string' &&
                str.props.children.indexOf(this.state.token) >= 0
            ) {
              return true;
            }
          }
        }

        return false;
      });
    }
    this.setState({
      data: dataset,
    });
  }


  handleInputChange = (e) => {
    this.setState({
      token: e.target.value
    });
  }

  Edit = (r) => {
    this.setState({
      visible: true,
      EditData: r
    })
  }

  handleOk = () => {
    this.setState({loading: false});
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      EditData: '',
    });
  }


  render() {

    const {data, visible, EditData} = this.state

    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.token.trim()
    });

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

    return <div>
      <div
          style={{
            margin: '0 0 25px 0',
            display: 'flex',
            justifyContent: 'space-between'
          }}
      >
        <div style={{display: 'flex'}}>
          <InputGroup className="ant-search-input" style={{width: '170px'}}>
            <Input
                value={this.state.token}
                onPressEnter={this.onPressEnter}
                onChange={this.handleInputChange}
                placeholder="请输入关键字查询"
            />
            <div className="ant-input-group-wrap">
              <Button
                  icon="search"
                  className={btnCls}
                  onClick={this.onPressEnter}
                  style={{borderRadius: '0 4px 4px 0'}}
              />
            </div>
          </InputGroup>
        </div>
      </div>
      <Table
          columns={this.state.columns}
          dataSource={data}
          rowKey='id'
      />

      <AdminEdit getAdminList={this.getAdminList} visible={visible} EditData={EditData} handleCancel={this.handleCancel}
                 handleOk={this.handleOk}/>

      <Modal
          title="重置密码"
          visible={this.state.visibleReset}
          onOk={this.handleSubmit}
          onCancel={this.handleCancelReset}
      >

        <Form>
          <Form.Item
              {...formItemLayout}
              label="新密码"
          >
            {getFieldDecorator('password', {
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
        </Form>

      </Modal>

    </div>

  }
}

export default Form.create()(CategoryTable);
