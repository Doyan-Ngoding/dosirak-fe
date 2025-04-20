import React, { useEffect } from 'react'
import { 
    Button,
    Col, 
    Row 
} from 'antd'
import { useOrder } from '../../../../context/OrderContext'
import { useAuth } from '../../../../context/AuthContext'

export default function CardTotal({
    handleClick,
    qtyTemp,
}) {

    const {
        setSize
    } = useAuth()

    const {
        selectedMenu,
        subTotal, setSubTotal,
        deliveryFee, setDeliveryFee,
        packingFee, setPackingFee,
        promo, setPromo,
        total, setTotal,
        setCart,
        formatAmount, setFormatAmount
    } = useOrder()

    useEffect(() => {
        if (selectedMenu) {
            setSubTotal(
                selectedMenu.reduce((total, item) => total + item.subTotal, 0)
            );
            setCart(selectedMenu)
        }
    }, [selectedMenu]);

    useEffect(() => {
        setTotal(
            parseFloat(subTotal) + parseFloat(deliveryFee) + parseFloat(promo)
        )
        setFormatAmount({
            vat: 0,
            discount: promo,
            shipping: deliveryFee
        })
    }, [subTotal, deliveryFee, promo]);

    return (
        <>
            <Row
                align={"middle"}
                gutter={setSize([0, 20], [0, 18], [0, 14])}
                className='bg-white lg:p-5 md:p-3.5 p-3 rounded-lg mt-2.5'
            >
                <Col>
                    <div
                        className='text-[#393939] font-bold lg:text-[24px] md:text-[20px] text-[16px]'
                    >
                        CHECKOUT
                    </div>
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
                                fontSize: setSize(18, 16, 14),
                            }}
                        >
                            Sub Total
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: setSize(16, 14, 14),
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
                                fontSize: setSize(18, 16, 14),
                            }}
                        >
                            Delivery Fee
                            <br />
                            <div
                                style={{
                                    fontWeight: 400,
                                    fontSize: setSize(14, 12, 12),
                                    color: 'rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                {/* DISKON ONGKIR 50%  */}
                            </div>
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: setSize(16, 14, 14),
                                textAlign: 'end'
                            }}
                        >
                            <span
                                style={{
                                    color: 'rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                {/* <s style={{ fontSize: 14 }}>Rp. {deliveryFee ? parseFloat(deliveryFee).toLocaleString() : '0'}</s> */}
                                <span style={{ paddingLeft: 10, color: '#000000' }}>
                                    Rp. {deliveryFee ? parseFloat(deliveryFee).toLocaleString() : '0'}
                                </span>
                            </span>
                        </Col>
                    </Row>
                </Col>
                {/* <Col
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
                                fontSize: setSize(18, 16, 14),
                            }}
                        >
                            Packing Fee
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: setSize(16, 14, 14),
                                textAlign: 'end'
                            }}
                        >
                            Rp. {packingFee ? parseFloat(packingFee).toLocaleString() : '0'}
                        </Col>
                    </Row>
                </Col> */}
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
                                fontSize: setSize(18, 16, 14),
                            }}
                        >
                            Promo
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 500,
                                fontSize: setSize(16, 14, 14),
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
                                fontWeight: 700,
                                fontSize: setSize(20, 18, 16),
                            }}
                        >
                            Total
                        </Col>
                        <Col
                            span={12}
                            style={{
                                paddingRight: 10,
                                fontWeight: 700,
                                fontSize: setSize(24, 22, 20),
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
                        size={setSize('large', 'medium', 'medium')}
                        style={{
                            width: '100%',
                            borderRadius: 50
                        }}
                        disabled={deliveryFee === 0 ? true : false}
                        onClick={handleClick}
                    >
                        {`Order Now!`}
                    </Button>
                </Col>
            </Row>
        </>
    )
}
