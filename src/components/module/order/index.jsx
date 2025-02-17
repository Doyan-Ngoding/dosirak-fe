import React, { useEffect, useRef, useState } from 'react'
import LayoutComp from '../../global/layout'
import HeaderOrder from './header'
import CategoryMenu from '../../global/menu/categoryMenu'
import { useMenu } from '../../../context/MenuContext'
import CardMenu from '../../global/menu/cardMenu'
import { 
    Col,
    Row, 
} from 'antd'
import SiderOrder from './sider'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'

export default function OrderComp() {

    const {
        listMenu,
    } = useMenu();

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
    } = useOrder();

    const [activeTab, setActiveTab] = useState(listMenu[0].key);
    const sectionRefs = useRef({});

    const addedToCart = (menuItem) => { 
        setSelectedMenu(
            (prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                        : item
                );
                const isExisting = prevCart.find((item) => item.id === menuItem.id);
            
                if (!isExisting) {
                    updatedCart.push({ ...menuItem, qty: 1, subTotal: menuItem.price });
                }
                
                return updatedCart;                
            }
        )
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        localStorage.getItem('cart') ? localStorage.removeItem('cart') : localStorage.setItem('cart', JSON.stringify(selectedMenu));
    }, [selectedMenu]);
    
    return (
        <>
            <LayoutComp>
                <Row>
                    <Col
                        span={
                            selectedMenu.length > 0 ? 18 : 24
                        }
                    >
                        <div
                            style={{
                                padding: 80
                            }}
                        >
                            <HeaderOrder />
                            <CategoryMenu 
                                category={listMenu}
                                selectedCategory={activeTab}
                                setSelctedCategory={setActiveTab}
                                sectionRef={sectionRefs}
                            />
                            {
                                listMenu.map((value) => (
                                    <>
                                        <div
                                            key={value.key} 
                                            ref={(el) => (sectionRefs.current[value.key] = el)}
                                            style={{
                                                paddingBottom: 50
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: 42,
                                                    color: '#6B6B6B',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {value.category}
                                            </div>
                                            <Row
                                                style={{
                                                    paddingTop: 20,
                                                }}
                                                gutter={[36, 36]}
                                            >
                                                {
                                                    value.menu.map((value, key) => (
                                                        <>
                                                            <Col
                                                                span={
                                                                    selectedMenu.length > 0 ? 8 : 6
                                                                }
                                                            >
                                                                <CardMenu 
                                                                    image={value.image}
                                                                    restaurant={value.restaurant}
                                                                    title={value.name}
                                                                    desc={value.desc}
                                                                    price={value.price}
                                                                    stock={value.stock}
                                                                    addToCart={() => addedToCart(value)}
                                                                
                                                                />
                                                            </Col>
                                                        </>
                                                    ))
                                                }
                                            </Row>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </Col>
                    {
                        selectedMenu.length > 0 && (
                            <Col
                                span={6}
                            >
                                <SiderOrder /> 
                            </Col>
                        )
                    }
                </Row>
            </LayoutComp>
        </>
    )
}
