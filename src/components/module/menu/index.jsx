import React from 'react'
import ConfigComp from '../../global/layout/configComp'
import HeaderComp from '../../global/layout/header'
import { Col, Row } from 'antd'
import SliderComp from './slider'

export default function MenuComp() {
    return (
        <>
            <ConfigComp>
                <HeaderComp />
                <Row>
                    <Col
                        span={24}
                    >
                        <SliderComp />
                    </Col>
                </Row>
            </ConfigComp>
        </>
    )
}
