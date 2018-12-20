/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import AdminTable from './AdminTable';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const AdminList = () => (
    <div className="gutter-example">
        <BreadcrumbCustom first="管理员" second="管理员列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="管理员列表" bordered={false}>
                        <AdminTable />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default AdminList;