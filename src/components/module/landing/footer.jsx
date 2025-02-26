import React from 'react'
import { Button, ConfigProvider } from 'antd'
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
                className='bg-[#E83600] lg:pt-[150px] md:pt-[100px] pt-[70px] text-center'
            >
                <div
                    className='text-[#FFFFFF] font-[Plus Jakarta Sans] lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    REALY HUNGRY? RUN TO
                </div>
                <div 
                    className='text-[#FFFFFF] font-[Thunder] font-bold lg:text-[120px] md:text-[70px] text-[50px]'
                >
                    DOSIRAK KOREAN 
                </div>
                <div 
                    className='lg:leading-10 md:leading-8 leading-5 text-[#FFFFFF] font-[Thunder] font-bold lg:text-[120px] md:text-[70px] text-[50px]'
                >
                    FRIED CHICKEN
                </div>
                <div
                    className='font-[Plus Jakarta Sans] flex justify-center gap-3 lg:mt-10 md:mt-8 mt-5'
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    borderRadius: 50,
                                    paddingInlineLG: '20px',
                                    fontSize: setSize(26, 14, 10)
                                }
                            }
                        }}
                    >
                        <Button
                            size={setSize('large', 'medium', 'small')}
                            style={{
                                borderRadius: 50,
                                color: '#FFFFFF',
                                backgroundColor: 'transparent'
                            }}
                            onClick={() => navigate('/order')}
                        >
                            ORDER ONLINE
                        </Button>
                        <Button
                            size={setSize('large', 'medium', 'small')}
                            style={{
                                borderRadius: 50,
                                color: '#FFFFFF',
                                backgroundColor: 'transparent'
                            }}
                        >
                            VISIT STORE
                        </Button>
                    </ConfigProvider>
                </div>
                <div
                    className='font-[Plus Jakarta Sans] border-t border-white text-white flex justify-between lg:mt-[60px] md:mt-[40px] mt-[30px] lg:pt-[50px] md:pt-[30px] pt-[20px] pb-[10px] lg:px-5 md:px-3 px-2 lg:text-[16px] md:text-[12px] text-[10px]'
                >
                    <div>
                        PRIVACY POLICY
                    </div>
                    <div>
                        T&C
                    </div>
                    <div>
                        PRICING
                    </div>
                </div>
            </div>
        </>
    )
}
