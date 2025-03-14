import React, { useEffect, useState } from 'react';
import { Button, Col, ConfigProvider, Modal, Row, Tooltip } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import { IconCircleMinus, IconCirclePlusFilled } from '@tabler/icons-react';
import { useOrder } from '../../../context/OrderContext';

export default function PreviewMenu({
    visible,
    setVisible,
    data
}) {

    const { setSize } = useAuth()

    const {
        addQty, subQty,
        cart, setCart,
        selectedResto, setSelectedResto,
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
    } = useOrder();

    const [qtyTemp, setQtyTemp] = useState();

    useEffect(() => {
        if (cart) {
            const get_menu = cart.find(item => item.id === data.id);
            setQtyTemp(
                get_menu ? get_menu.qty : 1
            )   
        }
    }, [cart]);

    const addedToCart = (menuItem) => { 
        setSelectedMenu(
            (prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, qty: qtyTemp, subTotal: (qtyTemp) * item.price }
                        : item
                );
                const isExisting = prevCart.find((item) => item.id === menuItem.id);
            
                if (!isExisting) {
                    updatedCart.push({ ...menuItem, qty: qtyTemp, subTotal: menuItem.price });
                }
                
                return updatedCart;                
            }
        )
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        setCart(selectedMenu)
        if (selectedMenu && selectedMenu.length > 0) {
            setSelectedResto(selectedMenu[0].restaurant_name)
        } else {
            localStorage.removeItem("selectedResto")
        }
    }, [selectedMenu]);

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            borderRadiusLG: 4,
                            padding: 10,
                            fontSize: setSize(16, 14, 12)
                        }
                    }
                }}
            >
                <Modal
                    open={visible}
                    onCancel={() => setVisible(false)}
                    footer={false}
                    width={setSize("60%", "80%", "80%")}
                >
                    <Row
                        gutter={[24, 12]}
                    >
                        <Col
                            span={setSize(12, 12, 24)}
                        >
                            <div>
                                <div>
                                    <img src={`${import.meta.env.VITE_URL_BE}/${(data && data.image) ? data.image : ''}`} width={setSize("100%", "100%", "100%")} />
                                </div>
                            </div>
                        </Col>
                        <Col
                            span={setSize(12, 12, 24)}
                        >
                            <div
                                style={{
                                    paddingBottom: setSize(0, 0, 50)
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: setSize(24, 18, 16),
                                        fontFamily: 'Plus Jakarta Sans',
                                        fontWeight: 800,
                                    }}
                                >
                                    {
                                        (data && data.name) ? data.name : ''
                                    }
                                </div>
                                <div
                                    style={{
                                        fontSize: setSize(16, 10, 10),
                                        fontFamily: 'Plus Jakarta Sans',
                                        fontWeight: 600
                                    }}
                                >
                                    {
                                        (data && data.description) ? data.description : ''
                                    }
                                </div>
                            </div>
                            <div
                                style={{
                                    bottom: 0,
                                    position: setSize('absolute', 'absolute', ''),
                                    width: '100%',
                                }}
                            >
                                <Row
                                    justify={"space-between"}
                                    align={"middle"}
                                >
                                    <Col
                                        span={12}
                                    >
                                        <div
                                            style={{
                                                fontSize: setSize(18, 12, 12),
                                                fontFamily: 'Plus Jakarta Sans',
                                                fontWeight: 800
                                            }}
                                        >
                                            Rp. {(data && data.price) ? parseFloat(data.price).toLocaleString() : '-'}
                                        </div>
                                    </Col>
                                    <Col
                                        span={setSize(9, 10, 8)}
                                        style={{
                                            paddingRight: setSize(30, 20, 5),
                                        }}
                                    >
                                        <Row
                                            justify='space-between'
                                            align='middle'
                                        >
                                            <Col
                                                className='icon-hover'
                                            >
                                                <IconCircleMinus 
                                                    size={setSize(28, 18, 16)}
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => qtyTemp > 0 && setQtyTemp(qtyTemp - 1)}
                                                />
                                            </Col>
                                            <Col>
                                                <div
                                                    style={{
                                                        color: '#FF815B',
                                                        fontSize: setSize(20, 12, 12),
                                                        padding: setSize('0px 10px', '0px 5px', '0px 5px'),
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {qtyTemp}
                                                </div>
                                            </Col>
                                            <Col
                                                className='icon-hover-2'
                                            >
                                                <IconCirclePlusFilled 
                                                    size={setSize(28, 18, 16)}
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    // onClick={() => (!selectedResto || selectedResto === restaurant) && addQty(id_menu)}
                                                    onClick={() => setQtyTemp(qtyTemp + 1)}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div
                                    style={{
                                        paddingTop: 10,
                                        paddingRight: setSize(30, 10, 0)
                                    }}
                                >
                                    <Tooltip
                                        title={(selectedResto && selectedResto !== (data.restaurant_name)) && "You can't choose menus from different restaurants!"}
                                        trigger={"hover"}
                                    >
                                        <Button
                                            type='primary'
                                            style={{
                                                width: "100%",
                                                cursor:  (!selectedResto || selectedResto === (data.restaurant_name)) ? 'pointer' : 'not-allowed',
                                            }}
                                            onClick={() => (!selectedResto || selectedResto === (data.restaurant_name)) && addedToCart(data)}
                                        >
                                            Add To Cart
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </ConfigProvider>
        </>
    )
}