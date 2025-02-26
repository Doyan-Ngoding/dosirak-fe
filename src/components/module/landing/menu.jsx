import React, { useEffect } from 'react'
import { useRestaurant } from '../../../context/RestaurantContext'
import { Button, Col, ConfigProvider, Row, Select } from 'antd'
import { useAuth } from '../../../context/AuthContext';
import { IconChevronDown, IconMapPinFilled, IconRosetteFilled, IconX } from '@tabler/icons-react';
import { useMenu } from '../../../context/MenuContext';
import CardMenu from '../../global/menu/cardMenu';
import CardMenuHome from '../../global/menu/cardMenuHome';
import { useNavigate } from 'react-router-dom';

export default function MenuComp() {

    const {
        listNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant
    } = useRestaurant();

    const {
        setSize,
        isMobile
    } = useAuth()

    const {
        listMenu
    } = useMenu()

    const navigate = useNavigate()

    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    className='text-[#A5ABB3] font-[Plus Jakarta Sans] lg:text-[18px] md:text-[14px] text-[8px]'
                >
                    OUR MENU
                </div>
                <div 
                    className='text-[#E83600] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[18px]'
                >
                    MENU THAT ALWAYS MAKE
                </div>
                <div 
                    className='text-[#E83600] leading-[10px] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[18px]'
                >
                    YOU FALL IN LOVE
                </div>
                <div 
                    className='border-b border-[#A5ABB3] lg:my-10 md:my-8 my-5'
                />
                <div
                    className='flex justify-between'
                >
                    <div
                        className='text-[#858C94] font-[Thunder] font-bold lg:text-[40px] md:text-[20px] text-[14px]'
                    >
                        BEST SELLER
                    </div>
                    <div
                        className='flex gap-2'
                    >
                        {
                            isMobile ? (
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Select: {
                                                borderRadiusSM: 50,
                                                fontSize: 10,
                                                colorPrimary: '#287D3C',
                                                colorBgContainer: '#287D3C',
                                                colorTextPlaceholder: '#FFFFFF',
                                                colorText: '#F9F9F9',
                                                colorBorder: '#34A44F',
                                                controlHeightSM: 20,
                                                colorBgElevated: '#287D3C',
                                                optionSelectedBg: '#34A44F',
                                                colorPrimaryBorderHover: '#34A44F'
                                            }
                                        }
                                    }}
                                >
                                    <Select 
                                        size='small'
                                        options={
                                            listNearRestaurant.map(val => ({
                                                label: val.name, 
                                                value: val.name
                                            }))
                                        }
                                        value={selectedNearReastaurant}
                                        onChange={(e) => setSelectedNearReastaurant(e)}
                                        style={{
                                            width: '150px',
                                        }}
                                        suffixIcon={
                                            <div
                                                className='bg-white rounded-full px-[3px] py-[2px] mr-[-5px]'
                                            >
                                               <IconChevronDown 
                                                    color='#287D3C'
                                                    size={10}
                                                    style={{
                                                        marginTop: -3
                                                    }}
                                                />
                                            </div>                                 
                                        }
                                    />
                                </ConfigProvider>
                            ) : (
                                listNearRestaurant && listNearRestaurant.map((value) => (
                                    <Button
                                        size={setSize('large', 'small', 'small')}
                                        style={{
                                            borderRadius: 50,
                                            color: selectedNearReastaurant === value.name ? '#FFFFFF' : '#287D3C',
                                            borderColor: '#287D3C',
                                            padding: setSize('0px 25px', '0px 10px', 0),
                                            backgroundColor: selectedNearReastaurant === value.name && '#287D3C',
                                            fontSize: setSize(18, 12, 12),
                                        }}
                                        onClick={() => setSelectedNearReastaurant(value.name)}
                                        icon={
                                            selectedNearReastaurant === value.name && <IconMapPinFilled size={setSize(24, 14, 14)} style={{ marginTop: 2}} />
                                        }
                                    >
                                        {value.name}
                                    </Button>
                                )
                            ))
                        }
                    </div>
                </div>
                <div
                    className='lg:mt-10 md:mt-8 mt-5'
                >
                    <Row
                        justify={'center'}
                        align={"center"}
                        gutter={[12, 12]}
                    >
                        {
                            listMenu.slice(0, 4).map((value) => (
                                <Col
                                    span={setSize(5, 5, 8)}
                                >
                                    <CardMenuHome 
                                        image={value.image}
                                        restaurant={value.restaurant_name}
                                        title={value.name}
                                        desc={value.description}
                                        price={value.price}
                                        stock={value.qty}
                                        showResto={false}
                                        addToCart={() => navigate('/order')}
                                    />
                                </Col>
                            ))
                        }
                        <Col
                            span={setSize(4, 4, 8)}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div
                                className='relative w-[100%] lg:h-[200px] md:h-[100px] h-[100px]' 
                            >
                                <IconRosetteFilled 
                                    color='#E83600'
                                    size={setSize(180, 100, 100)}
                                    className='absolute'
                                    onClick={() => navigate('/menu')}
                                />
                               <div
                                    className='font-[Thunder] font-bold text-white lg:text-[36px] md:text-[24px] text-[24px] absolute lg:top-13 lg:left-14 md:top-6 top-6 md:left-6 left-6'
                                    onClick={() => navigate('/menu')}
                                >
                                    <div>SEE ALL</div>
                                    <div className='leading-[10px]'>MENU</div>
                               </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
