import React from 'react'
import ConfigComp from '../../global/layout/configComp'
import HeaderComp from '../../global/layout/header'
import { Col, Row } from 'antd'
import SliderComp from './slider'
import HeadListComp from './headList'
import ContentListComp from './contentList'

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
                    <Col
                        span={24}
                    >
                        <HeadListComp />
                    </Col>
                    <Col
                        span={24}
                    >
                        <ContentListComp />
                    </Col>
                </Row>
            </ConfigComp>
        </>
    )
}
