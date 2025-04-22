import React, { useEffect, useState } from 'react'
import { 
    Button,
    Col,
    ConfigProvider,
    Input,
    message,
    Row 
} from 'antd'
import { 
    IconHomeFilled, 
    IconMapPin, 
    IconMapPinFilled, 
    IconPencilMinus 
} from '@tabler/icons-react';
import { useOrder } from '../../../../context/OrderContext';
import { useAuth } from '../../../../context/AuthContext';
import axios from 'axios';
import { useRestaurant } from '../../../../context/RestaurantContext';
const { TextArea } = Input;

export default function CardAddress() {

    const {
        editAbleAddress, setEditAbleAddress,
        addressUser, setAddressUser,
        messageAddress,
        validAddress,
        validAddress2,
        addressUserCurr,
        handleCreateQuotationTemp,
    } = useOrder()

    const {
        setSize,
        authUser
    } = useAuth()

    // useEffect(() => {
    //     if (authUser && authUser?.location) {
    //         setAddressUser(authUser.location);
    //         validAddress(authUser.location)
    //     }
    // }, [authUser]);

    const showPosition = (pos) => {
        const crd = pos.coords;
        validAddress2(crd.longitude, crd.latitude)
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            validAddress(authUser && authUser.location)
        }
    }, []);

    const clickedMap = () => {
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if ((messageAddress && messageAddress.length === 2)) {
            const [type, content] = messageAddress;
            messageApi[type](content)
        }
    }, [messageAddress]);

    useEffect(() => {
        if (localStorage.getItem("subRestoAddress") && addressUserCurr) {
            handleCreateQuotationTemp()
        }
    }, [localStorage.getItem("subRestoAddress"), addressUserCurr]);
    
    return (
        <>
            {contextHolder}
            <Row
                align={"middle"}
                justify={"end"}
                gutter={[0, 12]}
                className='bg-white lg:p-5 md:p-3.5 p-3 rounded-lg'
            >
                <Col
                    span={24}
                >
                    <div
                        className='text-[#393939] flex justify-between font-semibold lg:text-lg md:text-[16px] text-[12px]'
                    >
                        DELIVERY TO <div style={{ paddingRight: 10}}><IconMapPinFilled color='#E83600' onClick={clickedMap} style={{ cursor: 'pointer'}} /></div>
                    </div>
                </Col>
                <Col
                    span={24}
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    fontSize: setSize(14, 14, 12)
                                }
                            }
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: editAbleAddress ? '' : 'rgba(40, 125, 60, 0.05)',
                                border: editAbleAddress ? '1px solid #DCDCDC' : '1px solid #287D3C',
                                padding: "2px 5px",
                                borderRadius: 10
                            }}
                        >
                            <IconHomeFilled 
                                color='#287D3C'  
                                size={26} 
                            />
                            <TextArea 
                                rows={2}
                                variant='borderless'
                                disabled={editAbleAddress ? false : true}
                                value={addressUser}
                                onChange={(e) => setAddressUser(e.target.value)}
                            />
                        </div>
                        
                    </ConfigProvider>
                </Col>
                <Col
                    style={{
                        padding: '0px 5px'
                    }}
                >
                    <div
                        className='input-address'
                        onClick={() => setEditAbleAddress(!editAbleAddress)}
                    >
                        {
                            editAbleAddress ? (
                                <Button
                                    type='primary'
                                    onClick={() => validAddress(addressUser)}
                                >
                                    Save
                                </Button>
                            ) : (
                                <>
                                    <IconPencilMinus 
                                        size={setSize(20, 18, 16)}
                                    />
                                    <div
                                        style={{
                                            paddingLeft: 10,
                                            fontSize: setSize(14, 14, 12)
                                        }}
                                    >
                                        Change Address
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </>
    )
}
