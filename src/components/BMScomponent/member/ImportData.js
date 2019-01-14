import React from 'react'
import {Button, Upload, Icon} from 'antd'
import {notices} from '../../../utils/notification'

import ImportListData from "./ImportListData";

export default class ImportData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      importList: '',
      callGrandsonMethod: ''
    }
  }

  onImportList = (v) => {
    this.setState({
      importList: v.data,
      cmdbHostColumns: v.title

    })
  }

  childMethod = () => {
    this.setState({
      importList: ''
    })
    this.state.callGrandsonMethod && this.state.callGrandsonMethod()
  }

  callGrandsonMethod = (v) => {
    this.setState({
      callGrandsonMethod: v
    })
  }

  componentWillMount() {
    this.props.getChildFn(this.childMethod)
  }

  render() {
    let _this = this
    const upload = {
      name: 'file',
      action: '/kylinclub/member/import',
      accept: '.xlsx',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          notices.success(`${info.file.name} 上传成功。`);
          console.log(info.file, 'file ');
          _this.onImportList(info.file.response.data)
        } else if (info.file.status === 'error') {
          notices.error(`${info.file.name} 上传失败。`);
        }
      },
    };

    let center = <div style={{display: 'flex'}}>
      <div style={{width: '50%', height: '100%'}}>
        <Upload {...upload}
                className="ant-tab-btn"
        >
          <Button type="ghost">
            <Icon type="upload"/> 导入数据
          </Button>
        </Upload>
      </div>
      <div style={{width: '50%', height: '100%'}}>
        <div>1.只支持导入后缀为.xlsx的excel文件</div>
        <div>2.会创建新数据,不会覆盖原数据</div>
        {/*<div>3.点击 <a href={
          this.props.cmdbhost
            ?
            `/cmdb/host/template?orgid=${this.props.orgId}`
            :
            `/cmdb/custom/template?orgid=${this.props.orgId}&eid=${this.props.eid}`
        }>下载模板</a><span style={{color:'red'}}> .请使用模板导入</span></div>*/}
      </div>
    </div>
    let table = <div>
      <ImportListData
          getMemberList={this.props.getMemberList}
          importList={this.state.importList}
          cmdbHostColumns={this.state.cmdbHostColumns}
          callGrandsonMethod={this.callGrandsonMethod}
      />
    </div>
    return (
        <div>
          {
            this.state.importList ? table : center
          }
        </div>
    )
  }
}


