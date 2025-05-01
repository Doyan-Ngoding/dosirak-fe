import React from 'react'
import { Col, Row } from 'antd'
import ConfigComp from '../../../global/layout/configComp'
import HeaderComp from '../../../global/layout/header'
import OrderSummaryContent from './contentv2'
import FooterComp from '../../landing/footer'

export default function OrderSummaryCompNew() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />
                <Row>
                    <Col
                        span={24} 
                    >
                        <OrderSummaryContent />
                    </Col>
                </Row>
                <FooterComp />
            </ConfigComp>
        </>
    )
}
