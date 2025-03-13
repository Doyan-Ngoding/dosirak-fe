import { IconChefHat, IconCircleMinus, IconCirclePlusFilled, IconShoppingBagPlus } from '@tabler/icons-react'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Col, Row } from 'antd'
import { useOrder } from '../../../context/OrderContext'

export default function CardMenu({
    image,
    restaurant,
    title,
    desc,
    price,
    stock,
    addToCart,
    showResto = true,
    id_menu
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
    const imageUrl = `${import.meta.env.VITE_URL_BE}/${image.replace(/\\/g, '/')}`;
    return (
        
        <>
            <div
                className='bg-white border-[1.5px] border-[#D5D5D5] rounded-xl'
            >
                <div
                    className="bg-cover bg-center bg-no-repeat rounded-t-xl flex items-end lg:h-[180px] md:h-[120px] h-[100px]"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                >
                    {
                        showResto && (
                            <div
                                className='w-full flex items-center bg-[#FA5523E5] px-2 py-2'
                            >
                                <div>
                                    <IconChefHat 
                                        color='#FFFFFF'
                                        size={setSize(24, 18, 16)}
                                    />
                                </div>
                                <div
                                    className='pl-2.5 lg:text-sm md:text-[12px] text-[10px]'
                                >
                                    <div
                                        style={{
                                            color: '#FFF948',
                                            lineHeight: 0.5
                                        }}
                                    >
                                        Available At
                                    </div>
                                    <div
                                        style={{
                                            fontSize: setSize(16, 12, 11),
                                            color: '#FFFFFF',
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 1,
                                            lineHeight: "1.5em",
                                            height: "1em", 
                                        }}
                                    >
                                        {restaurant} 
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div
                    className='text-[#393939] font-semibold lg:text-2xl md:text-lg text-[16px] lg:p-4 p-2.5'
                >
                    {title}
                </div>
                <div
                    style={{
                        color: '#6B6B6B',
                        fontSize: setSize(18, 14, 12),
                        fontWeight: 300,
                        padding: setSize('0px 15px 15px 15px', '0px 10px 10px 10px', '0px 10px 10px 10px'),
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
                    className='lg:px-[15px] md:px-[10px] px-[10px] lg:pb-[30px] md:pb-[30px] pb-5 pt-3'
                >
                    <Col
                        // span={setSize('', '', 24)}
                    >
                        <div
                            className='text-[#FF815B] font-bold lg:text-2xl md:text-lg text-md'
                        >
                            Rp. {price ? parseFloat(price).toLocaleString() : '-'}
                        </div>
                    </Col>
                    <Col
                        // span={setSize('', '', 24)}
                    >
                        <div
                            style={{
                                paddingRight: setSize(0, 0, 0),
                            }}
                            className='flex justify-end'
                        >
                            {
                                getQty(id_menu) <= 0 ? (
                                    <IconShoppingBagPlus 
                                        size={setSize(32, 24, 20)}
                                        style={{
                                            color: '#FFFFFF',
                                            borderRadius: 50,
                                            padding: setSize(5, 5, 3),
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
                                                size={setSize(30, 18, 16)}
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
                                                    fontSize: setSize(24, 14, 12),
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
                                                size={setSize(30, 18, 16)}
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
