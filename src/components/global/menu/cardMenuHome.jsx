import React, { useEffect, useState } from 'react'
import { IconChefHat, IconCircleMinus, IconCirclePlusFilled, IconShoppingBagPlus } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { Col, Row } from 'antd'
import { useOrder } from '../../../context/OrderContext'

export default function CardMenuHome({
    image,
    restaurant,
    title,
    desc,
    price,
    stock,
    addToCart,
    showResto = true,
    isMenu = false,
    id_menu,
}) {

    const {
        setSize
    } = useAuth()

    const {
        addQty, subQty,
        cart, setCart
    } = useOrder();

    const getQty = (id) => {
        const get_menu = cart.find(item => item.id === id);
        return get_menu ? get_menu.qty : 0
    }
    

    return (
        <>
            <div
                className='bg-white border-[1.5px] border-[#EBEEF2] rounded-xl'
            >
                <div
                    className={`bg-cover bg-center bg-no-repeat rounded-t-xl flex items-end ${isMenu ? 'lg:h-[180px] md:h-[100px] h-[80px]' : 'lg:h-[130px] md:h-[80px] h-[70px]'}`}
                    style={{ backgroundImage: `url('${import.meta.env.VITE_URL_BE}/${image}')` }}
                />
                <div
                    className='text-[#393939] font-semibold lg:text-[18px] md:text-[12px] text-[10px] lg:px-2 md:px-2 px-1 pt-1'
                >
                    {title}
                </div>
                <div
                    style={{
                        color: '#6B6B6B',
                        fontSize: setSize(16, 10, 10),
                        fontWeight: 300,
                        padding: setSize('0px 10px 10px 10px', '0px 8px 8px 8px', '0px 5px 5px 5px'),
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        lineHeight: "1.5em",
                        height: "3em", 
                        overflow: "hidden",
                    }}
                >
                    {desc}
                </div>
                <Row
                    justify={"space-between"}
                    align={"middle"}
                    className='lg:px-[10px] md:px-[8px] px-[5px] lg:pb-[10px] md:pb-[10px] pb-3 pt-3'
                >
                    <Col>
                        <div
                            className='text-[#FF815B] font-bold lg:text-[18px] md:text-[12px] text-[10px]'
                        >
                            Rp. {price ? parseFloat(price).toLocaleString() : '-'}
                        </div>
                    </Col>
                    <Col>
                        <div
                            style={{
                                paddingRight: setSize(0, 0, 0),
                            }}
                            className='flex justify-end'
                        >
                            {
                                getQty(id_menu) <= 0 ? (
                                    <IconShoppingBagPlus 
                                        size={setSize(28, 18, 15)}
                                        style={{
                                            color: '#FFFFFF',
                                            borderRadius: 50,
                                            padding: setSize(5, 3, 2),
                                            cursor:  'pointer'
                                        }}
                                        onClick={addToCart}
                                        className='icon-hover-3'
                                    />
                                ) : (
                                    <Row
                                        justify='space-between'
                                        align='middle'
                                    >
                                        <Col
                                            className='icon-hover'
                                        >
                                            <IconCircleMinus 
                                                size={setSize(28, 16, 14)}
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => subQty(id_menu)}
                                            />
                                        </Col>
                                        <Col>
                                            <div
                                                style={{
                                                    color: '#FF815B',
                                                    fontSize: setSize(20, 12, 10),
                                                    padding: setSize('0px 10px', '0px 5px', '0px 5px'),
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {getQty(id_menu)}
                                            </div>
                                        </Col>
                                        <Col
                                            className='icon-hover-2'
                                        >
                                            <IconCirclePlusFilled 
                                                size={setSize(28, 16, 14)}
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => addQty(id_menu)}
                                            />
                                        </Col>
                                    </Row>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
