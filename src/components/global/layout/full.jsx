import React, { useEffect, useState } from 'react'
import ConfigComp from './configComp'
import { Badge, ConfigProvider, Drawer, Layout, Menu, message } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconBell, IconBellFilled, IconBuildingWarehouse, IconCategory, IconCategory2, IconChevronDown, IconChevronLeft, IconDashboard, IconLayoutGrid, IconMenu2, IconPower, IconSettings, IconUserFilled, IconUsers } from '@tabler/icons-react'
const { Sider, Header, Content, Footer } = Layout

export default function FullComp(props) {

    const {
        routes,
        setSize,
        isMobile,
        authUser,
        allowAdmin, 
        setResMessage,
        token,
        getUserAuth,
        resMessage
    } = useAuth()

    const [activeKey, setActiveKey] = useState("5");
    const router = useLocation();
    const pathname = router.pathname;
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const [isCollapse, setIsCollapse] = useState(false);
    const [isCollapseShow, setIsCollapseShow] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
    
    const siderStyle = {
        // overflow: 'auto',
        height: '100vh',
        position: 'sticky',
        insetInli7eStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarGutter: 'stable',
        paddingTop: setSize(70, 50, 30),
    };

    const headerStyle = {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? (isCollapse ? 'space-between' : 'end') : (isCollapseShow ? 'space-between' : 'end'),
        padding: setSize('0px 30px', '0px 15px', '0px 20px')
    }    

    useEffect(() => {
        if (token) {
            getUserAuth(token)
        }
    }, []);

    useEffect(() => {
        let route = Object.keys(routes).find(key => routes[key] === router.pathname);
        setActiveKey(route?.toString());
    }, [pathname]);

    useEffect(() => {
        if (!token && !authUser) {
            setResMessage(['error', 'Log In First!'])
            setTimeout(() => {
                navigate('/cms/login')
            }, 2000)
        }  else {
            if (token) {
                if (authUser) {
                    if (allowAdmin.includes(pathname) && !authUser?.role === "superadmin") {
                        setResMessage(['error', "You Can't Access this Page"])
                        setTimeout(() => {
                            navigate("/cms/login")
                        }, 2000)
                    }
                } else {
                    getUserAuth(token)
                }
            }
        }
    }, [token, authUser]);

    useEffect(() => {
        if ((resMessage && resMessage.length === 2)) {
            const [type, content] = resMessage;
            messageApi[type](content)
        }
    }, [resMessage]);

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: 'Nunito Sans',
                        colorPrimary: '#4880FF'
                    },  
                    components: {
                        Layout: {
                            headerBg: '#FFFFFF',
                            siderBg: '#FFFFFF',
                            headerHeight: setSize(70, 50, 50),
                        },
                        Menu: {
                            fontFamily: 'Nunito Sans',
                            itemSelectedBg: '#4880FF',
                            itemSelectedColor: '#FFFFFF',
                            itemHeight: setSize(40, 30, 20),
                            fontSize: setSize(18, 12, 12),
                        },
                        Table: {
                            headerBg: '#F1F4F9',
                            headerColor: '#202224',
                            headerBorderRadius: 12,
                            fontSize: setSize(14, 12, 10),
                        },
                        Pagination: {
                            itemSize: setSize(20, 16, 10),
                            itemHeight: setSize(20, 16, 10),
                            itemSizeSM: 16,
                            itemHeightSM: 16,
                        },
                        Select: {
                            controlHeight: setSize(24, 20, 10),
                            fontSize: setSize(12, 10, 10),
                        },
                        Tooltip: {
                            colorBgSpotlight: '#FFFFFF',
                            colorTextLightSolid: '#000000'
                        },
                        Input: {
                            controlHeight: setSize(30, 24, 20),
                            fontSize: setSize(12, 10, 10),
                        },
                        Button: {
                            controlHeight: setSize(30, 24, 20),
                            fontSize: setSize(12, 10, 10),
                        }
                    }
                }}
            >
                <Layout
                    hasSider
                >
                    <Sider
                        trigger={null}
                        breakpoint="md"
                        collapsedWidth="0"
                        style={siderStyle}
                        onCollapse={(e) => isMobile ? setIsCollapse(e) : setIsCollapseShow(e)}
                        collapsed={isMobile ? isCollapse : isCollapseShow}
                        width={setSize(200, 150, 100)}
                    >
                        <Menu
                            theme='light'
                            mode='vertical'
                            selectedKeys={[activeKey]} 
                            defaultSelectedKeys={['4']} 
                            onClick={e => setActiveKey(e)}
                        >
                            <Menu.Item key={'5'}><Link to={'/cms'}><div className='flex items-center'><IconDashboard size={setSize(18, 14, 12)} /><div className='pl-2'>Dashboard</div></div></Link></Menu.Item>
                            <Menu.Item key={'7'}><Link to={'/cms/product'}><div className='flex items-center'><IconLayoutGrid size={setSize(18, 14, 12)} /><div className='pl-2'>Products</div></div></Link></Menu.Item>
                            <Menu.Item key={'9'}><Link to={'/cms/category'}><div className='flex items-center'><IconCategory2 size={setSize(18, 14, 12)} /><div className='pl-2'>Category</div></div></Link></Menu.Item>
                            <Menu.Item key={'10'}><Link to={'/cms/restaurant'}><div className='flex items-center'><IconBuildingWarehouse size={setSize(18, 14, 12)} /><div className='pl-2'>Restaurant</div></div></Link></Menu.Item>
                            <Menu.Item key={'8'}><Link to={'/cms/user'}><div className='flex items-center'><IconUsers size={setSize(18, 14, 12)} /><div className='pl-2'>Users</div></div></Link></Menu.Item>
                           {
                                !isMobile && (
                                    <div style={{ position: 'absolute', bottom: 0, borderTop: '1px solid #DCDCDC', width: '100%' }}>
                                        <Menu.Item key={'11'}><Link to={'/cms'}><div className='flex items-center'><IconSettings size={setSize(18, 14, 12)} /><div className='pl-2'>Settings</div></div></Link></Menu.Item>
                                        <Menu.Item key={'12'} danger><Link to={'/cms'}><div className='flex items-center'><IconPower color='red' size={setSize(18, 14, 12)} /><div className='pl-2'>Logout</div></div></Link></Menu.Item>
                                        <div
                                            className='flex justify-center text-[#4880FF] py-3 border-t border-[#DCDCDC]'
                                        >
                                            <IconChevronLeft 
                                                color='#6B6B6B'
                                                size={18}
                                                onClick={() => setIsCollapseShow(true)}
                                            />
                                        </div>
                                    </div>
                                )
                           }
                        </Menu>   
                    </Sider>
                    <Layout>
                        <Header
                            style={headerStyle}
                        >
                            {
                                isCollapse && (
                                    <IconMenu2 
                                        color='#6B6B6B'
                                        size={18}
                                        onClick={() => setIsDrawer(true)}
                                    />
                                )
                            }
                            {
                                isCollapseShow && (
                                    <IconMenu2 
                                        color='#6B6B6B'
                                        size={18}
                                        onClick={() => setIsCollapseShow(false)}
                                    />
                                )
                            }
                            <div
                                className='flex items-center justify-between lg:gap-6 md:gap-4 gap-3'
                            >
                                <div className='flex items-center'>
                                    <Badge count={6} size={setSize('medium', 'small', 'small')} style={{ margin: setSize(6, 4, 3), fontSize: setSize(12, 10, 8) }}>
                                        <IconBellFilled 
                                            color='#4880FF'
                                            size={setSize(32, 24, 20)}
                                            style={{
                                                borderRadius: 50,
                                                padding: setSize(2, 1, 1),
                                                marginTop: 1
                                            }}
                                        />
                                    </Badge>
                                </div>
                                <div>
                                    <IconUserFilled 
                                        color='#565656'
                                        size={setSize(32, 24, 20)}
                                        style={{
                                            border: '1px solid #5C5C5C',
                                            borderRadius: 50,
                                            padding: setSize(2, 1, 1),
                                            marginTop: 1
                                        }}
                                    />
                                </div>
                                <div>
                                    <div className='lg:leading-4 md:leading-4 leading-3 !font-extrabold text-[#404040] lg:text-[14px] md:text-[12px] text-[10px]'>{authUser ? authUser.name : ""}</div>
                                    <div className='lg:leading-4 md:leading-4 leading-3 text-[#565656] lg:text-[14px] md:text-[12px] text-[10px]'>{authUser ? authUser.role : ""}</div>
                                </div>
                                <IconChevronDown 
                                    color='#565656'
                                    size={setSize(22, 16, 14)}
                                    style={{
                                        border: '1px solid #5C5C5C',
                                        borderRadius: 50,
                                        padding: setSize(2, 1, 1),
                                        marginTop: 1
                                    }}
                                />
                            </div>
                        </Header>
                        <Content
                            style={{
                                margin: setSize('10px 20px', '5px 10px', '5px 10px'),
                                overflow: 'initial',
                            }}
                        >
                            <div
                                className='font-bold text-[#202224] lg:text-[30px] md:text-[24px] text-[18px] pl-2'
                            >
                                {props.menu}
                            </div>
                            <div
                                style={{
                                    paddingTop: setSize(10, 8, 5),
                                }}
                            >
                                {props.children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
            <ConfigProvider
                theme={{
                    components: {
                        Drawer: {
                            controlPaddingHorizontal: 0
                        },
                        Menu: {
                            itemHeight: '30px',
                            fontSize: 12,
                            colorSplit: 'none',
                            itemPaddingInline: 10,
                            itemSelectedBg: '#4880FF',
                            itemSelectedColor: '#FFFFFF',
                        }
                    }
                }}
            >
                <Drawer
                    placement={"left"}
                    onClose={() => setIsDrawer(false)}
                    open={isDrawer}
                    width={"50%"}
                >
                    <Menu
                        theme='light'
                        mode='vertical'
                        selectedKeys={[activeKey]} 
                        defaultSelectedKeys={['4']} 
                        onClick={e => setActiveKey(e)}
                        className={`font-semibold text-[16px]`}
                    >
                        <Menu.Item key={'5'}><Link to={'/cms'}><div className='flex items-center'><IconDashboard size={setSize(18, 16, 12)} /><div className='pl-2'>Dashboard</div></div></Link></Menu.Item>
                        <Menu.Item key={'7'}><Link to={'/cms/product'}><div className='flex items-center'><IconLayoutGrid size={setSize(18, 16, 12)} /><div className='pl-2'>Products</div></div></Link></Menu.Item>
                        <Menu.Item key={'9'}><Link to={'/cms/category'}><div className='flex items-center'><IconCategory2 size={setSize(18, 16, 12)} /><div className='pl-2'>Category</div></div></Link></Menu.Item>
                        <Menu.Item key={'10'}><Link to={'/cms/restaurant'}><div className='flex items-center'><IconBuildingWarehouse size={setSize(18, 16, 12)} /><div className='pl-2'>Restaurant</div></div></Link></Menu.Item>
                        <Menu.Item key={'8'}><Link to={'/cms/user'}><div className='flex items-center'><IconUsers size={setSize(18, 16, 12)} /><div className='pl-2'>Users</div></div></Link></Menu.Item>
                        <div style={{ position: 'absolute', bottom: 0, borderTop: '1px solid #DCDCDC', width: '70%' }}>
                            <Menu.Item key={'11'}><Link to={'/cms'}><div className='flex items-center'><IconSettings size={setSize(18, 14, 12)} /><div className='pl-2'>Settings</div></div></Link></Menu.Item>
                            <Menu.Item key={'12'} danger><Link to={'/cms'}><div className='flex items-center'><IconPower color='red' size={setSize(18, 14, 12)} /><div className='pl-2'>Logout</div></div></Link></Menu.Item>
                        </div>
                    </Menu>   
                </Drawer>
            </ConfigProvider>
        </>
    )
}
