import React from 'react'
import ConfigComp from '../../global/layout/configComp'
import { Col, Row } from 'antd'
import HeaderComp from '../../global/layout/header'
import CartContent from './contents'
import FooterComp from '../landing/footer'

export default function CartComp() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />
                <Row>
                    <Col
                        span={24} 
                    >
                        <CartContent />
                    </Col>
                </Row>
                <FooterComp />
            </ConfigComp>
        </>
    )
}
