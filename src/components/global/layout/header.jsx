import React, { useEffect, useState } from 'react'
import { Badge, Button, Col, ConfigProvider, Layout, Menu, Popover, Row } from 'antd';
import ConfigComp from './configComp';
import { useAuth } from '../../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconBasket, IconMenu2, IconRosetteFilled, IconShoppingBag, IconX } from '@tabler/icons-react';
import DrawerMenu from './drawerMenu';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useOrder } from '../../../context/OrderContext';
const { Header } = Layout;

export default function HeaderComp() {

    const { setSize, isStandard, isMobile, isTablet, routes } = useAuth()

    const {
        cart
    } = useOrder()

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeKey, setActiveKey] = useState("1");
    const [isDrawer, setIsDrawer] = useState(false);
    const [open, setOpen] = useState(false);
    const [qtyTemp, setQtyTemp] = useState(0);

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
    
    useEffect(() => {
        setQtyTemp(cart.reduce((sum, item) => sum + (item.qty || 0), 0))
    }, [cart]);
    console.log(cart)
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
                                colorSplit: `${(pathname === '/contact' || pathname === '/about' || pathname === '/history') ? '#D8D8D8' : 'none'}`,
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
                            className={`fixed top-0 transition-all z-50 bg-white self-center ${isScrolled ? 'w-full mt-0 border-b border-gray-300' : 'w-[90%] mt-5 mx-auto self-center rounded-lg'} ${(pathname === '/contact' || pathname === '/about' || pathname === '/history') && 'border border-[#D8D8D8]'}`}
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
                                            <Popover
                                                title={
                                                    <div
                                                        className='flex justify-between items-center'
                                                    >
                                                        <div
                                                            className='text-[#818182] lg:text-[12px] md:text-[11px] text-[10px]' 
                                                        >
                                                            My Cart
                                                        </div>
                                                        <div
                                                            className='flex justify-end items-center'
                                                        >
                                                            <div
                                                                className='text-[#FF6B00] lg:text-[12px] md:text-[11px] text-[10px] cursor-pointer font-bold' 
                                                            >
                                                                See My Cart
                                                            </div>
                                                            <div>
                                                                <IconX 
                                                                    color='#818182'
                                                                    size={setSize(14, 13, 12)}
                                                                    style={{
                                                                        marginLeft: 10,
                                                                        cursor: 'pointer'
                                                                    }}
                                                                    onClick={() => setOpen(false)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                content={
                                                    <>
                                                        {
                                                            (cart && cart.length > 0) ? (
                                                                cart.map((value, key) => {
                                                                    return (
                                                                        <>
                                                                            <div
                                                                                className='flex justify-between items-center lg:mt-3 lg:space-x-8 md:mt-1 md:spcae-x-5 space-x-5'
                                                                            >
                                                                                <div
                                                                                    className='flex items-center'
                                                                                >
                                                                                    <img src={`assets${value.image}`} width={setSize(30, 26, 24)} />
                                                                                    <div
                                                                                        className='lg:text-[12px] md:text-[11px] text-[10px] ml-1 text-[#262626]'
                                                                                    >
                                                                                        {value.name}
                                                                                        {
                                                                                            (value.variant && value.size) && (
                                                                                                <span className='text-[#393939] lg:text-[10px] lg:ml-2 md:text-[9px] md:ml-2 text-[8px] ml-1'>{value.variant}, {value.size}</span>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                                <div
                                                                                    className='flex items-center lg:space-x-2 md:space-x-3 space-x-3'
                                                                                >
                                                                                    <div
                                                                                        className='text-[#393939] lg:text-[12px] md:text-[11px] text-[10px]'
                                                                                    >
                                                                                        {value.qty}x
                                                                                    </div>
                                                                                    <div
                                                                                        className='text-[#262626] lg:text-[12px] md:text-[11px] text-[10px] font-bold'
                                                                                    >
                                                                                        Rp. {value.subTotal ? parseFloat(value.subTotal).toLocaleString() : '-'}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                        {
                                                            qtyTemp < 15 && (
                                                                <div
                                                                    className='bg-[#FFD39A] text-[#282828] font-[Noto Sans KR] flex justify-center items-center w-fit m-auto lg:text-[10px] lg:py-1 lg:px-3 lg:mt-2 md:text-[9px] md:py-1 md:px-3 md:mt-2 text-[8px] py-1 px-3 mt-2 lg:rounded-[8px] md:rounded-[8px] rounded-[4px]' 
                                                                >
                                                                    For your convenience, please ensure your order comprises at least 15 meals.
                                                                </div>
                                                            )
                                                        }
                                                        <ConfigProvider
                                                            theme={{
                                                                components: {
                                                                    Button: {
                                                                        colorBgContainerDisabled: '#FF6B00B3',
                                                                        colorTextDisabled: "#FFFFFF"
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            <Button
                                                                type='primary'
                                                                disabled={qtyTemp < 15 ? true : (qtyTemp > 200 ? true : false)}
                                                                size={setSize('medium', 'small', 'small')}
                                                                style={{
                                                                    fontSize: setSize(12, 10, 8),
                                                                    width: '100%',
                                                                    marginTop: setSize(5, 3, 2),
                                                                }}
                                                                onClick={() => navigate('/order')}
                                                            >
                                                                Proceed Checkout
                                                            </Button>       
                                                        </ConfigProvider>
                                                    </>
                                                }
                                                trigger={"click"}
                                                open={open}
                                                onOpenChange={(e) => setOpen(e)}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <Badge
                                                    dot={(cart && cart.length > 0) ? true : false}
                                                    style={{
                                                        margin: setSize('8px 20px', '6px 16px', '6px 11px'),
                                                        cursor: 'pointer'
                                                    }}
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
                                                </Badge>
                                            </Popover>
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
