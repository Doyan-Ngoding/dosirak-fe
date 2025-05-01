import React from 'react'
import { Button, Col, ConfigProvider, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function FooterComp() {

    const {
        setSize,
    } = useAuth()

    const navigate = useNavigate()

    return (
        <>
            <div
                className='bg-[#FFFFFF] lg:pt-[50px] md:pt-[40px] pt-[30px]'
            >
                <div
                    className='lg:px-[50px] md:px-[30px] px-[20px] font-[Noto Sans KR] lg:mb-5 md:mb-3'
                >
                    <Row>
                        <Col
                            span={setSize(9, 8, 12)}
                            style={{
                                marginBottom: setSize(0, 0, 20),
                                fontFamily: 'Noto Sans KR'
                            }}
                        >
                            <div>
                                <img src='/assets-v2/logo/dosirak-logo.png' alt="Dosriak" width={setSize('32px', '28px', '24px')} />
                            </div>
                            <div 
                                className='font-semibold lg:text-[14px] md:text-[12px] text-[11px] lg:w-[40%] md:w-[70%] w-[60%] lg:my-5 md:my-4 my-3'
                            >
                                Savor the Korean artistry where every dish is a culinary masterpiece
                            </div>
                            <div
                                className='text-[#555555] lg:text-[12px] md:text-[10px] text-[9px]'
                            >
                                Karawaci, Tangerang 15115
                            </div>
                        </Col>
                        <Col
                            span={setSize(5, 7, 12)}
                            style={{
                                fontFamily: 'Noto Sans KR'
                            }}
                        >
                            <div 
                                className='font-semibold lg:text-[14px] md:text-[12px] text-[11px] lg:pb-4 md:pb-3 pb-2.5'
                            >
                                Available Restaurants
                            </div>
                            <div
                                className='lg:pb-3 md:pb-2 pb-1.5 lg:text-[12px] md:text-[10px] text-[10px]'
                            >
                                Paik's Noodle
                            </div>
                            <div
                                className='lg:pb-3 md:pb-2 pb-1.5 lg:text-[12px] md:text-[10px] text-[10px]'
                            >
                                Smile Kimbab
                            </div>
                            <div
                                className='lg:text-[12px] md:text-[10px] text-[10px]'
                            >
                                Hongkong Banjum
                            </div>
                        </Col>
                        <Col
                            span={setSize(5, 5, 12)}
                            style={{
                                fontFamily: 'Noto Sans KR',
                            }}
                        >
                            <div
                                className='font-semibold lg:text-[14px] md:text-[12px] text-[11px] lg:pb-4 md:pb-3 pb-2.5'
                            >
                                Main Menu
                            </div>
                            <div
                                className='lg:pb-3 md:pb-2 pb-1.5 lg:text-[12px] md:text-[10px] text-[10px] cursor-pointer'
                                onClick={() => navigate('/')}
                            >
                                Home
                            </div>
                            <div
                                className='lg:pb-3 md:pb-2 pb-1.5 lg:text-[12px] md:text-[10px] text-[10px] cursor-pointer'
                                onClick={() => navigate('/menu')}
                            >
                                Menu
                            </div>
                            <div
                                className='lg:pb-3 md:pb-2 pb-1.5 lg:text-[12px] md:text-[10px] text-[10px] cursor-pointer'
                                onClick={() => navigate('/contact')}
                            >
                                Contact
                            </div>
                            <div
                                className='lg:text-[12px] md:text-[10px] text-[10px] cursor-pointer'
                                onClick={() => navigate('/about')}
                            >
                                About
                            </div>
                        </Col>
                        <Col
                            span={setSize(5, 4, 12)}
                            style={{
                                fontFamily: 'Noto Sans KR'
                            }}
                        >
                            <div
                                className='font-semibold lg:text-[14px] md:text-[12px] text-[11px] lg:pb-4 md:pb-3 pb-2.5'
                            >
                                Contact Us
                            </div>
                            <div
                                className='lg:pb-3 md:pb-2 pb-1.5 lg:text-[12px] md:text-[10px] text-[10px]'
                            >
                                halo@kdosirak.com
                            </div>
                            <div
                                className='lg:text-[12px] md:text-[10px] text-[10px]'
                            >
                                +62 958 248 966
                            </div>
                        </Col>
                    </Row>
                </div>
                <div
                    className='bg-[#FF6B00] font-[Noto Sans KR] text-white flex justify-center space-x-5 lg:p-2 md:p-1 p-1 lg:text-[12px] md:text-[10px] text-[8px]'
                >
                    <div>
                        © 2025
                    </div>
                    <div>
                        KDOSIRAK
                    </div>
                    <div>
                        ALL RIGHTS RESERVED
                    </div>
                </div>
            </div>
        </>
    )
}
