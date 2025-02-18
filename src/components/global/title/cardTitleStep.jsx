import React from 'react'
import { 
    Col,
    Row, 
    Steps
} from 'antd'

export default function CardTitleStep({
    step,
    title,
    subTitle
}) {
    return (
        <>
            <Row
                justify={"space-between"}
                align={"middle"}
                style={{
                    backgroundColor: 'rgba(232, 54, 0, 0.9)',
                    padding: 32,
                    borderRadius: 16,
                }}
            >
                <Col>
                    <div
                        style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        {subTitle}
                    </div>
                    <div
                        style={{
                            fontFamily: 'Vina Sans',
                            fontSize: 56,
                            lineHeight: 1,
                            color: '#FFFFFF'
                        }}
                    >
                        {title}
                    </div>
                </Col>
                <Col>
                    <Steps 
                        current={step}
                        items={[
                            {
                                title: '',
                            },
                            {
                                title: '',
                            },
                            {
                                title: '',
                            },
                        ]}
                    />
                </Col>
            </Row>
        </>
    )
}
