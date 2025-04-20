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
    const [parsedVariants, setParsedVariants] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        if (cart) {
            const get_menu = cart.find(item => item.id === data.id);
            setQtyTemp(
                get_menu ? get_menu.qty : 1
            )   
        }
    }, [cart]);

    useEffect(() => {
        if (data?.is_parent_menu && data?.variant) {
            const parsed = JSON.parse(data.variant);
            setParsedVariants(parsed);
            setSelectedVariant(parsed[0]?.variant);
            setSelectedSize(parsed[0]?.sizes[0]?.size);
            setCurrentPrice(Number(parsed[0]?.sizes[0]?.base_price));
        } else {
            setCurrentPrice(data?.price || 0);
        }
    }, [data]);

    useEffect(() => {
        if (data?.is_parent_menu && parsedVariants.length > 0) {
            const foundVariant = parsedVariants.find(v => v.variant === selectedVariant);
            const foundSize = foundVariant?.sizes.find(s => s.size === selectedSize);
            if (foundSize) {
                setCurrentPrice(Number(foundSize.base_price));
            }
        }
    }, [selectedVariant, selectedSize]);    

    const addedToCart = (menuItem) => {
        const finalPrice = menuItem.price;
        const variant = selectedVariant || null;
        const size = selectedSize || null;
      
        setSelectedMenu((prevCart) => {
          let updated = [...prevCart];
      
          const existingIndex = updated.findIndex(
            (item) =>
              item.id === menuItem.id &&
              item.variant === variant &&
              item.size === size
          );
      
          if (existingIndex !== -1) {
            updated[existingIndex] = {
              ...updated[existingIndex],
              qty: qtyTemp,
              subTotal: (qtyTemp) * finalPrice,
            };
          } else {
            updated.push({
              ...menuItem,
              qty: qtyTemp,
              price: currentPrice,
              subTotal: qtyTemp * currentPrice,
              variant,
              size,
            });
          }
      
          return updated;
        });
    };  
    
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

    useEffect(() => {
        if ((cart) && (data && data.id)) {
            const matched = cart.find(
                (item) =>
                    item.id === data.id 
            );
    
            if (matched) {
                setSelectedVariant(matched.variant || null);
                setSelectedSize(matched.size || null);
            } 

        }
    }, [visible, cart]);

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
                                    <img src={`/assets${(data && data.image) ? data.image : ''}`} width={setSize("100%", "100%", "100%")} />
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
                            {
                                (data?.is_parent_menu && parsedVariants.length > 0) && (
                                    <>
                                        <div style={{ marginTop: 20 }}>
                                            <div style={{ fontWeight: 700, fontSize: setSize(14, 12, 12), marginBottom: 6 }}>Variant</div>
                                            <Row gutter={[8, 8]}>
                                                {parsedVariants.map((v, i) => (
                                                <Col key={i}>
                                                    <Button
                                                    size="small"
                                                    type={selectedVariant === v.variant ? 'primary' : 'default'}
                                                    onClick={() => {
                                                        setSelectedVariant(v.variant);
                                                        setSelectedSize(v.sizes[0].size);
                                                    }}
                                                    >
                                                    {v.variant}
                                                    </Button>
                                                </Col>
                                                ))}
                                            </Row>
                                        </div>
                                        <div style={{ marginTop: 15, marginBottom: 20 }}>
                                            <div style={{ fontWeight: 700, fontSize: setSize(14, 12, 12), marginBottom: 6 }}>Size</div>
                                            <Row gutter={[8, 8]}>
                                                {parsedVariants.find(v => v.variant === selectedVariant)?.sizes.map((s, i) => (
                                                <Col key={i}>
                                                    <Button
                                                        size="small"
                                                        type={selectedSize === s.size ? 'primary' : 'default'}
                                                        onClick={() => setSelectedSize(s.size)}
                                                    >
                                                    {s.size}
                                                    </Button>
                                                </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </>
                                )
                            }

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
                                            Rp. {(data && currentPrice) ? parseFloat(currentPrice).toLocaleString() : '-'}
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
                                {
                                    (data?.is_parent_menu && parsedVariants.length > 0) && (
                                        <div className='text-[10px]'>
                                            {
                                                (data && data.name) ? data.name : ''
                                            },
                                            {
                                                (data && selectedVariant) ? ' ' + selectedVariant : ''
                                            },
                                            {
                                                (data && selectedSize) ? ' ' + selectedSize : ''
                                            }
                                        </div>
                                    )
                                }
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
                                            onClick={() => {(!selectedResto || selectedResto === (data.restaurant_name)) && addedToCart(data), setVisible(false)}}
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