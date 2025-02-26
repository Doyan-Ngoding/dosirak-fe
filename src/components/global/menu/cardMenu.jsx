import { IconChefHat, IconShoppingBagPlus } from '@tabler/icons-react'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Col, Row } from 'antd'

export default function CardMenu({
    image,
    restaurant,
    title,
    desc,
    price,
    stock,
    addToCart,
    showResto = true
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='bg-white border-[1.5px] border-[#D5D5D5] rounded-xl'
            >
                <div
                    className={`bg-cover bg-center bg-no-repeat rounded-t-xl flex items-end lg:h-[180px] md:h-[120px] h-[100px]`}
                    style={{ backgroundImage: `url('${import.meta.env.VITE_URL_BE}/${image}')` }}
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
                        span={setSize('', '', 24)}
                    >
                        <div
                            className='text-[#FF815B] font-bold lg:text-2xl md:text-xl text-xl'
                        >
                            Rp. {price ? parseFloat(price).toLocaleString() : '-'}
                        </div>
                    </Col>
                    <Col
                        span={setSize('', '', 24)}
                    >
                        <div
                            style={{
                                paddingRight: setSize(10, 10, 5),
                            }}
                            className='flex justify-end'
                        >
                            <IconShoppingBagPlus 
                                size={setSize(45, 30, 30)}
                                style={{
                                    color: '#FFFFFF',
                                    borderRadius: 50,
                                    padding: setSize(10, 5, 5),
                                    cursor:  'pointer'
                                }}
                                onClick={addToCart}
                                className='icon-hover-3'
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
