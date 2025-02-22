import React from 'react'
import { IconChefHat, IconShoppingBagPlus } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import { Col, Row } from 'antd'

export default function CardMenuHome({
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
                className='bg-white border-[1.5px] border-[#EBEEF2] rounded-xl'
            >
                {/* ${import.meta.env}/iamges${image} */}
                {/* ${import.meta.env}${image} */}
                <div
                    className={`bg-[url(./assets/menu/gyoza.jpg)] bg-cover bg-center bg-no-repeat rounded-t-xl flex items-end lg:h-[130px] md:h-[80px] h-[70px]`}
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
                    {desc}dd sldjald sdjalkd dsj alkjdlsj  dl sdjs ldkd sdkjkdjasdd sda sdhjfhjf onbdh dad  sdad sjkmnbhs lakjdshjbaljasoe 2nbgahdkawoequ iewpupue9kdjaldj dhadjak
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
                                paddingRight: setSize(10, 8, 5),
                            }}
                            className='flex justify-end'
                        >
                            <IconShoppingBagPlus 
                                size={setSize(30, 18, 15)}
                                style={{
                                    color: '#FFFFFF',
                                    borderRadius: 50,
                                    padding: setSize(5, 3, 2),
                                    cursor: stock && parseInt(stock) > 0 ? 'pointer' : 'not-allowed'
                                }}
                                onClick={(stock && parseInt(stock) > 0) && addToCart}
                                className='icon-hover-3'
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
