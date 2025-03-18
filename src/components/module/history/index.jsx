import React from 'react'
import { Col, Row } from 'antd'
import ConfigComp from '../../global/layout/configComp'
import HeaderComp from '../../global/layout/header'
import ListHistory from './list'
import FooterComp from '../landing/footer'

export default function HistoryComp() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />    
                <Row>
                    <Col span={24}>
                        <ListHistory />
                    </Col>
                    <Col
                        span={24}
                    >
                        <FooterComp />
                    </Col>
                </Row>
            </ConfigComp>
        </>
    )
}
