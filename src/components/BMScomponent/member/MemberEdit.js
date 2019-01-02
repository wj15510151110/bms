import React from 'react'
import MemberAdd from './MemberAdd'
import {Modal, Button} from 'antd';

export default class MemberEdit extends React.Component {

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
    const {visible, EditData,getMemberList} = this.props;

    return <div>
      <Modal
          visible={visible}
          width={1000}
          onOk={this.handleOk}
          closable={false}
          style={{top: 5}}
          footer={null}
      >
        <MemberAdd EditData={EditData} getMemberList={getMemberList} handleCancel={this.handleCancel}/>
      </Modal>
    </div>
  }
}