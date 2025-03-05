import React from 'react'
import { Button, Carousel, ConfigProvider } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function CoverComp() {

    const { setSize } = useAuth()
    const navigate = useNavigate()

    const ChildComp = ({text1 = '', text2 = ''}) => (
        <div
            className='absolute lg:bottom-20 md:bottom-10 bottom-10 left-1/2 transform -translate-x-1/2 w-full text-center'  
        >
            <div
                className='bebas-neue-regular font-medium lg:text-[85px] md:text-[60px] text-[30px]'
            >
                <div>
                <div className='lg:leading-[30px] md:leading-[15px] leading-[10px] text-white'>{text1}</div>
                    <div className='text-[#FFF948]'>{text2}</div>
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
                            color: '#E83600',
                            fontWeight: 600
                        }}
                        onClick={() => navigate('/order')}
                    >
                        SET SCHEDULE ORDER →
                    </Button>
                    <Button
                        size={setSize('large', 'medium', 'small')}
                        type='primary'
                        style={{
                            borderRadius: 50,
                            fontWeight: 600
                        }}
                        onClick={() => navigate('/menu')}
                    >
                        EXPLORE MENU →
                    </Button>
                </ConfigProvider>
            </div>
        </div>
    )

    return (
        <>
            <Carousel>
                <div
                    className='!w-[100%]'
                >
                    <div
                        className={`bg-[url(/assets/cover/menu.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[500px] h-[300px] w-full max-w-full xl:w-[100%]`}
                    >
                       <ChildComp 
                            text1='AUTHENTIC KOREAN LUNCH BOXES,'
                            text2='DELIVERED FRESH & HEALTHY!'
                       />
                    </div>
                </div>
            </Carousel>
        </>
    )
}
