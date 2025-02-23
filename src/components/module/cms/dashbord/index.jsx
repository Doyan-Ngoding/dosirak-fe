import React from 'react'
import FullComp from '../../../global/layout/full'
import { Col, Row } from 'antd'
import CardSummaryComp from './cardSummary'
import SalesChartComp from './salesChart'
import InvoiceSumComp from './invoiceSum'

export default function CmsComp() {

    return (
        <>
            <FullComp
                menu={"Dashboard"}
            >
                <Row>
                    <Col
                        span={24}
                    >
                        <CardSummaryComp />
                    </Col>
                    <Col
                        span={24}
                    >
                        <SalesChartComp />
                    </Col>
                    <Col
                        span={24}
                    >
                        <InvoiceSumComp />
                    </Col>
                </Row>
            </FullComp>
        </>
    )
}
