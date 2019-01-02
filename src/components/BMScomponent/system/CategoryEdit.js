import React from 'react'

import {Modal, Button} from 'antd';
import CategoryAdd from "./CategoryAdd";

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
    const {visible, EditData,getCategoryList} = this.props;

    return <div>
      <Modal
          visible={visible}
          width={1000}
          onOk={this.handleOk}
          closable={false}
          footer={null}
      >
        <CategoryAdd EditData={EditData} getCategoryList={getCategoryList} handleCancel={this.handleCancel}/>
      </Modal>
    </div>
  }
}