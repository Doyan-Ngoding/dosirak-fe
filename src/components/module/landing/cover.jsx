import React from 'react'
import { Button, ConfigProvider } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CoverComp() {

    const { setSize } = useAuth()
    const navigate = useNavigate()

    return (
        <>
            <div
                className='!w-[100%]'
            >
                <div
                    className={`bg-[url(./assets/cover/menu.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[500px] h-[300px] w-full max-w-full xl:w-[100%]`}
                >
                    <div
                        className='absolute lg:bottom-20 md:bottom-10 bottom-10 left-1/2 transform -translate-x-1/2 w-full text-center'  
                    >
                        <div
                            className='font-[Thunder] font-extrabold lg:text-[90px] md:text-[50px] text-[30px]'
                        >
                            <div>
                                <div className='leading-[10px] text-white'>AUTHENTIC KOREAN LUNCH BOXES,</div>
                                <div className='text-[#FFF948]'>DELIVERED FRESH & HEALTHY!</div>
                            </div>
                        </div>
                        <div
                            className='font-[Plus Jakarta Sans] flex justify-center gap-3'
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
                                        color: '#E83600'
                                    }}
                                    onClick={() => navigate('/order')}
                                >
                                    SET SCHEDULE ORDER →
                                </Button>
                                <Button
                                    size={setSize('large', 'medium', 'small')}
                                    type='primary'
                                    style={{
                                        borderRadius: 50
                                    }}
                                    onClick={() => navigate('/menu')}
                                >
                                    EXPLORE MENU →
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
