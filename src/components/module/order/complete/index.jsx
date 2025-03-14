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
import { IconCreditCardPay, IconHomeFilled, IconShoppingBagCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import RedirectComp from '../payment/redirect';
import dayjs from 'dayjs';

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
        handleGetInvoice,
        resHistory,
        resOrder
    } = useOrder();

    useEffect(() => {
        setCurrStep(3)
        handleGetInvoice(localStorage.getItem("resPayment") && JSON.parse(localStorage.getItem("resPayment")).id)
    }, []);

    useEffect(() => {
        if (resHistory) {
            localStorage.removeItem("linkPayment")
            localStorage.removeItem("resPayment")
            localStorage.removeItem("formatAmount")
            localStorage.removeItem("resPayment")
            localStorage.removeItem("newResPayment")
            localStorage.removeItem("resCallback")
            localStorage.removeItem("resHistory")
            localStorage.removeItem("addressUserCurr")
            localStorage.removeItem("selectedResto")
            localStorage.removeItem("subRestoAddress")
        }
    }, [resHistory]);

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

    let exDate = dayjs(resOrder && resOrder.pre_order).format('dddd, DD MMM YYYY HH:mm') + '-' + dayjs(resOrder && resOrder.pre_order).add(1, 'hour').format('HH:mm')

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
                                        Your Order has Been Recorded
                                    </div>
                                    <div>
                                        <span style={{ color: '#838383' }} className='lg:text-[14px] md:text-[12px] text-[10px]'>Estimated delivery time <span style={{ backgroundColor: 'rgba(232, 54, 0, 0.1)', color: '#E83600', textDecoration: 'underline', padding: 4 }}>{exDate}</span></span>
                                    </div>
                                    <div
                                        className='border border-[#287D3C] bg-[#287D3C0D] flex items-center mt-3 lg:px-[20px] lg:py-[12px] md:px-[18px] md:py-[10px] px-[10px] py-[8px] rounded-[10px]'
                                    >
                                        <IconHomeFilled 
                                            color='#287D3C'
                                            size={setSize(20, 18, 16)}
                                            style={{
                                                marginRight: setSize(10, 8, 5)
                                            }}
                                        />
                                        <span
                                            className='text-[#287D3C] lg:text-[14px] md:text-[12px] text-[10px]'
                                        >
                                            {resOrder && resOrder.address_order}
                                        </span>
                                    </div>
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
                                        width: '100%'
                                        }}
                                        onClick={() => {localStorage.removeItem("resOrder"), navigate("/")}}
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
