import React from 'react'
import { Button, Carousel, ConfigProvider } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IconChevronRight, IconToolsKitchen2 } from '@tabler/icons-react'

export default function CoverComp() {

    const { setSize } = useAuth()
    const navigate = useNavigate()

    const ChildComp = ({text1 = '', text2 = ''}) => (
        <div
            className='w-full text-center flex justify-center'  
        >
            <div
                className='absolute bottom-20 bebas-neue-regular font-medium lg:text-[85px] md:text-[60px] text-[30px]'
            >
                <div>
                <div className='lg:leading-[30px] md:leading-[15px] leading-[10px] text-white'>{text1}</div>
                    <div className='text-[#FFF948]'>{text2}</div>
                </div>
            </div>
            <div
                className='absolute bottom-10 font-[Plus Jakarta Sans] flex justify-center gap-3'
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
                        SET SCHEDULE ORDER <IconChevronRight size={setSize(16, 14, 10)} />
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
                        EXPLORE MENU <IconToolsKitchen2 size={setSize(16, 14, 10)} />
                    </Button>
                </ConfigProvider>
            </div>
        </div>
    )

    return (
        <>
            <Carousel autoplay>
                    <div
                        className={`bg-[url(/assets/cover/menu.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[500px] h-[300px] w-full max-w-full xl:w-[100%]`}
                    >
                       <ChildComp 
                            text1='AUTHENTIC KOREAN LUNCH BOXES,'
                            text2='DELIVERED FRESH & HEALTHY!'
                       />
                    </div> 
                    <div
                        className={`bg-[url(/assets/cover/banners-2.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[500px] h-[300px] w-full max-w-full xl:w-[100%]`}
                    >
                       <ChildComp 
                            text1='AUTHENTIC KOREAN LUNCH BOXES,'
                            text2='DELIVERED FRESH & HEALTHY!'
                       />
                    </div>
                    <div
                        className={`bg-[url(/assets/cover/banners-3.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[500px] h-[300px] w-full max-w-full xl:w-[100%]`}
                    >
                       <ChildComp 
                            text1='AUTHENTIC KOREAN LUNCH BOXES,'
                            text2='DELIVERED FRESH & HEALTHY!'
                       />
                    </div>
            </Carousel>
        </>
    )
}
