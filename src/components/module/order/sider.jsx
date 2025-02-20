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
    } = useOrder();

    const {
        isLogin,
        modalLogin, setModalLogin,
        modalSignup, setModalSignup,
        modalOtp, setModalOtp,
        modalReset, setModalReset,
        modalForgot, setModalForgot,
        setSize,
        isMobile
    } = useAuth();

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
                className='bg-[#F4F6F9] h-full p-4'
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
            {
                !isMobile ? (
                    <>
                        <LoginStandard 
                            isOpen={modalLogin}
                            setIsOpen={setModalLogin}
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
            }

            {/* <ModalComp 
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
            /> */}
        </>
    )
}
