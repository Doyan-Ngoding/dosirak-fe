import React from 'react'
import { Col, Row } from 'antd'
import CardSummary from '../../../global/card/cardSummary'
import { useAuth } from '../../../../context/AuthContext'

export default function CardSummaryComp() {

    const {
        setSize
    } = useAuth()

    const data = [
        { title: 'Total Order', value: 10293 },
        { title: 'Total Revenue', value: 89000 },
        { title: 'Total User', value: 204 },
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
