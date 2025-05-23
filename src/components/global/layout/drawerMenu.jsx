import React, { useEffect, useState } from 'react'
import { ConfigProvider, Drawer, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const routes = {
    1: '/',
    2: '/menu',
    3: '/order',
    // 4: '/history',
    5: '/contact',
    6: '/about'
}

export default function DrawerMenu({
    isOpen, 
    setIsOpen,
    other = false
}) {

    const { setSize } = useAuth();

    const [activeKey, setActiveKey] = useState("1");

    const router = useLocation();
    const pathname = router.pathname

    useEffect(() => {
        let route = (pathname === "/order-summary" || pathname === "/payment-method" || pathname === "/complete") ? 3 : Object.keys(routes).find(key => routes[key] === router.pathname);
        setActiveKey(route?.toString());
    }, [pathname]);

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemHeight: '180%',
                            fontSize: setSize(0, 14, 12),
                            fontFamily: 'Noto Sans KR',
                            itemPaddingInline: 10
                        }
                    }
                }}
            >
                <Drawer
                    placement={"left"}
                    onClose={() => setIsOpen(false)}
                    open={isOpen}
                    width={"50%"}
                >
                    <Menu
                        theme='light'
                        mode='vertical'
                        selectedKeys={[activeKey]} 
                        defaultSelectedKeys={['1']} 
                        onClick={e => setActiveKey(e)}
                    >
                        <Menu.Item key={'1'}><Link to={'/'}>Home</Link></Menu.Item>
                        <Menu.Item key={'2'}><Link to={'/menu'}>Our Menu</Link></Menu.Item>
                        {/* <Menu.Item key={'3'}><Link to={'/order'}>Order</Link></Menu.Item> */}
                        {/* <Menu.Item key={'4'}><Link to={'/history'}>History</Link></Menu.Item> */}
                        <Menu.Item key={'4'}><Link to={'/contact'}>Contact</Link></Menu.Item>
                        <Menu.Item key={'6'}><Link to={'/about'}>About</Link></Menu.Item>
                    </Menu>   
                </Drawer>
            </ConfigProvider>
        </>
    )
}
