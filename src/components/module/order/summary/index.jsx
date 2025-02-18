import React from 'react'
import LayoutComp from '../../../global/layout'
import { 
    Col, 
    ConfigProvider, 
    Row 
} from 'antd'
import CardTitleStep from '../../../global/title/cardTitleStep'
import { useOrder } from '../../../../context/OrderContext'
import DerliveryMethod from './derliveryMethod'
import OrderListComp from './orderList'
import CardAddress from './cardAddress'
import CardVoucher from './cardVoucher'
import CardTotal from './cardTotal'
import { useNavigate } from 'react-router-dom'

export default function OrderSummaryComp() {

    const navigate = useNavigate();

    const {
        currStep, 
    } = useOrder()

    const handleSubmit = async () => {
        await navigate("/payment-method")
    }

    return (
        <>
            <LayoutComp>
                <div
                    style={{
                        backgroundColor: '#F4F6F9',
                        width: '100%'
                    }}
                    
                >
                    <Row
                        style={{
                            padding: '30px 80px 10px 80px',
                        }}
                    >
                        <Col
                            span={24}
                        >
                            <CardTitleStep 
                                step={currStep}
                                subTitle={"Complete the Step!"}
                                title={"ORDER SUMMARY"}
                            />
                        </Col>
                    </Row>
                    <Row
                        style={{
                            padding: '10px 70px 10px 80px',
                            width: '100%'
                        }}
                        gutter={[12, 12]}
                    >
                        <Col
                            span={16}
                        >
                            <DerliveryMethod />
                            <OrderListComp />
                        </Col>
                        <Col
                            span={8}
                        >
                            <CardAddress />
                            <CardVoucher />
                            <CardTotal 
                                handleClick={handleSubmit}
                            />
                        </Col>
                    </Row>
                </div>
                
            </LayoutComp>
        </>
    )
}
