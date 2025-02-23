import React, { useEffect, useState } from 'react'
import { ConfigProvider, Drawer, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const routes = {
    1: '/',
    2: '/menu',
    3: '/order',
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
                            itemHeight: '150%',
                            fontSize: 20
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
                        className={`font-semibold text-[20px]`}
                    >
                        <Menu.Item key={'1'} className={`${!other && 'pt-1.5'}`}><Link to={'/'}>HOME</Link></Menu.Item>
                        <Menu.Item key={'2'} className={`${!other && 'pt-1.5'}`}><Link to={'/menu'}>MENU</Link></Menu.Item>
                        <Menu.Item key={'3'} className={`${!other && 'pt-1.5'}`}><Link to={'/order'}>ORDER ONLINE</Link></Menu.Item>
                    </Menu>   
                </Drawer>
            </ConfigProvider>
        </>
    )
}
