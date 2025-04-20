import React, { useEffect, useState } from 'react'
import { Button, Col, ConfigProvider, Layout, Menu, Row } from 'antd';
import ConfigComp from './configComp';
import { useAuth } from '../../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconBasket, IconMenu2, IconRosetteFilled, IconShoppingBag } from '@tabler/icons-react';
import DrawerMenu from './drawerMenu';
const { Header } = Layout;

export default function HeaderComp() {

    const { setSize, isStandard, isMobile, isTablet, routes } = useAuth()

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeKey, setActiveKey] = useState("1");
    const [isDrawer, setIsDrawer] = useState(false);

    const router = useLocation();
    const pathname = router.pathname

    const navigate = useNavigate()

    useEffect(() => {
        let route = (pathname === "/order-summary" || pathname === "/payment-method" || pathname === "/complete") ? 3 : Object.keys(routes).find(key => routes[key] === router.pathname);
        setActiveKey(route?.toString());
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    return (
        <>
            <ConfigComp>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#E83600'
                        },
                        components: {
                            Layout: {
                                headerBg: "#FFFFFF",
                                headerHeight: setSize((isScrolled ? 70 : 60), 55, 40),
                                headerPadding: setSize((isScrolled ? '0px 50px' : '0px 20px'), '0px 10px', '0px 10px'),
                            },
                            Menu: {
                                itemHeight: '80%',
                                fontFamily: 'Plus Jakarta Sans',
                                itemPaddingInline: 50,
                                fontSize: 20,
                                colorText: '#A5ABB3',
                                itemBg: '#FFFFFF',
                                colorSplit: `${pathname === '/contact' ? '#A5ABB3' : 'none'}`,
                            },
                            Button: {
                                fontFamily: 'Plus Jakarta Sans',
                                borderRadius: 4,
                            }
                        }
                    }}
                >
                    <Layout>
                        <Header
                            className={`fixed top-0 transition-all z-50 bg-white self-center ${isScrolled ? 'w-full mt-0 border-b border-gray-300' : 'w-[90%] mt-5 mx-auto self-center rounded-lg'} ${pathname === '/contact' && 'border border-[#A5ABB3]'}`}
                        >
                            <Row
                                justify={"space-between"}
                                align={"middle"}
                                gutter={[12, 12]}
                                className='h-full'
                            >
                                {
                                    !isStandard && (
                                        <Col 
                                            style={{
                                                display: 'flex',
                                                alignItems:'center',
                                                height: '100%',
                                                width: '50%'
                                            }}
                                        >
                                            <IconMenu2 
                                                color='#6B6B6B'
                                                onClick={() => setIsDrawer(true)}
                                                size={30}
                                            />
                                            <div>
                                                <img src='/assets/logos.png' alt='Logo Dosirak' width={setSize("55px", "40px", "32px")} style={{ paddingLeft: setSize(0, 5, 5) }}/>
                                            </div>
                                        </Col>
                                    )
                                }
                                {
                                    isStandard && (
                                        <>
                                            <Col
                                                style={{ margin: !isStandard ? '0 auto' : ''}}
                                            >
                                                <div className='flex justify-center'>   
                                                    <img src='/assets/logos.png' alt='Logo Dosirak' width={setSize("55px", "40px", "32px")} style={{ paddingLeft: setSize(0, 100, 0), paddingRight: setSize(10, 0, 40) }}/>
                                                </div>
                                            </Col>
                                            <Col
                                                className='w-[50%]'
                                            >
                                                <Menu
                                                    theme='light'
                                                    mode='horizontal'
                                                    selectedKeys={[activeKey]} 
                                                    defaultSelectedKeys={['1']} 
                                                    onClick={e => setActiveKey(e)}
                                                    className={`flex flex-1 ${setSize("justify-center", "justify-start", "justify-start")} min-w-0 relative font-semibold`}
                                                    overflowedIndicator={<IconMenu2 />}
                                                    disabledOverflow={true}
                                                >
                                                    <Menu.Item key={'1'}><Link to={'/'}>Home</Link></Menu.Item>
                                                    <Menu.Item key={'2'}><Link to={'/menu'}>Menu</Link></Menu.Item>
                                                    <Menu.Item key={'3'}><Link to={'/order'}>Order</Link></Menu.Item>
                                                    {/* <Menu.Item key={'12'}><Link to={'/history'}>History</Link></Menu.Item> */}
                                                    <Menu.Item key={'4'}><Link to={'/contact'}>Contact</Link></Menu.Item>
                                                </Menu>  
                                            </Col>
                                        </>
                                    )   
                                }
                                {
                                    <Col>
                                        <div 
                                            className='flex items-center cursor-pointer'
                                        >
                                            <div
                                                className='relative lg:w-10 md:w-10 w-8 lg:h-10 md:h-8 h-6 lg:mr-3 md:mr-3 mr-1' 
                                                onClick={() => navigate("/order")}
                                            >
                                                <IconRosetteFilled 
                                                    color='#E83600'
                                                    size={setSize(40, 35, 24)}
                                                    className='absolute'
                                                />
                                                <IconShoppingBag 
                                                    color='#FFFFFF'
                                                    size={setSize(20, 20, 16)}
                                                    className='absolute lg:top-2.5 lg:left-2.5 md:top-2 md:left-2 top-1 left-1'
                                                />
                                            </div>
                                            <Button
                                                type='primary'
                                                onClick={() => navigate("/order")}
                                                style={{
                                                    height: setSize(30, 30, 20),
                                                    fontSize: setSize(14, 12 ,10)
                                                }}
                                            >
                                                Order Now!
                                            </Button>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </Header>
                    </Layout>
                    <DrawerMenu 
                        isOpen={isDrawer}
                        setIsOpen={setIsDrawer}
                    />
                </ConfigProvider>
            </ConfigComp>
        </>
    )
}
