import React from 'react'
import { 
    Col, 
    Input, 
    Row 
} from 'antd'
import { IconTicket } from '@tabler/icons-react'

export default function CardVoucher() {
    return (
        <>
            <Row
                style={{
                    marginTop: 10,
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
                        display: 'flex',  
                    }}
                >
                    <IconTicket 
                        fill='#E83600'
                        color='#000000'
                        size={24}
                        style={{
                            marginTop: 4
                        }}
                    />
                    <div
                        style={{
                            color: '#393939',
                            fontWeight: 600,
                            fontSize: 20,
                            paddingLeft: 10
                        }}
                    >
                        VOUCHER
                    </div>
                </Col>
                <Col
                    span={24}
                >
                    <Input size='larger' placeholder='Input Code Voucher'/>
                </Col>
            </Row>
        </>
    )
}
