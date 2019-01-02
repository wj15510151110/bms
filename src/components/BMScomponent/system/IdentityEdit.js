import React from 'react'

import {Modal, Button} from 'antd';
import IdentityAdd from "./IdentityAdd";

export default class IdentityEdit extends React.Component {

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
    const {visible, EditData,getIdentityList} = this.props;

    return <div>
      <Modal
          visible={visible}
          width={1000}
          onOk={this.handleOk}
          closable={false}
          footer={null}
      >
        <IdentityAdd EditData={EditData} getIdentityList={getIdentityList} handleCancel={this.handleCancel}/>
      </Modal>
    </div>
  }
}