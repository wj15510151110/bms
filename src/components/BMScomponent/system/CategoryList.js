/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import CategoryTable from './CategoryTable';
import BreadcrumbCustom from '../../BreadcrumbCustom';

const CategoryList = ({...props}) => (
    <div className="gutter-example">
      <BreadcrumbCustom first="系统设置" second="类别列表" />
      <Row gutter={16}>
        <Col className="gutter-row" md={24}>
          <div className="gutter-box">
            <Card title="类别列表" bordered={false}>
              <CategoryTable {...props}/>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
);

export default CategoryList;