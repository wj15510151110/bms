/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';

import './index.less'

import ImportData from './ImportData'

import {getMemberList,delMember,daochu} from '../../../axios'

import {notices} from '../../../utils/notification'

import classNames from 'classnames'

import {Table, Input, Popconfirm, Button,Modal} from 'antd';

import filter from 'lodash/filter';

import MemberEdit from "./MemberEdit";

const InputGroup = Input.Group;

export default class MemberTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      token:'',
      EditData:'',
      selectedColumnKeys: [],
      selectedColumnIndexes: [],
      initialData:[],
      importDataVisible:false,
      columns:[{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        fixed: 'left',
        width: 100,
      }, {
        title: '类别',
        dataIndex: 'grade',
        key: 'grade',
      }, {
        title: '特殊身份',
        dataIndex: 'identity',
        key: 'identity',
      }, {
        title: '公司',
        dataIndex: 'company',
        key: 'company',
        render:(v)=> v ? v :'-'
      }, {
        title: '职位',
        dataIndex: 'position',
        key: 'position',
        render:(v)=> v ? v :'-'
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      }, {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render:(v)=> v ? v :'-'
      }, {
        title: '地址',
        dataIndex: 'addr',
        key: 'addr',
        editable: true,
        render:(v)=> v ? v :'-'
      }, {
        title: '地方',
        dataIndex: 'place',
        key: 'place',
        render:(v)=> v ? v :'-'
      }, {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday',
        render:(v)=> v ? v :'-'
      }, {
        title: '身份证',
        dataIndex: 'id_card',
        key: 'id_card',
        render:(v)=> v ? v :'-'
      }, {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => {
          return <div>

            <a style={{color: '#40a9ff', marginRight: 8}} onClick={() => this.Edit(record)}>编辑</a>

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
    this.getMemberList()
  }

  del = (id) => {
    delMember(id).then( res => {
      if (res && res.status) {
        notices.success(res.msg )
        this.getMemberList()
      } else {
        notices.error(res.msg )
      }
    })
  }

  getMemberList = () => {
    getMemberList().then(res => {
      this.overtime(res)
      if (res && res.status) {
        this.setState({
          initialData:res.data,
          data: res.data || [],
        })
      } else {
        notices.error(res && res.msg === 'unauthorized' ? '没有权限' : res.msg )
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

  onExportData = () => {
    window.open(`/kylinclub/member/exports`)
  }


  onImportData = () => {
    this.setState({
      importDataVisible: true
    })
  }


  getChildFn = (childFn) => {
    this.setState({
      childFn,
    })
  }


  closeDataVisible = () => {
    this.setState({
      exportDataVisible: false,
      importDataVisible: false
    })
    let {childFn} = this.state
    childFn && childFn()
  }

  render() {

    const {data,visible,EditData,importDataVisible} = this.state

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
          <InputGroup className="ant-search-input" style={{width: '170px',marginRight:'10px'}}>
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

          <div className={'right-div'}>
            <Button
                type="primary"
                className="ant-tab-btn"
                onClick={this.onExportData}
            >导出数据</Button>
            <Button
                type="primary"
                className="ant-tab-btn"
                onClick={this.onImportData}
            >导入</Button>
          </div>

        </div>
      </div>
      <Table
          columns={this.state.columns}
          dataSource={data}
          scroll={{x: 1600}}
          rowKey='id'
      />

      <MemberEdit getMemberList= {this.getMemberList} visible={visible} EditData={EditData} handleCancel={this.handleCancel} handleOk={this.handleOk}/>


      <Modal
          title="确认导入"
          onCancel={this.closeDataVisible}
          visible={importDataVisible}
          width={1000}
          footer={null}
          maskClosable={false}

      >
        <ImportData
            getMemberList={this.getMemberList}
            getChildFn={this.getChildFn}
        />
      </Modal>

    </div>

  }

}
