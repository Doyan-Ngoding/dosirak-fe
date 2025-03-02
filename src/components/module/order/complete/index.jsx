import React, { useEffect } from 'react'
import { useOrder } from '../../../../context/OrderContext';
import LayoutComp from '../../../global/layout';
import { 
    Button,
    Col,
    message,
    Row 
} from 'antd';
import CardTitleStep from '../../../global/title/cardTitleStep';
import { IconShoppingBagCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import RedirectComp from '../payment/redirect';

export default function CompleteComp() {

    const navigate = useNavigate();

    const {
        token,
        authUser,
        resMessage, setResMessage,
        setSize,
    } = useAuth()

    const {
        currStep, setCurrStep,
        resMessageOrder,
        resPayment,
        newResPayment,
        resCallback,
        handleGetInvoice
    } = useOrder();

    useEffect(() => {
        setCurrStep(3)
        handleGetInvoice(localStorage.getItem("resPayment") && JSON.parse(localStorage.getItem("resPayment")).id)
    }, []);

    useEffect(() => {
        if (resCallback === true) {
            localStorage.removeItem("linkPayment")
            localStorage.removeItem("resPayment")
            localStorage.removeItem("formatAmount")
            localStorage.removeItem("resPayment")
            localStorage.removeItem("newResPayment")
            localStorage.removeItem("resCallback")
        }
    }, [resCallback]);

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

    return (
        <>
            {contextHolder}
            <LayoutComp>
                {/* {
                    newResPayment && (newResPayment.status !== "paid" || newResPayment.status !== 'settlement') ? (
                        <>
                            <RedirectComp />
                        </>
                    ) : ( */}
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
                                        title={"COMPLETE"}
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
                                        padding: 20,
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
                                        <IconShoppingBagCheck 
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
                                            COMPLETE!
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: setSize(32, 28, 24),
                                            fontWeight: 600,
                                            padding: "10px 0"
                                        }}
                                    >
                                        Chef will start cooking for you!
                                    </div>
                                    {/* <div>
                                        <span style={{ color: '#838383' }}>Estimated delivery time <span style={{ backgroundColor: 'rgba(232, 54, 0, 0.1)', color: '#E83600', textDecoration: 'underline', padding: 4 }}>00:59:00</span></span>
                                    </div> */}
                                    <div
                                        className='flex justify-center'
                                    >
                                        <img src='/assets/img-complete.jpg' style={{ width: '50%'}} />
                                    </div>
                                    <Button
                                        size={setSize('large', 'medium', 'medium')}
                                        style={{
                                        color: '#E83600',
                                        border: '1px solid #E83600',
                                        borderRadius: 50,
                                        width: '80%'
                                        }}
                                        onClick={() => navigate("/")}
                                    >
                                        Back To Home
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    {/* )
                } */}
            </LayoutComp>
        </>
    )
}
