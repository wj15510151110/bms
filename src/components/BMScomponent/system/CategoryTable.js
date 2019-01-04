/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';

import './index.less'

import {getCategoryList,overtime,delMember} from '../../../axios'

import {notices} from '../../../utils/notification'

import classNames from 'classnames'

import {Table, Input, Popconfirm, Button} from 'antd';

import filter from 'lodash/filter';

import CategoryEdit from "./CategoryEdit";

const InputGroup = Input.Group;

export default class CategoryTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      token:'',
      EditData:'',
      selectedColumnKeys: [],
      selectedColumnIndexes: [],
      initialData:[],
      columns:[{
        title: '会员类别',
        dataIndex: 'name',
        key: 'name',
      },{
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return <div>

            <a style={{color: '#40a9ff', marginRight: 8}} onClick={() => this.Edit(record)}>编辑</a>

{/*            <Popconfirm
                title="是否删除?"
                onConfirm={() => this.del(record.id)}
            >
              <a style={{color: '#40a9ff'}}>删除</a>
            </Popconfirm>*/}

          </div>
        }
      },]
    }
  }

  componentDidMount() {
    this.getCategoryList()
  }

  del = (id) => {
    delMember(id).then( res => {
      if (res && res.status) {
        notices.success(res.msg )
        this.getCategoryList()
      } else {
        notices.error(res.msg )
      }
    })
  }

  getCategoryList = () => {
    getCategoryList().then(res => {
      this.overtime(res)
      if (res && res.status) {
        this.setState({
          initialData:res.data,
          data: res.data || [],
        })
      } else {
        notices.error(res && res.msg === 'unauthorized' ? '没有权限' : res.msg)
      }
    })
    this.setStateData()
  }

  overtime = (v) => {
    if(v){
      if(v.msg === 'unauthorized'){
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



  handleInputChange = (e) =>  {
    this.setState({
      token: e.target.value
    });
  }

  Edit = (r) => {
    this.setState({
      visible: true,
      EditData:r
    })
  }

  handleOk = () => {
    this.setState({ loading: false });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      EditData:'',
    });
  }



  render() {

    const {data,visible,EditData} = this.state

    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.token.trim()
    });

    return <div>
      <div
          style={{
            margin:'0 0 25px 0',
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

      <CategoryEdit getCategoryList= {this.getCategoryList} visible={visible} EditData={EditData} handleCancel={this.handleCancel} handleOk={this.handleOk}/>

    </div>

  }

}
