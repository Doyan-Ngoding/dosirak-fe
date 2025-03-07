import React from 'react'
import { Col, Row } from 'antd'
import CardSummary from '../../../global/card/cardSummary'
import { useAuth } from '../../../../context/AuthContext'
import { useSummary } from '../../../../context/SummaryContext'

export default function CardSummaryComp() {

    const {
        setSize
    } = useAuth()

    const {
        totalUser,
        totalOrder,
        totalRevenue,
    } = useSummary()

    const data = [
        { title: 'Total Order', value: totalOrder || '0' },
        { title: 'Total Revenue', value: totalRevenue || '0' },
        { title: 'Total User', value: totalUser || '0' },
        { title: 'Total Visitor', value: 40689 },
    ]

    return (
        <>
            <Row
                justify={"space-between"}
                align={"middle"}
                gutter={setSize([24, 24], [6, 6], [6, 6])}
            >
                {
                    data && data.map(value => (
                        <Col
                            span={setSize(6, 6, 6)}
                        >
                            <CardSummary 
                                title={value.title}
                                value={value.value}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
