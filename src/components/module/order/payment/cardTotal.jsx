import React from 'react'
import { 
    Button,
    Col, 
    Input, 
    Row 
} from 'antd'
import { IconShieldCheck, IconShieldCheckFilled, IconTicket } from '@tabler/icons-react'

export default function CardTotal({
    handleClick
}) {
    return (
        <>
            <Row
                style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF'
                }}
                align={"middle"}
                gutter={[0, 12]}
            >
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >
                    Total Order   
                </Col>
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 700,
                        fontSize: 20,
                    }}
                >
                    Rp. 157,000
                </Col>
                <Col
                    span={24}
                    style={{
                        paddingTop: 15,
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        style={{
                            width: '100%',
                            borderRadius: 50
                        }}
                        icon={
                            <IconShieldCheckFilled />
                        }
                        onClick={handleClick}
                    >
                        Pay Now
                    </Button>
                </Col>
            </Row>
        </>
    )
}
