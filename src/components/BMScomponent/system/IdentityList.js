import React from 'react';
import { Row, Col, Card } from 'antd';
import IdentityTable from './IdentityTable';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const IdentityList = ({...props}) => (
    <div className="gutter-example">
      <BreadcrumbCustom first="系统设置" second="身份列表" />
      <Row gutter={16}>
        <Col className="gutter-row" md={24}>
          <div className="gutter-box">
            <Card title="身份列表" bordered={false}>
              <IdentityTable {...props}/>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
);

export default IdentityList;