import React from 'react'
import { useRestaurant } from '../../../context/RestaurantContext'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';
import { Button, Col } from 'antd';
import { IconChevronCompactRight, IconChevronRight } from '@tabler/icons-react';

export default function RestoComp() {

    const navigate = useNavigate();

    const {
        listNearRestaurant,
    } = useRestaurant();

    const {
        setSize
    } = useAuth();

    const {
        setSelectedResto
    } = useOrder()
    
    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] text-center px-10'
            >
                <div
                    className='text-[#A5ABB3] leading-1 font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    WHAT WE SERVE
                </div>
                <div 
                    className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    YOUR REALIABLE KOREAN FOOD DELIVERY
                </div>
                <div
                    className='flex overflow-x-auto space-x-5 w-full no-scrollbar mt-10'
                >
                    {
                        listNearRestaurant && listNearRestaurant.map((value, key) => (
                            <>
                                <Col
                                    key={key}
                                    span={setSize(6, 8, 12)}
                                    style={{
                                        border: '1px solid lightGrey',
                                        borderRadius: 10,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            height: setSize('70%', '55%', '60%'),
                                            paddingBottom: '10px',
                                        }}
                                    >
                                        <img  
                                            src={`/assets/more-resto/${value.name}.png`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `/assets/${value.image}`;
                                            }}
                                            style={{
                                                maxWidth: '100%',
                                                height: '100%',
                                                display: 'block',
                                                margin: '0 auto',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            size={setSize('large', 'medium', 'small')}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                margin: '0 auto',
                                                borderRadius: 50,
                                                color: '#E83600',
                                                borderColor: '#E83600',
                                            }}
                                            onClick={() => (setSelectedResto(value.name), navigate(`/menu?s=${value.name}`))}
                                        >
                                            See Restaurant Menu <IconChevronRight size={setSize(18, 18, 12)} color='#E83600' />
                                        </Button>
                                    </div>
                                </Col>       
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
