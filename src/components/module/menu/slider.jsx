import React from 'react'
import { Button, Carousel, ConfigProvider } from 'antd';
import { useAuth } from '../../../context/AuthContext';
import { IconRosetteDiscount } from '@tabler/icons-react';

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


export default function SliderComp() {

    const {
        setSize,
        isMobile
    } = useAuth()

    const ChildComp = ({text1 = '', text2 = ''}) => (
        <>
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
                <div
                    className='lg:px-[50px] md:px-[30px] px-[20px] reltive h-[100%]'
                >
                    <div
                        className='absolute bottom-0'
                    >
                        <div
                            className='font-[Plus Jakarta Sans] flex justify-start'
                        >
                            <Button
                                size={setSize('large', 'small', 'small')}
                                style={{
                                    borderRadius: 50,
                                    color: '#FFFFFF',
                                    backgroundColor: '#FFFFFF66',
                                    fontSize: setSize(16, 10, 8),
                                    height: isMobile && 20
                                }}
                                icon={
                                    <IconRosetteDiscount 
                                        size={setSize(20, 12, 11)}
                                        style={{
                                            marginTop: setSize('4px', '3px', '3px')
                                        }}
                                    />
                                }
                                iconPosition='end'
                            >
                                Our Exclusive Deals
                            </Button>
                        </div>
                        <div
                            className='font-[Thunder] font-extrabold lg:text-[90px] md:text-[50px] text-[30px]'
                        >
                            <div>
                                <div className='text-white flex items-center'><div>{text1}</div><img src='./assets/icon/fire.png' style={{ width: setSize('8%', '5%', '6%'), height: '2%', paddingBottom: setSize('15px', '10px', '8px') }}/></div>
                                <div className='leading-[10px] text-white'>{text2}</div>
                            </div>
                        </div>
                        <div
                            className='font-[Plus Jakarta Sans] lg:my-7 md:my-5 my-2 lg:w-[70%] md:w-[60%] w-[60%]'
                        >
                            <div 
                                className='text-[#FFFFFF66] md:leading-4 leading-3 lg:text-[14px] md:text-[12px] text-[10px]'
                            >
                                Enjoy authentic Korean meals with Dosirak! 🍱✨ Get 10% OFF your first order and experience fresh, high-quality flavors delivered to your door.
                            </div>
                        </div>
                        <div
                            className='font-[Plus Jakarta Sans] flex justify-start lg:pb-15 md:pb-8 pb-5'
                        >
                            <Button
                                size={setSize('large', 'small', 'small')}
                                style={{
                                    borderRadius: 50,
                                    color: '#E83600',
                                    backgroundColor: '#FFFFFF',
                                    fontSize: setSize(16, 10, 8),
                                    height: isMobile && 20
                                }}
                            >
                                ORDER NOW & GRAB PROMO →
                            </Button>
                        </div>
                    </div>
                </div>
            </ConfigProvider>
        </>
    )

    return (
        <>
            <Carousel autoplay>
                <div
                    className={`bg-[url(./assets/cover/banner-1.png)] bg-cover bg-bottom bg-no-repeat lg:h-[75vh] md:h-[350px] h-[250px] w-full max-w-full xl:w-[100%]`}
                >
                    <ChildComp 
                        text1="TASTE THE LEGEND"
                        text2="TASTE THE LEGEND"
                    />
                </div>
                {/* <div
                    className={`bg-[url(./assets/cover/banner-2.png)] bg-cover bg-bottom bg-no-repeat lg:h-[75vh] md:h-[400px] h-[200px] w-full max-w-full xl:w-[100%]`}
                >
                    <ChildComp />
                </div>
                <div
                    className={`bg-[url(./assets/cover/banner-3.png)] bg-cover bg-bottom bg-no-repeat lg:h-[75vh] md:h-[400px] h-[200px] w-full max-w-full xl:w-[100%]`}
                >
                    <ChildComp />
                </div> */}
                {/* <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div> */}
            </Carousel>
        </>
    )
}