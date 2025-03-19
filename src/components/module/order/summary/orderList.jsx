import React, { useEffect, useState } from 'react'
import { 
    Card,
    Col,
    Row 
} from 'antd'
import { IconCircleMinus, IconCirclePlusFilled } from '@tabler/icons-react'
import { useOrder } from '../../../../context/OrderContext'
import { useAuth } from '../../../../context/AuthContext'

export default function OrderListComp() {

    const {
        selectedMenu, setSelectedMenu,
        addQty, subQty,
        setCart,
    } = useOrder()

    const {
        setSize,
        isStandard
    } = useAuth()
    
    return (
        <>
            <Row
                align={"middle"}
                gutter={setSize([0, 20], [0, 18], [0, 14])}
                className='bg-white lg:p-5 md:p-3.5 p-3 rounded-lg mt-2.5'
            >
                <Col
                    span={24}
                >
                    <div
                        className='text-[#393939] font-bold lg:text-[24px] md:text-[20px] text-[16px]'
                    >
                        ORDER LIST
                    </div>
                </Col>
                {
                    selectedMenu && selectedMenu.map(value => (
                        <Col
                            span={24}
                        >
                            <Card>
                                <Row
                                    justify={"space-between"}
                                    align={"middle"}
                                    gutter={[12, 12]}
                                >
                                    <Col
                                        span={setSize(4, 6, 6)}
                                        style={{
                                            height: setSize(100, 70, 60)
                                        }}
                                    >
                                        <div 
                                            className={`bg-cover bg-center bg-no-repeat rounded-sm h-[100%] w-[100%] aspect-square`}
                                            style={{ backgroundImage: `url('/assets${value.image}')` }}
                                        />
                                    </Col>
                                    <Col
                                        span={setSize(16, 18, 18)}
                                    >
                                        <Row>
                                            <Col
                                                span={24}
                                            >
                                                <div
                                                    className='lg:text-[20px] md:text-[16px] text-[14px] font-semibold'
                                                >
                                                    {value.name}
                                                </div>
                                                {
                                                    isStandard && (
                                                        <div
                                                            className='lg:text-[20px] md:text-[18px] text-[16px] font-semibold text-[#FF815B]'
                                                        >
                                                            Rp. {value.price ? parseFloat(value.price).toLocaleString() : '-'}
                                                        </div>
                                                    )
                                                }
                                            </Col>
                                            {
                                                !isStandard && (
                                                    <Col
                                                        span={24}
                                                    >
                                                        <Row
                                                            justify='space-between'
                                                            align='middle'
                                                            gutter={[30, 30]}
                                                        >
                                                            <Col
                                                                span={14}
                                                            >
                                                                <div
                                                                    className='lg:text-[20px] md:text-[16px] text-[14px] font-semibold text-[#FF815B]'
                                                                >
                                                                    Rp. {value.price ? parseFloat(value.price).toLocaleString() : '-'}
                                                                </div>
                                                            </Col>
                                                            <Col
                                                                span={10}
                                                            >
                                                                <Row
                                                                    justify={"space-between"}
                                                                    align={"middle"}
                                                                >
                                                                    <Col>
                                                                        <div
                                                                            className='icon-hover'
                                                                        >
                                                                            <IconCircleMinus 
                                                                                size={setSize(28, 20, 18)}
                                                                                style={{
                                                                                    marginTop: 3,
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => subQty(value.id)}
                                                                            /> 
                                                                        </div>   
                                                                    </Col> 
                                                                    <Col>
                                                                        <div
                                                                            className='menu-price-2'
                                                                            style={{
                                                                                fontSize: setSize(20, 18, 18)
                                                                            }}
                                                                        >
                                                                            {value.qty ? value.qty : '0'}  
                                                                        </div>
                                                                    </Col> 
                                                                    <Col>
                                                                        <div
                                                                            className='icon-hover-2'
                                                                        >
                                                                            <IconCirclePlusFilled 
                                                                                size={setSize(28, 20, 18)}
                                                                                style={{
                                                                                    marginTop: 3,
                                                                                    cursor: 'pointer',
                                                                                }}
                                                                                onClick={() => addQty(value.id)}
                                                                            />
                                                                        </div>
                                                                    </Col> 
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                )
                                            }
                                        </Row>
                                    </Col>
                                    {
                                        isStandard && (
                                            <Col
                                                span={4}
                                            >
                                                <Row
                                                    justify='space-between'
                                                    align='middle'
                                                >
                                                    <Col
                                                        className='icon-hover'
                                                    >
                                                        <IconCircleMinus 
                                                            size={28}
                                                            style={{
                                                                marginTop: 3,
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => subQty(value.id)}
                                                        />
                                                    </Col>
                                                    <Col
                                                        className='menu-price-2'
                                                    >
                                                        {value.qty ? value.qty : '0'}
                                                    </Col>
                                                    <Col
                                                        className='icon-hover-2'
                                                    >
                                                        <IconCirclePlusFilled 
                                                            size={28}
                                                            style={{
                                                                marginTop: 3,
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => addQty(value.id)}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
