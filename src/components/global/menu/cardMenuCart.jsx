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

export default function CardMenuCart({
    image,
    title,
    price,
    qty,
    addQty,
    subQty
}) {
    return (
        <>
            <Card
                style={{
                    margin: '10px 0px'
                }}
            >
                <Row
                    gutter={[12, 12]}
                    align={"middle"}
                    style={{
                        paddingBottom: 10,
                        borderBottom: '1px solid #EBEEF2'
                    }}
                >
                    <Col
                        span={6}
                    >
                        <div 
                            style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                borderRadius: 4,
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    </Col>
                    <Col
                        span={18}
                        className='menu-title'
                    >
                        {title}
                    </Col>
                </Row>
                <Row
                    justify='space-between'
                    align='middle'
                    style={{
                        paddingTop: 3
                    }}
                >
                    <Col
                        span={17}
                        className='menu-price-2'
                    >
                        Rp. {price ? parseFloat(price).toLocaleString() : '-'}
                    </Col>
                    <Col
                        span={7}
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
                                    onClick={subQty}
                                />
                            </Col>
                            <Col
                                className='menu-price-2'
                            >
                                {qty ? 'x' + qty : '0'}
                            </Col>
                            <Col
                                className='icon-hover-2'
                            >
                                <IconCirclePlusFilled 
                                    // color='#FF815B'
                                    size={28}
                                    style={{
                                        marginTop: 3,
                                        cursor: 'pointer',
                                        // color: '#FF815B'
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
