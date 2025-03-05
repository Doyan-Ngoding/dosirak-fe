import React, { useEffect, useRef, useState } from 'react'
import LayoutComp from '../../global/layout'
import HeaderOrder from './header'
import CategoryMenu from '../../global/menu/categoryMenu'
import { useMenu } from '../../../context/MenuContext'
import CardMenu from '../../global/menu/cardMenu'
import { 
    Anchor,
    Col,
    Row, 
} from 'antd'
import SiderOrder from './sider'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'
import ContentListComp from '../menu/contentList'
import LoginStandard from '../../global/modal/loginStandard'
import ForgotStandard from '../../global/modal/forgotStandard'
import VerifyStandard from '../../global/modal/verifyStandard'
import ResetStandard from '../../global/modal/resetStandard'
import SignupStandard from '../../global/modal/signupStandard'
import LoginMobile from '../../global/modal/loginMobile'
import ForgotMobile from '../../global/modal/forgotMobile'
import VerifyMobile from '../../global/modal/verifyMobile'
import ResetMobile from '../../global/modal/resetMobile'
import SignupMobile from '../../global/modal/signupMobile'

export default function OrderComp() {

    const {
        listMenuGroupedCategory,
        tabCategory, 
    } = useMenu();

    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        cart, setCart
    } = useOrder();

    const {
        modalLogin, setModalLogin,
        modalSignup, setModalSignup,
        modalOtp, setModalOtp,
        modalReset, setModalReset,
        modalForgot, setModalForgot,
        setSize,
        isMobile,
        handleLogin,
        handleRegister,
        authUser,
        isLoading,
        token
    } = useAuth();

    const addedToCart = (menuItem) => { 
        setSelectedMenu(
            (prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                        : item
                );
                const isExisting = prevCart.find((item) => item.id === menuItem.id);
            
                if (!isExisting) {
                    updatedCart.push({ ...menuItem, qty: 1, subTotal: menuItem.price });
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
    }, [selectedMenu]);
    
    return (
        <>
            <LayoutComp>
                <Row>
                    <Col
                        span={selectedMenu.length > 0 ? setSize(18, 16, 24) : 24}
                    >
                        <div
                            style={{
                                padding: setSize("50px 80px", "30px 50px", "30px")
                            }}
                        >
                            <HeaderOrder />
                            <div
                                className="sticky lg:top-[75px] md:top-[65px] top-[55px] z-10 bg-white w-auto text-[Plus Jakarta Sans]"
                            >
                                <div
                                    className="overflow-x-auto whitespace-nowrap custom-scroll border-b border-gray-500 mb-5"
                                >
                                    <Anchor
                                        direction="horizontal"
                                        className="inline-flex space-x-4"
                                        targetOffset={150}
                                        items={
                                            tabCategory ? tabCategory.map((value) => ({
                                                key: value,
                                                href: '#'+value,
                                                title: value,
                                            })) : []
                                        }
                                    />
                                </div>
                            </div>
                            {
                                listMenuGroupedCategory.map((value) => (
                                    <>
                                        <div
                                            id={value.category} 
                                            className='pb-20'
                                        >
                                            <div
                                                className='lg:text-3xl md:text-2xl text-lg text-[#6B6B6B] font-semibold'
                                            >
                                                {value.category}
                                            </div>
                                            <Row
                                                className='pt-5'
                                                gutter={[28, 28]}
                                            >
                                                {
                                                    value.menu.map((value, key) => (
                                                        <>
                                                            <Col
                                                                span={
                                                                    setSize(selectedMenu.length > 0 ? 8 : 6, selectedMenu.length > 0 ? 12 : 8, 12)
                                                                }
                                                            >
                                                                <CardMenu 
                                                                    image={value.image}
                                                                    restaurant={value.restaurant_name}
                                                                    title={value.name}
                                                                    desc={value.description}
                                                                    price={value.price}
                                                                    stock={value.qty}
                                                                    addToCart={() => addedToCart(value)}
                                                                />
                                                            </Col>
                                                        </>
                                                    ))
                                                }
                                            </Row>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </Col>
                    {
                        selectedMenu.length > 0 && (
                            <Col
                                span={setSize(6, 8, 24)}
                            >
                                <SiderOrder /> 
                            </Col>
                        )
                    }
                </Row>
                <style>
                {`
                    .ant-anchor-link {
                        width: ${setSize('200px', '150px', '100px')};
                        text-align: center;
                        display: inline-block;
                        transition: all 0.3s ease;
                        white-space: nowrap;
                    }

                    .ant-anchor-link-active > a {
                        background-color: rgba(255, 69, 0, 0.1);
                        color: #ff4500; 
                        width: ${setSize('200px', '150px', '100px')};
                        border-radius: 0px;
                        display: inline-block;
                        text-align: center;
                        font-weight: 700;
                    }
                `}
                </style>
                {
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
                }
            </LayoutComp>
        </>
    )
}
