import React, { useEffect, useState } from 'react'
import CardTitle from '../../global/title/cardTitle'
import CardMenuCart from '../../global/menu/cardMenuCart'
import CardTotal from '../../global/menu/cardTotal'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'
import ModalComp from '../../global/modal'
import { ConfigProvider, Input, message } from 'antd'
import { IconCirclePlus } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import LoginStandard from '../../global/modal/loginStandard'
import LoginMobile from '../../global/modal/loginMobile'
import SignupStandard from '../../global/modal/signupStandard'
import SignupMobile from '../../global/modal/signupMobile'
import VerifyStandard from '../../global/modal/verifyStandard'
import VerifyMobile from '../../global/modal/verifyMobile'
import CompleteStandard from '../../global/modal/completeStandard'
import ResetStandard from '../../global/modal/resetStandard'
import ResetMobile from '../../global/modal/resetMobile'
import ForgotStandard from '../../global/modal/forgotStandard'
import ForgotMobile from '../../global/modal/forgotMobile'

export default function SiderOrder() {

    const navigate = useNavigate();

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        addQty, subQty,
        cart, setCart
    } = useOrder();

    const {
        setModalLogin,
        setModalOtp,
        token
    } = useAuth();

    const [validMessage, setValidMessage] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const [qtyTemp, setQtyTemp] = useState(0);

    const onCheckout = () => {
        const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        if (totalQty < 15) {
            setValidMessage(["error", "Minimum order is 15 items"])
        } else if (totalQty > 200) {
            setValidMessage(["error", "Maximum order is 200 items"])
        } else {
            token ? navigate("/order-summary") : setModalLogin(true)
        }
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        setCart(selectedMenu)
    }, [selectedMenu]);

    useEffect(() => {
        setQtyTemp(cart.reduce((sum, item) => sum + (item.qty || 0), 0))
    }, [cart]);

     useEffect(() => {
        if (validMessage && validMessage.length === 2) {
            const [type, content] = validMessage;
            messageApi[type](content);
        }
    }, [validMessage, messageApi]);

    return (
        <>
            {contextHolder}
            <div
                className='bg-[#F4F6F9] h-full p-4'
            >
                <CardTitle 
                    title={'ORDER LIST'}
                />
                {
                    selectedMenu.length > 0 && (
                        [...selectedMenu].reverse().map(value => (
                            <CardMenuCart 
                                image={value.image}
                                title={value.name}
                                price={value.price}
                                qty={value.qty}
                                addQty={() => addQty(value.id, value.variant || null, value.size || null)}
                                subQty={() => subQty(value.id, value.variant || null, value.size || null)}
                                id_menu={value.id}
                                variant={value.variant || null}
                                size={value.size || null}
                            />
                        ))
                    )
                }
                <CardTotal 
                    title={'Subtotal'}
                    total={subTotal}
                    titleAction={'Checkout'}
                    action={onCheckout}
                    qtyTemp={qtyTemp}
                />
            </div>
            {/* {
                !isMobile ? (
                    <>
                        <LoginStandard 
                            isOpen={modalLogin}
                            setIsOpen={setModalLogin}
                            action={handleLogin}
                            loading={isLoading}
                        />
                        <ForgotStandard 
                            isOpen={modalForgot}
                            setIsOpen={setModalForgot}
                        />
                        <VerifyStandard 
                            isOpen={modalOtp}
                            setIsOpen={setModalOtp}
                        />
                        <ResetStandard 
                            isOpen={modalReset}
                            setIsOpen={setModalReset}
                        />
                        <SignupStandard 
                            isOpen={modalSignup}
                            setIsOpen={setModalSignup}
                        />
                    </>
                ) : (
                    <>
                        <LoginMobile 
                            isOpen={modalLogin}
                            setIsOpen={setModalLogin}
                            action={handleLogin}
                            loading={isLoading}
                        />
                        <ForgotMobile 
                            isOpen={modalForgot}
                            setIsOpen={setModalForgot}
                        />
                        <VerifyMobile 
                            isOpen={modalOtp}
                            setIsOpen={setModalOtp}
                        />
                        <ResetMobile 
                            isOpen={modalReset}
                            setIsOpen={setModalReset}
                        />
                        <SignupMobile 
                            isOpen={modalSignup}
                            setIsOpen={setModalSignup}
                        />
                    </>
                )
            } */}
        </>
    )
}
