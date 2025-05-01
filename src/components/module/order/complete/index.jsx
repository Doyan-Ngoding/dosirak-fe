import React, { useEffect } from 'react'
import { useOrder } from '../../../../context/OrderContext';
import LayoutComp from '../../../global/layout';
import { 
    Breadcrumb,
    Button,
    Col,
    ConfigProvider,
    Input,
    message,
    Row 
} from 'antd';
import CardTitleStep from '../../../global/title/cardTitleStep';
import { IconChevronCompactRight, IconChevronRight, IconCreditCardPay, IconHomeFilled, IconMapPin, IconShoppingBagCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import RedirectComp from '../payment/redirect';
import dayjs from 'dayjs';
import ConfigComp from '../../../global/layout/configComp';
import HeaderComp from '../../../global/layout/header';
import FooterComp from '../../landing/footer';

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
                navigate('/cart')
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
            <ConfigComp>
                <HeaderComp />
                <div
                    className='lg:pt-[100px] md:pt-[80px] pt-[70px] lg:px-[50px] md:px-[30px] px-[20px]'
                >
                    <div
                        style={{
                            marginBottom: setSize(20, 16, 12)
                        }}
                    >
                        <img src='/assets-v2/banner/little-1.png' width={"100%"} />
                    </div>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#FF6B00',
                            },
                            components: {
                                Select: {
                                    colorBgContainer: '#FFFFFF',
                                    colorTextPlaceholder: '#84888E',
                                    colorText: '#000000',
                                    colorBorder: '#A5ABB3',
                                    controlHeight: setSize(32, 28, 28),
                                    fontSize: setSize(12, 10, 10),
                                    borderRadius: 4,
                                    colorBgElevated: '#FFFFFF',
                                    optionSelectedBg: '#E83600',
                                    optionSelectedColor: '#FFFFFF',
                                    fontSizeIcon: setSize(12, 10, 8)
                                },
                                DatePicker: {
                                    controlHeight: setSize(34, 32, 32),
                                    fontSize: setSize(12, 10, 10),
                                    borderRadius: 4,
                                    colorBorder: '#A5ABB3',
                                    fontSizeIcon: setSize(12, 10, 8),
                                    cellWidth: setSize(40, 30, 25),
                                    colorTextPlaceholder: '#84888E'
                                },
                                Button: {
                                    controlHeight: setSize(32, 24, 24),
                                    fontSize: setSize(12, 10, 10),
                                },
                                Breadcrumb: {
                                    fontSize: setSize(11, 10, 9),
                                    fontFamily: 'Noto Sans KR',
                                    itemColor: '#FF6B00',
                                    lastItemColor: '#FF6B00',
                                    linkColor: '#FF6B00',
                                    separatorMargin: 3
                                },
                                Input: {
                                    fontSize: setSize(12, 10, 8)
                                }  ,
                                Card: {
                                    colorBorderSecondary: '#A5ABB3'
                                } 
                            }
                        }}
                    >
                        <Breadcrumb 
                            items={[
                                {
                                title: <a href="/menu" style={{ textDecoration: 'underline' }}>MENU</a>,
                                },
                                {
                                title: <a href="/menu" style={{ textDecoration: 'underline' }}>CHECKOUT PROCESS</a>
                                },
                                {
                                    title: <span style={{ textDecoration: 'underline' }}>CONFIRM ORDER</span>
                                },
                            ]}
                        />
                        <Row
                            align={"bottom"}
                        >
                            <Col
                                span={setSize(12, 12, 24)}
                            >
                                <div 
                                    className='text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px]'
                                >
                                    Your Order has been Recorded
                                </div>
                                <div
                                className='text-[#818182] leading-3 font-[Noto Sans KR] font-semibold lg:text-[14px] md:text-[12px] text-[10px] pt-1'
                                >
                                    Please wait until the food arrived
                                </div>
                            </Col>
                        </Row>
                        <div>
                            <div
                                style={{
                                    color: '#393939',
                                    fontSize: setSize(12, 10, 9),
                                    fontWeight: 500,
                                    marginBottom: setSize(10, 8, 8),
                                    marginTop: setSize(20, 18, 16)
                                }}
                            >
                                Confirm Address
                            </div>
                                <Input 
                                    prefix={
                                        <IconMapPin 
                                            size={setSize(14, 12, 10)}
                                            color='#838383'
                                            style={{
                                                marginRight: setSize(5, 3, 0),
                                                marginTop: '-2px'
                                            }}
                                        />
                                    }
                                    readOnly
                                    value={resOrder && resOrder.address_order}
                                />
                        </div>
                    </ConfigProvider>
                </div>
                {/* {
                    newResPayment && (newResPayment.status !== "paid" || newResPayment.status !== 'settlement') ? (
                        <>
                            <RedirectComp />
                        </>
                    ) : ( */}
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                width: '100%'
                            }}
                        >
                            
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
                                        border: '1px solid #A5ABB3',
                                        marginTop: setSize(15, 12, 10),
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
                                                fontSize: setSize(14, 12, 12),
                                                fontWeight: 600,
                                                paddingLeft: 5 
                                            }}
                                        >
                                            COMPLETE!
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: setSize(24, 22, 20),
                                            fontWeight: 600,
                                            padding: "10px 0"
                                        }}
                                    >
                                        Thank you for your purchase!
                                    </div>
                                    <div
                                        className='flex justify-center'
                                    >
                                        <img src='/assets/img-complete.jpg' style={{ width: '50%'}} />
                                    </div>
                                    <div>
                                        <span style={{ color: '#000000' }} className='lg:text-[14px] md:text-[12px] text-[10px]'>Estimated delivery time <br />   <br /> <span style={{ marginTop: 10, backgroundColor: 'rgba(232, 54, 0, 0.1)', color: '#E83600', padding: 4 }}>{exDate}</span></span>
                                    </div>
                                    <Button
                                        type='primary'
                                        size={setSize('medium', 'medium', 'medium')}
                                        style={{
                                            color: '#ffffff',
                                            border: '1px solid #FF6B00',
                                            borderRadius: 50,
                                            width: '100%',
                                            fontSize: setSize(12, 10, 10),
                                            margin: '20px 0px 10px 0px'
                                        }}
                                        onClick={() => {localStorage.removeItem("resOrder"), navigate("/history")}}
                                    >
                                        See Order History <IconChevronRight size={setSize(12, 10, 10)} style={{ marginTop: 2 }} />
                                    </Button>
                                    <Button
                                        size={setSize('medium', 'medium', 'medium')}
                                        style={{
                                            color: '#FF6B00',
                                            border: '1px solid #FF6B00',
                                            borderRadius: 50,
                                            width: '100%',
                                            fontSize: setSize(12, 10, 10)
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
                <FooterComp />
            </ConfigComp>
        </>
    )
}
