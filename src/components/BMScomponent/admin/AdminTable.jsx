/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table, Icon, Button } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <span>{text}</span>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
            <Button>Action 一 {record.name}</Button>
            <span className="ant-divider" />
            <Button>Delete</Button>
            <span className="ant-divider" />
            <Button className="ant-dropdown-link">
                More actions <Icon type="down" />
            </Button>
        </span>
    ),
}];

const data = [{
    key: '1',
    name: '我叫郑建文',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: '我喜欢吃垃圾',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: '我很贱ojbk',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

const AdminTable = () => (
    <Table columns={columns} dataSource={data} />
);

export default AdminTable;