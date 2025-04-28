import React, { useEffect, useState } from 'react'
import { Button, Col, ConfigProvider, Layout, Menu, Row } from 'antd';
import ConfigComp from './configComp';
import { useAuth } from '../../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconBasket, IconMenu2, IconRosetteFilled, IconShoppingBag } from '@tabler/icons-react';
import DrawerMenu from './drawerMenu';
import Icon from '@ant-design/icons/lib/components/Icon';
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
                            colorPrimary: '#FF6B00'
                        },
                        components: {
                            Layout: {
                                headerBg: "#FFFFFF",
                                headerHeight: setSize(50, 40, 30),
                                headerPadding: setSize((isScrolled ? '0px 50px' : '0px 15px'), (isScrolled ? '0px 20px' : '0px 10px'), (isScrolled ? '0px 15px' : '0px 10px')),
                            },
                            Menu: {
                                itemHeight: '80%',
                                fontFamily: 'Noto Sans KR',
                                itemPaddingInline: 50,
                                fontSize: 16,
                                colorText: '#838383',
                                itemBg: '#FFFFFF',
                                colorSplit: `${(pathname === '/contact' || pathname === '/about') ? '#D8D8D8' : 'none'}`,
                            },
                            Button: {
                                fontFamily: 'Noto Sans KR',
                                borderRadius: 4,
                            }
                        }
                    }}
                >
                    <Layout>
                        <Header
                            className={`fixed top-0 transition-all z-50 bg-white self-center ${isScrolled ? 'w-full mt-0 border-b border-gray-300' : 'w-[90%] mt-5 mx-auto self-center rounded-lg'} ${(pathname === '/contact' || pathname === '/about') && 'border border-[#D8D8D8]'}`}
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
                                                size={20}
                                            />
                                            <div>
                                                <img src='/assets-v2/logo/dosirak-logo.png' alt='Logo Dosirak' width={setSize("40px", "35px", "28px")} style={{ paddingLeft: setSize(0, 5, 5) }}/>
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
                                                    <img src='/assets-v2/logo/dosirak-logo.png' alt='Logo Dosirak' width={setSize("45px", "35px", "28px")} style={{ paddingLeft: setSize(0, 100, 0), paddingRight: setSize(10, 0, 40) }}/>
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
                                                    className={`flex flex-1 ${setSize("justify-center", "justify-start", "justify-start")} min-w-0 relative`}
                                                    overflowedIndicator={<IconMenu2 />}
                                                    disabledOverflow={true}
                                                >
                                                    <Menu.Item key={'1'}><Link to={'/'}>Home</Link></Menu.Item>
                                                    <Menu.Item key={'2'}><Link to={'/menu'}>Our Menu</Link></Menu.Item>
                                                    {/* <Menu.Item key={'3'}><Link to={'/order'}>Order</Link></Menu.Item> */}
                                                    {/* <Menu.Item key={'12'}><Link to={'/history'}>History</Link></Menu.Item> */}
                                                    <Menu.Item key={'4'}><Link to={'/contact'}>Contact</Link></Menu.Item>
                                                    <Menu.Item key={'13'}><Link to={'/about'}>About</Link></Menu.Item>
                                                </Menu>  
                                            </Col>
                                        </>
                                    )   
                                }
                                {
                                    <Col>
                                        <div 
                                            className='flex items-center'
                                        >
                                            <IconShoppingBag 
                                                color='#FF6B00'
                                                size={setSize(30, 26, 22)}
                                                style={{
                                                    border: '1px solid #FF6B00',
                                                    borderRadius: 50,
                                                    padding: 3,
                                                    marginRight: setSize(10, 8, 5),
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <Button
                                                type='primary'
                                                onClick={() => navigate("/order")}
                                                style={{
                                                    height: setSize(30, 28, 22),
                                                    fontSize: setSize(12, 11 ,10)
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
