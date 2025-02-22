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
        listMenuGrouped,
        tabCategory, 
    } = useMenu();

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
    } = useOrder();

    const {
        setSize,
    } = useAuth();

    const [activeTab, setActiveTab] = useState(tabCategory[0] || '');
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
                        span={selectedMenu.length > 0 ? setSize(18, 16, 24) : 24}
                    >
                        <div
                            style={{
                                padding: setSize("50px 80px", "30px 50px", "30px")
                            }}
                        >
                            <HeaderOrder />
                            <CategoryMenu 
                                category={tabCategory}
                                selectedCategory={activeTab}
                                setSelctedCategory={setActiveTab}
                                sectionRef={sectionRefs}
                            />
                            {
                                listMenuGrouped.map((value) => (
                                    <>
                                        <div
                                            key={value.category} 
                                            ref={(el) => (sectionRefs.current[value.category] = el)}
                                            className='pb-20'
                                        >
                                            <div
                                                className='lg:text-3xl md:text-2xl text-lg text-[#6B6B6B] font-semibold'
                                            >
                                                {value.category}
                                            </div>
                                            <Row
                                                className='pt-5'
                                                gutter={[28, 28]}
                                            >
                                                {
                                                    value.menu.map((value, key) => (
                                                        <>
                                                            <Col
                                                                span={
                                                                    setSize(selectedMenu.length > 0 ? 8 : 6, selectedMenu.length > 0 ? 12 : 8, 12)
                                                                }
                                                            >
                                                                <CardMenu 
                                                                    image={value.image}
                                                                    restaurant={value.restaurant_name}
                                                                    title={value.name}
                                                                    desc={value.description}
                                                                    price={value.price}
                                                                    stock={value.qty}
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
                                span={setSize(6, 8, 24)}
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
