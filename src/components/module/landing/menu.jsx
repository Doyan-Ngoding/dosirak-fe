import React, { useEffect } from 'react'
import { useRestaurant } from '../../../context/RestaurantContext'
import { Button, Col, ConfigProvider, DatePicker, Input, Row, Select } from 'antd'
import { useAuth } from '../../../context/AuthContext';
import { IconCalendarWeek, IconChevronDown, IconClock, IconMapPinFilled, IconRosetteFilled, IconSearch, IconToolsKitchen2, IconX } from '@tabler/icons-react';
import { useMenu } from '../../../context/MenuContext';
import CardMenu from '../../global/menu/cardMenu';
import CardMenuHome from '../../global/menu/cardMenuHome';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
        listMenu,
        listCategory,
        selectedCategory, setSelectedCategory,
    } = useMenu()

    const navigate = useNavigate()

    const disabledDate = (current) => {
        return current && current < dayjs().add(1, 'day').endOf('day');
    };

    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    className='text-[#A5ABB3] leading-1 font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    OUR MENU
                </div>
                <div 
                    className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    EXPERIENCE THE TASTE OF
                </div>
                <div 
                    className='text-[#E83600] leading-3 bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    KOREA IN EVERY BITE
                </div>
                <div 
                    className='border-b border-[#A5ABB3] lg:my-10 md:my-8 my-5'
                />
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#6B6B6B',
                                colorText: '#6B6B6B',
                                colorBorder: '#A5ABB3',
                                controlHeight: setSize(42, 28, 20),
                                fontSize: setSize(18, 12, 10),
                                borderRadius: setSize(8, 6, 4),
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#E83600',
                                optionSelectedColor: '#FFFFFF'
                            },
                            DatePicker: {
                                controlHeight: setSize(38, 32, 28),
                                fontSize: setSize(18, 12, 10),
                                borderRadius: setSize(8, 6, 4),
                                colorBorder: '#A5ABB3',
                            }
                        }
                    }}
                >
                    <Row
                        justify={"space-between"}
                        align={"middle"}
                        style={{
                            marginBottom: 12
                        }}
                        gutter={[24, 6]}
                    >
                        <Col
                            span={setSize(8, 8, 24)}
                        >
                            <Select 
                                style={{
                                    width: '100%'
                                }}
                                prefix={
                                    <IconToolsKitchen2 
                                        color='#FA5523'
                                        size={setSize(24, 14, 12)}
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                suffixIcon={
                                    <IconChevronDown 
                                        size={setSize(24, 14, 12)}
                                    />
                                }
                                placeholder="Category Menu"
                                options={
                                    listCategory.map(val => ({
                                        label: val.name, 
                                        value: val.name
                                    }))
                                }
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e)}
                            />
                        </Col>
                        <Col
                            span={setSize(8, 8, 12)}
                        >
                            <DatePicker 
                                style={{
                                    width: '100%'
                                }}
                                prefix={
                                    <IconCalendarWeek 
                                        color='#FA5523'
                                        size={setSize(24, 14, 12)}
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                suffixIcon={
                                    <IconChevronDown 
                                        size={setSize(24, 14, 12)}
                                    />
                                }
                                placeholder='Order Date'
                                disabledDate={disabledDate} 
                            />
                        </Col>
                        <Col
                            span={setSize(8, 8, 12)}
                        >   
                             <Select 
                                style={{
                                    width: '100%'
                                }}
                                prefix={
                                    <IconClock 
                                        color='#FA5523'
                                        size={setSize(24, 14, 12)}
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                suffixIcon={
                                    <IconChevronDown 
                                        size={setSize(24, 14, 12)}
                                    />
                                }
                                placeholder="Delivery Time"
                                options={[
                                    { value: '08.00 - 09.00', label: '08.00 - 09.00' },
                                    { value: '09.00 - 10.00', label: '09.00 - 10.00' },
                                    { value: '10.00 - 11.00', label: '10.00 - 11.00' },
                                    { value: '11.00 - 12.00', label: '11.00 - 12.00' },
                                    { value: '12.00 - 13.00', label: '12.00 - 13.00' },
                                    { value: '13.00 - 14.00', label: '13.00 - 14.00' },
                                ]}
                            />
                        </Col>
                    </Row>
                </ConfigProvider>
                <div
                    className='text-[#858C94] bebas-neue-regular lg:text-[40px] md:text-[20px] text-[14px]'
                >
                    {selectedCategory && selectedCategory.toUpperCase()}
                </div>
                <div
                    className='flex justify-between items-center gap-5'
                >
                    <div
                        className='lg:w-[25%] md:w-[30%] w-[50%]'
                    >
                        <Input
                            size={setSize('large', 'small', 'small')}
                            placeholder='Search your Favorite Restaurant here'
                            style={{
                                width: '100%',
                                borderRadius: '50px',
                                padding: setSize(10, 4, 3),
                                fontSize: setSize(16, 10, 8)
                            }}
                            suffix={
                                <IconSearch 
                                    style={{
                                        backgroundColor: '#6B6B6B',
                                        color: '#FFFFFF',
                                        borderRadius: 50,
                                        padding: setSize(4, 4, 2),
                                    }}
                                    size={setSize(30, 18, 13)}
                                />
                            }
                        />  
                    </div>
                    <div
                        className='flex gap-2 lg:w-[75%] md:w-[70%] w-[50%] overflow-x-auto no-scrollbar'
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
                                            width: '100%',
                                            marginTop: 1
                                        }}
                                        suffixIcon={
                                            <div
                                                className='bg-white rounded-full px-[2px] py-[1px] mr-[-5px]'
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
                            listMenu && listMenu.slice(0, 4).map((value) => (
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
