import React, { useEffect } from 'react'
import CardTitle from '../../global/title/cardTitle'
import CardMenuCart from '../../global/menu/cardMenuCart'
import CardTotal from '../../global/menu/cardTotal'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'
import ModalComp from '../../global/modal'
import { ConfigProvider, Input } from 'antd'
import { IconCirclePlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

export default function SiderOrder() {

    const navigate = useNavigate();

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
    } = useOrder();

    const {
        isLogin,
        modalLogin, setModalLogin,
        modalOtp, setModalOtp,
    } = useAuth();

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

    const onCheckout = () => {
        isLogin ? console.log('yes') : setModalLogin(true)
    }

    const handleSubmitEmail = async () => {
        setModalOtp(true);
        await setModalLogin(false);
    }

    const handleSubmitOtp = async () => {
        setModalOtp(false)
        await navigate("/order-summary"); 
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        localStorage.getItem('cart') ? localStorage.removeItem('cart') : localStorage.setItem('cart', JSON.stringify(selectedMenu));
    }, [selectedMenu]);

    return (
        <>
            <div
                style={{
                    backgroundColor: '#F4F6F9',
                    height: '100%',
                    padding: 16
                }}
            >
                <CardTitle 
                    title={'ORDER LIST'}
                />
                {
                    selectedMenu.length > 0 && (
                        selectedMenu.map(value => (
                            <CardMenuCart 
                                image={value.image}
                                title={value.name}
                                price={value.price}
                                qty={value.qty}
                                addQty={() => addQty(value.id)}
                                subQty={() => subQty(value.id)}
                            />
                        ))
                    )
                }
                <CardTotal 
                    title={'Subtotal'}
                    total={subTotal}
                    titleAction={'Checkout'}
                    action={onCheckout}
                />
            </div>
            <ModalComp 
                isOpen={modalLogin}
                setIsOpen={setModalLogin}
                title={"Please Login"}
                name={"phone"}
                main={
                    <Input 
                        type='number'
                        style={{
                            borderRadius: 50,
                            fontSize: 18
                        }}
                        placeholder='Phone Number'
                        prefix={<div style={{ backgroundColor: '#287D3C', padding: '6px 12px', borderRadius: 50, color: 'white', marginRight: 10 }}>+62</div>}
                    />
                }
                titleButton={"Send OTP >"}
                action={handleSubmitEmail}
            />
            <ModalComp 
                isOpen={modalOtp}
                setIsOpen={setModalOtp}
                title={"OTP Code"}
                name={"otp"}
                main={
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    fontSize: 30
                                }
                            }
                        }}
                    >
                        <Input.OTP className='input-otp' size='large' type='number' length={4} style={{ width: '100%' }} />
                    </ConfigProvider>
                }
                child={
                    <div style={{ paddingTop: 10 }}>{`Didn't recieve code?`} <span className='clicked-text'>Resend Code</span></div>
                }
                titleButton={"Confirm >"}
                action={handleSubmitOtp}
            />
        </>
    )
}
