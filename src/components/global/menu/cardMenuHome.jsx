import React, { useEffect, useState } from 'react'
import { IconChefHat, IconCircleMinus, IconCirclePlusFilled, IconShoppingBagPlus } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { Col, Row, Tooltip } from 'antd'
import { useOrder } from '../../../context/OrderContext'
import PreviewMenu from '../modal/previewMenu'

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
    detail
}) {

    const {
        setSize
    } = useAuth()

    const {
        addQty, subQty,
        cart, setCart,
        selectedResto, setSelectedResto,
    } = useOrder();

    const getQty = (id) => {
        const get_menu = cart.find(item => item.id === id);
        return get_menu ? get_menu.qty : 0
    }
    
    const [visible, setVisible] = useState(false);
    const [detailData, setDetailData] = useState();

    return (
        <>
            <div
                className='bg-white border-[1.5px] border-[#EBEEF2] rounded-xl'
            >
                <div
                    className={`bg-cover bg-center bg-no-repeat rounded-t-xl flex items-end ${isMenu ? 'lg:h-[180px] md:h-[100px] h-[80px]' : 'lg:h-[130px] md:h-[80px] h-[70px]'}`}
                    style={{ backgroundImage: `url('/assets${image}')` }}
                    onClick={() => setVisible(true)}
                />
                <div
                    className='text-[#393939] font-semibold lg:text-[18px] md:text-[12px] text-[10px] lg:px-2 md:px-2 px-1 pt-1'
                    onClick={() => setVisible(true)}
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
                    onClick={() => setVisible(true)}
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
                                    <Tooltip
                                        title={(selectedResto && selectedResto !== restaurant) && "You can't choose menus from different restaurants!"}
                                        trigger={"hover"}
                                    >
                                        <IconShoppingBagPlus 
                                            size={setSize(28, 18, 15)}
                                            style={{
                                                color: '#FFFFFF',
                                                borderRadius: 50,
                                                padding: setSize(5, 3, 2),
                                                cursor:  (selectedResto && selectedResto !== restaurant) ? 'not-allowed' : 'pointer',
                                            }}
                                            onClick={(!selectedResto || selectedResto === restaurant) && addToCart}
                                            className='icon-hover-3'
                                        />
                                    </Tooltip>
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
                                                onClick={() => (!selectedResto || selectedResto === restaurant) && subQty(id_menu)}
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
                                                onClick={() => (!selectedResto || selectedResto === restaurant) && addQty(id_menu)}
                                            />
                                        </Col>
                                    </Row>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            <PreviewMenu 
                visible={visible}
                setVisible={setVisible}
                data={detail}
            />
        </>
    )
}
