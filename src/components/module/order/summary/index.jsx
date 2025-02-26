import React, { useEffect } from 'react'
import LayoutComp from '../../../global/layout'
import { 
    Col, 
    ConfigProvider, 
    message, 
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
import { useAuth } from '../../../../context/AuthContext'

export default function OrderSummaryComp() {

    const navigate = useNavigate();

    const {
        currStep, 
        cart,
    } = useOrder()

    const {
        setSize,
        token,
        resMessage,
        authUser,
        setResMessage
    } = useAuth()

    const handleSubmit = async () => {
        await navigate("/payment-method")
    }

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if ((resMessage && resMessage.length === 2)) {
            const [type, content] = resMessage;
            messageApi[type](content)
        }
    }, [resMessage]);

    useEffect(() => {
        if (!token && !authUser) {
            setResMessage(['error', 'Log In First!'])
            setTimeout(() => {
                navigate('/order')
            }, 2000)
        } else if (!cart) {
            setResMessage(['error', 'Select The Menu First!'])
            setTimeout(() => {
                navigate('/order')
            }, 2000)
        }
    }, [token, authUser, cart]);

    return (
        <>
            <LayoutComp>
                {contextHolder}
                <div
                    style={{
                        backgroundColor: '#F4F6F9',
                        width: '100%'
                    }}
                >
                    <Row
                        style={{
                            padding: setSize("30px 80px 10px 80px", "30px 50px 10px 50px", "30px 30px 10px 30px"),
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
                            padding: setSize("10px 70px 10px 80px", "10px 40px 10px 50px", "10px 20px 10px 30px"),
                            width: '100%'
                        }}
                        gutter={[12, 12]}
                    >
                        <Col
                            span={setSize(16, 14, 24)}
                        >
                            <DerliveryMethod />
                            <OrderListComp />
                        </Col>
                        <Col
                            span={setSize(8, 10, 24)}
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
