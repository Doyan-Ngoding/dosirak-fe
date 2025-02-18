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
        let route = (pathname === "/order-summary" || pathname === "/payment-method") ? 3 : Object.keys(routes).find(key => routes[key] === router.pathname);
        setActiveKey(route?.toString());
    }, [pathname]);

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
                            headerHeight: 76,
                            footerPadding: '0',
                            headerPadding: '10px 80px',
                        },
                        Menu: {
                            activeBarHeight: 0,
                            colorSplit: '#C5C5C5',
                            itemPaddingInline: 50,
                            fontSize: 18,
                            colorText: '#6B6B6B',
                            itemBg: '#F9F9F9',
                        },
                        Button: {
                            controlHeightSM: 26,
                            controlHeightLG: 50,
                            fontSizeLG: 16,
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
                            fontSize: 16,
                            controlHeightLG: 80,
                        },
                    }
                }}
            >
                <Layout>
                    <Header
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderBottom: '1px solid #C5C5C5',
                            zIndex: 1,
                            position: 'sticky',
                            top: 0,
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#E83600',
                                height: '50%',
                                borderRadius: 4,
                                width: '6%'
                            }}
                        >
                        </div>
                        <Menu
                            theme='light'
                            mode='horizontal'
                            selectedKeys={[activeKey]} 
                            defaultSelectedKeys={['1']} 
                            onClick={e => setActiveKey(e)}
                            style={{
                                flex: 1,
                                minWidth: 0,
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                fontWeight: 600,
                            }}
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
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <IconShoppingBag 
                                color='#6B6B6B'
                                style={{
                                    marginRight: 20
                                }}
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
                            style={{
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            {props.children}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            fontSize: 16
                        }}
                    >
                        <div
                            style={{
                                padding: '30px 80px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div
                                style={{
                                    width: '30%'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#DCDCDC',
                                        height: 110,
                                        width: 350,
                                        marginBottom: 20
                                    }}
                                />
                                <div>
                                    Company # 490039-445, Registered with <br></br> House of companies.
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '50%',
                                    paddingLeft: 100
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 600,
                                        color: '#6B6B6B',
                                        paddingBottom: 30
                                    }}
                                >
                                    Get Exclusive Deals in your Inbox
                                </div>
                                <div>
                                    <Input 
                                        placeholder='Insert your email here (e.g youremail@gmail.com)'
                                        suffix={
                                            <Button
                                                type='primary'
                                                style={{
                                                    borderRadius: 50
                                                }}
                                            >
                                                Subscribe
                                            </Button>
                                        }
                                        style={{
                                            width: '65%',
                                            borderRadius: 50,
                                        }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    width: '20%'
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: '#6B6B6B'
                                    }}
                                >
                                    Legal Page
                                </div>
                                <div
                                    style={{
                                        color: '#393939',
                                        paddingTop: 20
                                    }}
                                >
                                    Terms and Condition
                                </div>
                                <div
                                   style={{
                                        color: '#393939',
                                        paddingTop: 20
                                    }}
                                >
                                    Privacy
                                </div>
                                <div
                                    style={{
                                        color: '#393939',
                                        paddingTop: 20,
                                    }}
                                >
                                    Cookies
                                </div>
                                <div
                                    style={{
                                        color: '#393939',
                                        paddingTop: 20,
                                    }}
                                >
                                    Modern Slavery Statement
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                backgroundColor: '#6B6B6B',
                                color: '#FFFFFF',
                                padding: '15px 80px',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <div>
                                Dosirak Copyright 2025, All Rights Reserved.
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    style={{
                                        paddingRight: 50
                                    }}
                                >
                                    Privacy Policy
                                </div>
                                <div
                                    style={{
                                        paddingRight: 50
                                    }}
                                >
                                    Term
                                </div>
                                <div>
                                    Pricing
                                </div>
                            </div>
                        </div>
                    </Footer>
                </Layout>
            </ConfigProvider>
        </>
    )
}
