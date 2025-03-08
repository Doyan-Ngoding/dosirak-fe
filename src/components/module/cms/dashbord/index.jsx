import React from 'react'
import FullComp from '../../../global/layout/full'
import { Col, Row } from 'antd'
import CardSummaryComp from './cardSummary'
import SalesChartComp from './salesChart'
import InvoiceSumComp from './invoiceSum'
import { useAuth } from '../../../../context/AuthContext'

export default function CmsComp() {

    const {
        authUser
    } = useAuth()

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
                    {
                        (authUser && authUser.role === 'superadmin') && (
                            <>
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
                            </>
                        )
                    }
                </Row>
            </FullComp>
        </>
    )
}
