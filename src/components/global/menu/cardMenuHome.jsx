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
    detail,
    isParent,
    maxPrice
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
                className='bg-white'
            >
                <div
                    className={`bg-cover bg-center bg-no-repeat rounded-lg border border-[#D8D8D8] flex items-end ${isMenu ? 'lg:h-[180px] md:h-[100px] h-[80px]' : 'lg:h-[180px] md:h-[150px] h-[120px]'}`}
                    style={{ backgroundImage: `url('${import.meta.env.VITE_API_BE_BASE_URL}/${image}')` }}
                    onClick={() => setVisible(true)}
                />
                <div
                    className='text-[#393939] font-medium lg:text-[12px] md:text-[10px] text-[9px] lg:px-1 md:px-1 px-1 pt-1'
                    onClick={() => setVisible(true)}
                >
                    {title}
                </div>
                <div
                    style={{
                        color: '#6B6B6B',
                        fontSize: setSize(10, 9, 8),
                        fontWeight: 300,
                        margin: setSize('5px 5px 10px 5px', '3px 4px 8px 4px', '2px 4px 5px 4px'),
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        lineHeight: "1.5em",
                        height: "4.5em", 
                        overflow: "hidden",
                    }}
                    onClick={() => setVisible(true)}
                >
                    {desc}
                </div>
                <Row
                    justify={"space-between"}
                    align={"middle"}
                    className='lg:px-[5px] md:px-[4px] px-[3px] lg:pb-[10px] md:pb-[10px] pb-3 pt-3'
                >
                    <Col>
                        <div
                            className='text-[#000000] font-[Montserrat] font-bold lg:text-[12px] md:text-[10px] text-[9px]'
                        >
                            Rp. {price ? parseFloat(price).toLocaleString() : '-'} {maxPrice && ' - ' + parseFloat(maxPrice).toLocaleString()}
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
                                            size={setSize(20, 18, 16)}
                                            style={{
                                                color: '#FFFFFF',
                                                borderRadius: 50,
                                                padding: 3,
                                                cursor:  (selectedResto && selectedResto !== restaurant) ? 'not-allowed' : 'pointer',
                                            }}
                                            onClick={() => (!selectedResto || selectedResto === restaurant) && (isParent ? setVisible(true) : addToCart())}
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
                                                size={setSize(18, 16, 14)}
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
                                                    fontSize: setSize(14, 12, 10),
                                                    padding: setSize('0px 8px', '0px 5px', '0px 5px'),
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
                                                size={setSize(18, 16, 14)}
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
