import React from 'react'
import {Table} from 'antd';
import {Button} from 'antd'
import {addMember} from '../../../axios'
import {notices} from '../../../utils/notification'
export default class ImportListData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      column: '',
      data: '',
      flag: false
    }
  }

  componentWillMount() {
    this.props.callGrandsonMethod(this.grandsonMethod)
    this.onSaveData()
  }

  grandsonMethod = () => {
    this.setState({
      column: '',
      data: '',
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.importList !== nextProps.importList) {
      this.onSaveData(nextProps)
    }
  }

  getColumnsByData = obj => {
    let column = []
    //防止改变原数组


    let newList = []

    Object.keys(obj).map(key => {
      newList.push({field: obj[key], name: key})
    })


    for (let i = 0; i < newList.length; i++) {
      let item = newList[i]

      console.log(item, 'item');

      column.push({
        key: i,
        title: item.name,
        width: 80,
        dataIndex: item.field,
      })


      /* if ((item.custom == 1 || item.custom == 2 ) && item.field != 'sys_status') {
         column.push({
           key: i,
           title: item.name,
           width: 80,
           dataIndex: item.field,
         })
       }*/
      /*if (item.field == 'sys_status') {
        column.push({
          key: i,
          width: 110,
          title: item.name,
          dataIndex: item.field,
          render(v, item) {
            if (typeof v == 'string') {
              if (item.updated) {
                return <div title="" style={{color: 'red'}}>{v}</div>
              }
              if (v == '验证成功') {
                return <div title="" style={{color: 'green'}}>{v}</div>
              } else {
                return <div title="" style={{color: 'red'}}>{v}</div>
              }
            } else {
              if (item.sys_status) {
                return <div title="" style={{color: 'green'}}>{'导入成功'}</div>
              } else {
                return <div title="" style={{color: 'red'}}>{item.message || '导入失败'}</div>
              }
            }
          }
        })

      }*/


    }
    return column
  }

  onSaveData = (props) => {
    let {importList} = props || this.props
    let {cmdbHostColumns} = this.props
    let data = importList

    data = data.map((item, index) => {
      return {
        index: index + 1,
        ...item
      }
    })

    let column = cmdbHostColumns && this.getColumnsByData(cmdbHostColumns)
    this.setState({
      column,
      data
    })
  }

  onConfirmImport = () => {
    let {data} = this.state

    if (this.props.importList) {

      /* let promiseAry = data && data.map(item => {
         if (item.sys_status == '验证成功') {
           return this.fetchUpdate({...item})
         } else {
           return {...item, updated: true}
         }
       })*/

      let promiseAry = data && data.map(item => {
          return this.fetchUpdate(item)
      })
      Promise.all(promiseAry).then((res) => {
        this.props.getMemberList()
        notices.success('导入成功')
        this.setState({
          flag: true
        })
      })

      /* Promise.all(promiseAry).then((res) => {
        let dataA = []
        for (let i = 0; i < res.length; i++) {
          dataA.push({...data[i], sys_status: res[i].status, message: res[i].message})
        }
        this.setState({
          data: dataA,
          flag: true
        })
      })*/
    }
  }

  fetchUpdate = (v) => {
    return addMember(v)
  }


  render() {

    let {column, data, flag} = this.state
    console.log(data, 'data');

    return (
        column ? <div style={{position: 'relative', minHeight: '100px'}}>
          <div className="ImportListData">
            <Table
                columns={column}
                dataSource={data}
                scroll={{x: 2000}}
                rowKey='id'
            />
          </div>
          <div style={{marginTop: '20px'}}>
            <Button
                className="ImportListDataBoxBut"
                type="primary"
                style={{position: 'absolute', right: '14px', bottom: '-33px'}}
                onClick={this.onConfirmImport}
                disabled={flag}
            >
              确认导入
            </Button>
          </div>
        </div> : null
    )
  }
}

