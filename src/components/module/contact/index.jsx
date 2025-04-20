import React from 'react'
import FormContactComp from './formContact'
import LayoutComp from '../../global/layout'
import { Col, Row } from 'antd'
import ConfigComp from '../../global/layout/configComp'
import HeaderComp from '../../global/layout/header'
import FaqComp from './faq'
import FooterComp from '../landing/footer'

export default function ContactComp() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />
                <Row>
                    <Col
                        span={24}
                    >
                        <FormContactComp />
                    </Col>
                    <Col
                        span={24}
                    >
                        <FaqComp />
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
