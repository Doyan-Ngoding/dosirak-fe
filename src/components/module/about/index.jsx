import React from 'react'
import { Col, Row } from 'antd'
import ConfigComp from '../../global/layout/configComp'
import HeaderComp from '../../global/layout/header'
import DetailComp from './detail'

export default function AboutComp() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />
                <Row>
                    <Col
                        span={24}
                    >
                        <DetailComp />
                    </Col>
                </Row>
            </ConfigComp>
        </>
    )
}
