/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import MemberTable from './MemberTable';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const MemberList = ({...props}) => (
    <div className="gutter-example">
        <BreadcrumbCustom first="会员管理" second="会员列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="会员列表" bordered={false}>
                        <MemberTable {...props}/>
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default MemberList;