import React, { useEffect, useState } from 'react'
import { 
    Button,
    Col,
    ConfigProvider, 
    Input, 
    Layout,
    Menu,
    Row
} from 'antd'
import { Link, useLocation } from 'react-router-dom';
import { IconShoppingBag } from '@tabler/icons-react';
import { useMediaQuery } from 'react-responsive';
const {
    Header,
    Content,
    Footer
} = Layout
const routes = {
    1: '/',
    2: '/menu',
    3: '/order',
    4: '/contact'
}

export default function LayoutComp(props) {

    const [activeKey, setActiveKey] = useState("1");
    const router = useLocation();
    const pathname = router.pathname

    useEffect(() => {
        let route = (pathname === "/order-summary" || pathname === "/payment-method" || pathname === "/complete") ? 3 : Object.keys(routes).find(key => routes[key] === router.pathname);
        setActiveKey(route?.toString());
    }, [pathname]);

    const isStandard = useMediaQuery({ minWidth: 1025 })
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 })

    const setSize = (standard, tablet, mobile) => {
        return isStandard ? standard : ( isTablet ? tablet : mobile )   
    }

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#FA5523',
                    },
                    components: {
                        Layout: {
                            headerBg: '#F9F9F9',
                            siderBg: '#F9F9F9',
                            triggerBg: '#F9F9F9',
                            bodyBg: '#FFFFFF',
                            footerBg: '#FFFFFF',
                            headerHeight: setSize(75, 65, 55),
                            footerPadding: '0',
                            headerPadding: setSize('10px 80px', '10px 50px', '10px 30px'), 
                        },
                        Menu: {
                            activeBarHeight: 0,
                            colorSplit: '#C5C5C5',
                            itemPaddingInline: 50,
                            fontSize: setSize(18, 16, 14),
                            colorText: '#6B6B6B',
                            itemBg: '#F9F9F9',
                        },
                        Button: {
                            controlHeightSM: 26,
                            controlHeightLG: 50,
                            fontSize: setSize(16, 12, 12),
                        },
                        Select: {
                            colorBgContainer: '#FA5523',
                            colorTextPlaceholder: '#F9F9F9',
                            colorText: '#F9F9F9',
                            colorBorder: '#D9D9D9',
                            controlHeight: 45,
                            borderRadius: 50,
                            colorBgElevated: '#FA5523',
                            optionSelectedBg: '#E53905'
                        },
                        Tabs: {
                            inkBarColor: '',
                            fontSize: 18,
                            colorText: '#6B6B6B',
                            colorPrimary: '#000000',
                            horizontalItemPadding: '20px 90px',
                            itemHoverColor: '#000000'
                        },
                        Card: {
                            colorBgContainer: '#FFFFFF',
                            bodyPadding: '0.5em 1em'
                        },
                        Input: {
                            fontSize: setSize(16, 12, 12),
                            controlHeightLG: 80,
                        },
                    }
                }}
            >
                <Layout>
                    <Header
                        className='flex items-center border-b border-[#C5C5C5] z-1 sticky top-0'
                    >
                        {
                            !isMobile && (
                                <div
                                    className='h-[50%] rounded-sm bg-[#E83600] lg:w-[8%] md:w-[10%] sm:w-[10%] w-[15%]'
                                >
                                </div>
                            )
                        }
                        <Menu
                            theme='light'
                            mode='horizontal'
                            selectedKeys={[activeKey]} 
                            defaultSelectedKeys={['1']} 
                            onClick={e => setActiveKey(e)}
                            className='felx flex-1 justify-center min-w-0 relative font-semibold'
                        >
                            <Menu.Item
                                key={'1'}
                            >
                                <Link 
                                    to={'/'}
                                >
                                    Home
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                key={'2'}
                            >
                                <Link 
                                    to={'/menu'}
                                >
                                    Menu
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                key={'3'}
                            >
                                <Link 
                                    to={'/order'}
                                >
                                    Order
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                key={'4'}
                            >
                                <Link 
                                    to={'/contact'}
                                >
                                    Contact
                                </Link>
                            </Menu.Item>
                        </Menu>  
                        <div 
                            className='flex items-center'
                        >
                            <IconShoppingBag 
                                color='#6B6B6B'
                                className='mr-5'
                            />
                            <Button
                                type='primary'
                            >
                                Order Now!
                            </Button>
                        </div>
                    </Header>
                    <Content>
                        <div
                            className='bg-white'
                        >
                            {props.children}
                        </div>
                    </Content>
                    <Footer
                        className='lg:text-[14px] md:text-[12px] text-[10px]'
                    >
                        <Row
                            justify={"space-between"}
                            align={"top"}
                            style={{
                                padding: setSize('30px 80px', '30px 50px', '30px 30px'),
                                width: "100%"
                            }}
                        >
                            {
                                isMobile && (
                                    <Col
                                        span={setSize(8, 8, 24)}
                                        className='p-10'
                                    >
                                        <div
                                            className='text-[#6B6B6B] text-center font-medium pb-7'
                                        >
                                            Get Exclusive Deals in your Inbox
                                        </div>
                                        <div>
                                            <Input 
                                                placeholder='Insert your email here (e.g youremail@gmail.com)'
                                                suffix={
                                                    <Button
                                                        size='small'
                                                        type='primary'
                                                        style={{
                                                            borderRadius: 50
                                                        }}
                                                        className='rounded-[50]'
                                                    >
                                                        Subscribe
                                                    </Button>
                                                }
                                                style={{
                                                    borderRadius: 50,
                                                }}
                                            />
                                        </div>
                                    </Col>
                                )
                            }
                            <Col
                                span={setSize(8, 8, 12)}
                            >
                                <div
                                    className="h-[100px] lg:h-[120px] lg:w-[80%] md:w-[80%] w-[100%] bg-[#DCDCDC]"
                                />
                                <div
                                    className='lg:text-[14px] md:text-[12px] text-[10px]'
                                >
                                    Company # 490039-445, Registered with <br></br> House of companies.
                                </div>
                            </Col>
                            {
                                !isMobile && (
                                    <Col
                                        span={setSize(8, 10, 12)}
                                        className='px-5'
                                    >
                                        <div
                                            className='text-[#6B6B6B] text-center lg:font-bold md:font-semibold lg:pb-12 pb-7 md:text-[16px] lg:text-[20px]'
                                        >
                                            Get Exclusive Deals in your Inbox
                                        </div>
                                        <div>
                                            <Input 
                                                placeholder='Insert your email here (e.g youremail@gmail.com)'
                                                suffix={
                                                    <Button
                                                        size={setSize('medium', 'small', '')}
                                                        type='primary'
                                                        style={{
                                                            borderRadius: 50
                                                        }}
                                                    >
                                                        Subscribe
                                                    </Button>
                                                }
                                                style={{
                                                    borderRadius: 50,
                                                    padding: 10
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    
                                )
                            }
                            <Col
                                span={setSize(6, 6, 12)}
                                className='lg:pl-20 md:pl-0 pl-10'
                            >
                                 <div
                                    className='text-[#6B6B6B] lg:font-bold font-semibold lg:text-lg md:text-[15px] text-sm'
                                >
                                    Legal Page
                                </div>
                                <div
                                    className='text-[#393939] lg:pt-5 md:pt-4 pt-2.5 lg:text-[14px] md:text-[14px] text-[12px]'
                                >
                                    Terms and Condition
                                </div>
                                <div
                                    className='text-[#393939] lg:pt-3 md:pt-2 pt-1 lg:text-[14px] md:text-[14px] text-[12px]'
                                >
                                    Privacy
                                </div>
                                <div
                                    className='text-[#393939] lg:pt-3 md:pt-2 pt-1 lg:text-[14px] md:text-[14px] text-[12px]'
                                >
                                    Cookies
                                </div>
                                <div
                                    className='text-[#393939] lg:pt-3 md:pt-2 pt-1 lg:text-[14px] md:text-[14px] text-[12px]'
                                >
                                    Modern Slavery Statement
                                </div>
                            </Col>
                        </Row>
                        <Row
                            justify={setSize("space-between", "space-between", "center")}
                            align={"top"}
                            style={{
                                padding: setSize('10px 80px', '10px 50px', '10px 30px'),
                                width: "100%",
                                backgroundColor: '#6B6B6B',
                                color: '#FFFFFF',
                            }}
                        >
                            <Col
                                span={setSize(12, 12, 24)}
                                className='lg:text-left md:text-left text-center'
                            >
                                Dosirak Copyright 2025, All Rights Reserved.
                            </Col>
                            <Col 
                                className='flex'
                            >
                                <div
                                    className='pr-10'
                                >
                                    Privacy Policy
                                </div>
                                <div
                                    className='pr-10'
                                >
                                    Term
                                </div>
                                <div>
                                    Pricing
                                </div>
                            </Col>
                        </Row>
                    </Footer>
                </Layout>
            </ConfigProvider>
        </>
    )
}
