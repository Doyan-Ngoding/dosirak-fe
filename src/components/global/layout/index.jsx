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
import { IconBasket, IconMenu2, IconRosetteFilled, IconShoppingBag } from '@tabler/icons-react';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from '../../../context/AuthContext';
import ConfigComp from './configComp';
import DrawerMenu from './drawerMenu';

const {
    Header,
    Content,
    Footer
} = Layout

export default function LayoutComp(props) {

    const { setSize, isStandard, isMobile, routes, setModalSignup, authUser, hanldeLogout } = useAuth();

    const [activeKey, setActiveKey] = useState("1");
    const router = useLocation();
    const pathname = router.pathname

    const [isDrawer, setIsDrawer] = useState(false);
    
    useEffect(() => {
        let route = (pathname === "/order-summary" || pathname === "/payment-method" || pathname === "/complete") ? 3 : Object.keys(routes).find(key => routes[key] === router.pathname);
        setActiveKey(route?.toString());
    }, [pathname]);

    return (
        <>
            <ConfigComp>
                <Layout>
                    <Header
                        className='flex justify-between items-center border-b border-[#C5C5C5] z-10 sticky top-0'
                    >
                        {
                            !isStandard && (
                                <Col>
                                    <IconMenu2 
                                        color='#6B6B6B'
                                        onClick={() => setIsDrawer(true)}
                                    />
                                </Col>
                            )
                        }
                        {
                            isStandard && (
                                <>
                                    <div>   
                                        <img src='/assets/logos.png' alt='Logo Dosirak' width={setSize("45px", "45px", "35px")} />
                                    </div>
                                    <Menu
                                        theme='light'
                                        mode='horizontal'
                                        selectedKeys={[activeKey]} 
                                        defaultSelectedKeys={['1']} 
                                        onClick={e => setActiveKey(e)}
                                        className={`felx flex-1 ${setSize("justify-center", "justify-start", "justify-start")} min-w-0 relative font-semibold`}
                                        overflowedIndicator={<IconMenu2 />}
                                    >
                                        <Menu.Item key={'1'}><Link to={'/'}>Home</Link></Menu.Item>
                                        <Menu.Item key={'2'}><Link to={'/menu'}>Menu</Link></Menu.Item>
                                        <Menu.Item key={'3'}><Link to={'/order'}>Order</Link></Menu.Item>
                                        <Menu.Item key={'4'}><Link to={'/contact'}>Contact</Link></Menu.Item>
                                        {/* <Menu.Item key={'12'}><Link to={'/history'}>History</Link></Menu.Item>   */}
                                    </Menu> 
                                </>
                            )
                        }
                        <div 
                            className='flex items-center'
                        >
                            <div
                                className='relative lg:w-10 md:w-10 w-10 lg:h-10 md:h-8 h-10 mr-3'
                            >
                                <IconRosetteFilled 
                                    color='#E83600'
                                    size={setSize(40, 35, 40)}
                                    className='absolute'
                                />
                                <IconBasket 
                                    color='#FFFFFF'
                                    size={setSize(20, 20, 20)}
                                    className='absolute lg:top-2.5 lg:left-2.5 md:top-2 md:left-2 top-2.5 left-2.5'
                                />
                            </div>
                            {
                                (pathname === '/order') ? (
                                    !authUser ? (
                                        <Button
                                            type='primary'
                                            onClick={() => setModalSignup(true)}
                                        >
                                            Sign In
                                        </Button>
                                    ) : (
                                        <Button
                                            type='primary'
                                            onClick={hanldeLogout}
                                        >
                                            Sign Out
                                        </Button>
                                    )
                                ) : (
                                    <Button
                                        type='primary'
                                        onClick={hanldeLogout}
                                    >
                                        Sign Out
                                    </Button>
                                )
                            }
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
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                fontFamily: 'Vina Sans',
                                itemPaddingInline: 20,
                                fontSize: 30,
                                colorText: '#A5ABB3',
                                itemBg: '#FFFFFF',
                                colorSplit: 'none',
                            }
                        }
                    }}
                >
                    <DrawerMenu 
                        isOpen={isDrawer}
                        setIsOpen={setIsDrawer}
                        other={true}
                    />
                </ConfigProvider>
            </ConfigComp>
        </>
    )
}
