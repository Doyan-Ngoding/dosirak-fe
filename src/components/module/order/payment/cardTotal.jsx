import React from 'react'
import { 
    Button,
    Col, 
    Input, 
    Row 
} from 'antd'
import { IconShieldCheck, IconShieldCheckFilled, IconTicket } from '@tabler/icons-react'
import { useAuth } from '../../../../context/AuthContext'
import { useOrder } from '../../../../context/OrderContext'

export default function CardTotal({
    handleClick
}) {

    const {
        setSize
    } = useAuth()

    const {
        total,
        orderTemp
    } = useOrder()

    return (
        <>
            <Row
                align={"middle"}
                gutter={setSize([0, 20], [0, 18], [0, 14])}
                className='bg-white lg:p-5 md:p-3.5 p-3 rounded-lg'
            >
                <Col
                    span={24}
                >
                    <div
                        className='text-[#393939] font-bold lg:text-[24px] md:text-[20px] text-[16px]'
                    >
                        Total Order   
                    </div>
                </Col>
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 700,
                        fontSize: 20,
                    }}
                >
                    Rp. {(orderTemp && orderTemp.amount) ? parseFloat(orderTemp.amount).toLocaleString() : ''}
                </Col>
                <Col
                    span={24}
                    style={{
                        paddingTop: 15,
                    }}
                >
                    <Button
                        type='primary'
                        size={setSize("large", "medium", "medium")}
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
