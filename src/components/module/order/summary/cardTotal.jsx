import React, { useEffect } from 'react'
import { 
    Button,
    Col, 
    Row 
} from 'antd'
import { useOrder } from '../../../../context/OrderContext'

export default function CardTotal({
    handleClick
}) {

    const {
        selectedMenu,
        subTotal, setSubTotal,
        deliveryFee, setDeliveryFee,
        packingFee, setPackingFee,
        promo, setPromo,
        total, setTotal,
    } = useOrder()

    useEffect(() => {
    setSubTotal(
        selectedMenu.reduce((total, item) => total + item.subTotal, 0)
    );
    localStorage.getItem('cart') ? localStorage.removeItem('cart') : localStorage.setItem('cart', JSON.stringify(selectedMenu));
    }, [selectedMenu]);


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
                gutter={[0, 12]}
            >
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >
                    CHECKOUT
                </Col>
                <Col
                    span={24}
                    style={{
                        paddingTop: 10
                    }}
                >
                    <Row
                       align={"middle"}
                       justify={"space-between"} 
                    >
                        <Col
                            span={12}
                            style={{
                                fontWeight: 600,
                                fontSize: 18,
                            }}
                        >
                            Sub Total
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: 16,
                                textAlign: 'end'
                            }}
                        >
                            Rp. {subTotal ? parseFloat(subTotal).toLocaleString() : '0'}
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                >
                    <Row
                       align={"middle"}
                       justify={"space-between"} 
                    >
                        <Col
                            span={12}
                            style={{
                                fontWeight: 600,
                                fontSize: 18,
                            }}
                        >
                            Delivery Fee
                            <br />
                            <div
                                style={{
                                    fontWeight: 400,
                                    fontSize: 14,
                                    color: 'rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                DISKON ONGKIR 50% 
                            </div>
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: 16,
                                textAlign: 'end'
                            }}
                        >
                            <span
                                style={{
                                    color: 'rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                <s style={{ fontSize: 14 }}>Rp. {deliveryFee ? parseFloat(deliveryFee).toLocaleString() : '0'}</s>
                                <span style={{ paddingLeft: 10, color: '#000000' }}>
                                    Rp. {deliveryFee ? parseFloat(deliveryFee).toLocaleString() : '0'}
                                </span>
                            </span>
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                >
                    <Row
                       align={"middle"}
                       justify={"space-between"} 
                    >
                        <Col
                            span={12}
                            style={{
                                fontWeight: 600,
                                fontSize: 18,
                            }}
                        >
                            Packing Fee
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: 16,
                                textAlign: 'end'
                            }}
                        >
                            Rp. {packingFee ? parseFloat(packingFee).toLocaleString() : '0'}
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                >
                    <Row
                       align={"middle"}
                       justify={"space-between"} 
                    >
                        <Col
                            span={12}
                            style={{
                                fontWeight: 600,
                                fontSize: 18,
                            }}
                        >
                            Promo
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: 16,
                                textAlign: 'end',
                                color: '#E83600'
                            }}
                        >
                            Rp. {promo ? parseFloat(promo).toLocaleString() : '0'}
                        </Col>
                    </Row>
                </Col>
                <Col
                    span={24}
                    style={{
                        paddingTop: 10,
                        borderTop: '1px solid grey'
                    }}
                >
                    <Row
                       align={"middle"}
                       justify={"space-between"} 
                    >
                        <Col
                            span={12}
                            style={{
                                fontWeight: 600,
                                fontSize: 18,
                            }}
                        >
                            Total
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: 20,
                                textAlign: 'end',
                            }}
                        >
                            Rp. {total ? parseFloat(total).toLocaleString() : '0'}
                        </Col>
                    </Row>   
                </Col>
                <Col
                    span={24}
                    style={{
                        paddingTop: 15,
                    }}
                >
                    <Button
                        type='primary'
                        size='large'
                        style={{
                            width: '100%',
                            borderRadius: 50
                        }}
                        onClick={handleClick}
                    >
                        {`Select Payment >`}
                    </Button>
                </Col>
            </Row>
        </>
    )
}
