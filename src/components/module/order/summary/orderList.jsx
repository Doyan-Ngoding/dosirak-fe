import React, { useState } from 'react'
import { 
    Card,
    Col,
    Row 
} from 'antd'
import { IconCircleMinus, IconCirclePlusFilled } from '@tabler/icons-react'
import { useOrder } from '../../../../context/OrderContext'

export default function OrderListComp() {

    const {
        selectedMenu, setSelectedMenu
    } = useOrder()
    
    const addQty = (id) => {
        setSelectedMenu((prevCart) => 
            prevCart.map((item) => 
                item.id === id
                    ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                    : item
            )
        );
    };

    const subQty = (id) => {
        setSelectedMenu((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id
                    ? { ...item, qty: item.qty - 1, subTotal: (item.qty - 1) * item.price }
                    : item
            ).filter((item) => item.qty > 0); 
            return updatedCart;
        });
    };

    return (
        <>
            <Row
                style={{
                    marginTop: 10,
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF'
                }}
                align={"middle"}
                gutter={[0, 24]}
            >
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 600,
                        fontSize: 30,
                    }}
                >
                    ORDER LIST
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
                                        span={4}
                                        style={{
                                            height: 100
                                        }}
                                    >
                                        <div 
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                aspectRatio: '1 / 1',
                                                borderRadius: 4,
                                                backgroundImage: `url(${value.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        />
                                    </Col>
                                    <Col
                                        span={16}
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 600,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {value.name}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                color: '#FF815B'
                                            }}
                                        >
                                            Rp. {value.price ? parseFloat(value.price).toLocaleString() : '-'}
                                        </div>
                                    </Col>
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
                                                {value.qty ? 'x' + value.qty : '0'}
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
                                </Row>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}
