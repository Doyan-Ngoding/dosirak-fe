import React from 'react'
import { 
    IconCircleMinus, 
    IconCirclePlus, 
    IconCirclePlusFilled 
} from '@tabler/icons-react'
import { 
    Card,
    Col, 
    Row 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function CardMenuCart({
    image,
    title,
    price,
    qty,
    addQty,
    subQty,
    variant, 
    size
}) {
    
    const {
        setSize
    } = useAuth()

    return (
        <>
            <Card
                style={{
                    margin: '5px 0px'
                }}
            >
                <Row
                    gutter={[12, 12]}
                    align={"middle"}
                    className='pb-2.5 pt-1 border-b border-[#EBEEF2]'
                >
                    <Col
                        span={setSize(6, 6, 4)}
                    >
                        <div 
                            className={`bg-cover bg-center bg-no-repeat w-full aspect-square rounded-sm`}
                            style={{ backgroundImage: `url('${import.meta.env.VITE_API_BE.replace(/api/g, '')}${image}')` }}
                            />
                    </Col>
                    <Col
                        span={setSize(18, 18, 20)}
                    >
                        <div
                            className='text-[#393939] font-semibold lg:text-2xl md:text-lg text-[16px]'
                        >
                            {title}
                        </div>
                        {
                            (variant && size) && (
                                <div
                                    className='text-[10px] lg:text-[12px] md:text-[10px]'
                                >
                                    {title}, {variant}, {size}
                                </div>
                            )
                        }
                    </Col>
                </Row>
                <Row
                    justify='space-between'
                    align='middle'
                    className='pt-1'
                >
                    <Col
                        span={setSize(15, 14, 17)}
                    >
                        <div
                            className='text-[#FF815B] lg:text-2xl md:text-lg text-lg font-bold'
                        >
                            Rp. {price ? parseFloat(price).toLocaleString() : '-'}
                        </div>
                    </Col>
                    <Col
                        span={setSize(8, 10, 7)}
                    >
                        <Row
                            justify='space-between'
                            align='middle'
                        >
                            <Col
                                className='icon-hover'
                            >
                                <IconCircleMinus 
                                    size={setSize(28, 20, 20)}
                                    style={{
                                        marginTop: 3,
                                        cursor: 'pointer'
                                    }}
                                    onClick={subQty}
                                />
                            </Col>
                            <Col>
                                <div
                                    className='text-[#FF815B] lg:text-2xl md:text-lg text-lg font-bold'
                                >
                                    {qty ? qty : '0'}
                                </div>
                            </Col>
                            <Col
                                className='icon-hover-2'
                            >
                                <IconCirclePlusFilled 
                                    size={setSize(28, 20, 20)}
                                    style={{
                                        marginTop: 3,
                                        cursor: 'pointer',
                                    }}
                                    onClick={addQty}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    )
}
