import React, { useEffect } from 'react'
import LayoutComp from '../../../global/layout'
import { Button, Col, message, Row } from 'antd'
import { useAuth } from '../../../../context/AuthContext'
import { useOrder } from '../../../../context/OrderContext'
import CardTitleStep from '../../../global/title/cardTitleStep'
import { IconCreditCardPay, IconShoppingBag } from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'

export default function RedirectComp() {

    const navigate = useNavigate()

    const {
        setSize,
        resMessage, setResMessage,
        token,
        authUser
    } = useAuth()

    const {
        currStep, setCurrStep,
        resMessageOrder,
        resPayment,
        linkPayment
    } = useOrder();

    useEffect(() => {
        setCurrStep(2)
    }, []);

    useEffect(() => {
        if (!token && !authUser) {
            setResMessage(['error', 'Log In First!'])
            setTimeout(() => {
                navigate('/order')
            }, 2000)
        }
    }, [token, authUser]);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if ((resMessage && resMessage.length === 2)) {
            const [type, content] = resMessage;
            messageApi[type](content)
        }
    }, [resMessage]);

    useEffect(() => {
        if ((resMessageOrder && resMessageOrder.length === 2)) {
            const [type, content] = resMessageOrder;
            messageApi[type](content)
        }
    }, [resMessageOrder]);

    useEffect(() => {
        if (resPayment.status === "pending") {
            const timer = setTimeout(() => {
                window.location.href = linkPayment
            }, 3000);
    
            return () => clearTimeout(timer);
        } else {
            localStorage.removeItem("linkPayment")
            localStorage.removeItem("resPayment")
            navigate("/complete")
        }
    }, [navigate]);

console.log(linkPayment, resPayment);

    return (
        <>
            {contextHolder}
            <LayoutComp>
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
                                title={"PAYMENT"}
                            />
                        </Col>
                    </Row>
                    <Row
                        justify={"center"}
                        align={"center"}
                        style={{
                            padding: setSize(10, 8, 5),
                        }}
                    >
                         <Col
                            span={setSize(12, 18, 20)}
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: setSize(20, 16, 12),
                                textAlign: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: "center"
                                }}
                            >
                                <IconCreditCardPay 
                                    color='#287D3C'
                                    size={setSize(18, 16, 14)}
                                />
                                <div
                                    style={{
                                        color: '#287D3C',
                                        fontSize: setSize(16, 14, 12),
                                        fontWeight: 600,
                                        paddingLeft: 5 
                                    }}
                                >
                                    PAY NOW!
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: setSize(32, 28, 24),
                                    fontWeight: 600,
                                    padding: "10px 0"
                                }}
                            >
                               Make the Payment to Proceed your Order!
                            </div>
                            <div
                                className='flex justify-center'
                            >
                                <img src='/assets/img-payment.jpg' style={{ width: '50%'}} />
                            </div>
                            <div className='lg:text-[16px] md:text-[14px] text-[12px]'>
                                You will automatically be directed on 3 seconds to the payment page or
                            </div>
                            <Link
                                to={linkPayment}
                                target='_blank'
                            >
                                <Button
                                    size={setSize('large', 'medium', 'medium')}
                                    type='primary'
                                    style={{
                                    border: '1px solid #E83600',
                                    borderRadius: 50,
                                    width: '80%'
                                    }}
                                    // onClick={() => navigate(linkPayment)}
                                >
                                    Click Here to Pay your Order!
                                </Button>
                            </Link>
                        </Col>   
                    </Row>
                </div>
            </LayoutComp>
        </>
    )
}
