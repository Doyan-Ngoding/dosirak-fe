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
                            className='bebas-neue-regular font-medium lg:text-[80px] md:text-[42px] text-[30px]'
                        >
                            <div>
                                <div className='text-[#FFF948] flex items-center'><div>{text1}</div><img src='/assets/icon/fire.png' style={{ width: setSize('8%', '5%', '6%'), height: '2%', paddingBottom: setSize('15px', '10px', '8px') }}/></div>
                                <div className='leading-[10px] text-[#FFF948]'>{text2}</div>
                            </div>
                        </div>
                        <div
                            className='font-[Plus Jakarta Sans] lg:my-10 md:my-5 my-2 lg:w-[70%] md:w-[60%] w-[50%]'
                        >
                            <div 
                                className='text-[#FFFFFF] md:leading-4 leading-3 lg:text-[14px] md:text-[12px] text-[10px]'
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
            {/* <Carousel> */}
            <Carousel autoplay>
                <div
                    className={`bg-[url(/assets/cover/banners-1.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[350px] h-[250px] w-full max-w-full xl:w-[100%]`}
                >
                    <ChildComp 
                        text1="TASTE THE LEGEND"
                        text2="PAIK'S NOODLES X DOSIRAK PROMO!"
                    />
                </div>
                <div
                    className={`bg-[url(/assets/cover/banners-2.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[350px] h-[250px] w-full max-w-full xl:w-[100%]`}
                >
                    <ChildComp 
                        text1="FIRST ORDER SPESIAL!"
                        text2="FIND YOUR FAVORITE KOREAN DISH"
                    />
                </div>
                <div
                    className={`bg-[url(/assets/cover/banners-3.png)] bg-cover bg-center bg-no-repeat lg:h-[100vh] md:h-[350px] h-[250px] w-full max-w-full xl:w-[100%]`}
                >
                    <ChildComp 
                        text1="TASTE KOREA, ONE BOX AT A TIME!"
                        text2="ORDER NOW & ENJOY A FLAVORFUL MEAL!"
                    />
                </div>
            </Carousel>
        </>
    )
}