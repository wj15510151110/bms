import React from 'react'

import {Modal, Button} from 'antd';
import AdminAdd from "./AdminAdd";

export default class CategoryEdit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, nextContext) {

  }


  handleOk = () => {
    let {handleOk} = this.props
    handleOk()
  }

  handleCancel = () => {
    let {handleCancel} = this.props
    handleCancel()
  }


  render() {
    const {visible, EditData,getAdminList} = this.props;

    return <div>
      <Modal
          visible={visible}
          width={1000}
          onOk={this.handleOk}
          closable={false}
          footer={null}
      >
        <AdminAdd EditData={EditData} getAdminList={getAdminList} handleCancel={this.handleCancel}/>
      </Modal>
    </div>
  }
}