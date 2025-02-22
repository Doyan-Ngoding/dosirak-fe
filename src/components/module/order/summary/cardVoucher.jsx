import React from 'react'
import { 
    Col, 
    Input, 
    Row 
} from 'antd'
import { IconTicket } from '@tabler/icons-react'
import { useAuth } from '../../../../context/AuthContext'

export default function CardVoucher() {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <Row
                align={"middle"}
                justify={"end"}
                gutter={[0, 12]}
                className='bg-white lg:p-5 md:p-3.5 p-3 rounded-lg mt-2.5'
            >
                <Col
                    span={24}
                    style={{
                        display: 'flex',  
                        alignItems: "center"
                    }}
                >
                    <IconTicket 
                        fill='#E83600'
                        color='#ffffff'
                        size={24}
                        style={{
                        }}
                    />
                    <div
                        className='text-[#393939] font-semibold lg:text-lg md:text-[16px] text-[12px] pl-2.5'
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
