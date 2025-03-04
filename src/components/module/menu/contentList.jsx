import React, { useEffect } from 'react'
import { Anchor, Col, ConfigProvider, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useMenu } from '../../../context/MenuContext';
import SplitTitle from '../../global/split/title';
import CardMenuHome from '../../global/menu/cardMenuHome';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';

export default function ContentListComp() {

    const navigate = useNavigate()

    const {
        setSize
    } = useAuth()

    const {
        listMenuGrouped,
        tabCategory, 
    } = useMenu();
    
    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        cart, setCart
    } = useOrder();

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
        setCart(selectedMenu)
    }, [selectedMenu]);
    

    return (
        <>
            <div
                className='lg:pt-[50px] md:pt-[30px] pt-[20px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    className="sticky lg:top-[68px] md:top-[50px] top-[35px] z-10 bg-white w-auto text-[Plus Jakarta Sans]"
                >
                    <div
                        className="overflow-x-auto whitespace-nowrap custom-scroll border-b border-gray-500"
                    >
                        <Anchor
                            direction="horizontal"
                            className="inline-flex space-x-4"
                            targetOffset={15}
                            items={
                                tabCategory ? tabCategory.map((value) => ({
                                    key: value,
                                    href: '#'+value,
                                    title: value,
                                })) : []
                            }
                        />
                    </div>
                </div>
                <div
                    className='lg:pt-10 md:pt-7 pt-5'
                >
                    {
                        listMenuGrouped && listMenuGrouped.map((value, key) => (
                            <>
                                <div
                                    id={value.category}
                                >
                                    <div
                                        className='lg:pb-3 md:pb-2 pb-1'
                                    >
                                        <SplitTitle 
                                            no={key+1}
                                            title={value.category}
                                        />
                                    </div>
                                    <Row
                                        justify={'start'}
                                        align={'middle'}
                                        gutter={[12, 12]}
                                        style={{
                                            paddingBottom: setSize(60, 40, 30)
                                        }}
                                    >
                                        {
                                            value.menu.map((value, key) => (
                                                <Col
                                                    span={setSize(6, 6, 8)}
                                                >
                                                    <CardMenuHome 
                                                        image={value.image}
                                                        title={value.name}
                                                        desc={value.description}
                                                        price={value.price}
                                                        stock={value.qty}
                                                        showResto={false}
                                                        addToCart={() => {addedToCart(value), navigate('/order')}}
                                                        isMenu={true}
                                                    />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </>
                        ))
                    }
                </div>
                <style>
                {`
                    .ant-anchor-link {
                        width: ${setSize('200px', '150px', '100px')};
                        text-align: center;
                        display: inline-block;
                        transition: all 0.3s ease;
                        white-space: nowrap;
                    }

                    .ant-anchor-link-active > a {
                        background-color: rgba(255, 69, 0, 0.1);
                        color: #ff4500; 
                        width: ${setSize('200px', '150px', '100px')};
                        border-radius: 0px;
                        display: inline-block;
                        text-align: center;
                        font-weight: 700;
                    }
                `}
                </style>
            </div>
        </>
    )
}
