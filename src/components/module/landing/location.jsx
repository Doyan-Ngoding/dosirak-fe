import React from 'react'
import { Button, Col, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { IconMapPinFilled } from '@tabler/icons-react'

export default function LocationComp() {

    const {
        setSize
    } = useAuth()

    return (
        <>
           <Row
                justify={"space-between"}
                align={"middle"}
                className='lg:py-[50px] md:py-[30px] py-[5px] lg:px-[50px] md:px-[30px] px-[20px]'
           >
                <Col
                    span={setSize(12, 12, 24)}
                    style={{
                        height: setSize(300, 180, 80),
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: setSize('left', 'left', 'center')
                    }}
                >
                    <div
                        className='text-[#A5ABB3] font-[Plus Jakarta Sans] leading-1 font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                    >
                        SEE US ON MAPS
                    </div>
                    <div 
                        className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                    >
                        EXPLORE OUR PARTNER
                    </div>
                    <div 
                        className='text-[#E83600] leading-3 bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                    >
                        IN YOUR AREA
                    </div>
                </Col>
                <Col
                    span={setSize(12, 12, 24)}
                    style={{
                        height: setSize(300, 180, 150),
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginBottom: setSize(10, 10, 20)
                    }}
                >
                    <div className='relative w-full h-full'>
                        <div className='absolute inset-0 flex justify-center'>
                            <img src='./assets/cover/maps.png' className='rounded-2xl lg:h-[300px] md:h-[180px] lg:w-[80%] md:w-[80%] object-cover' />
                        </div>
                        <div className='absolute inset-0 flex justify-center items-center'>
                            <Button
                                size={setSize('large', 'small', 'small')}
                                style={{
                                    borderRadius: 50,
                                    color: '#FFFFFF',
                                    borderColor: '#287D3C',
                                    padding: setSize('0px 25px', '0px 10px', '0px 10px'),
                                    backgroundColor: '#287D3C',
                                    fontSize: setSize(18, 12, 10),
                                }}
                                icon={<IconMapPinFilled size={setSize(24, 14, 12)} />}
                                iconPosition='end'
                            >
                                OPEN MAPS
                            </Button>
                        </div>
                    </div>
                </Col>
           </Row>
        </>
    )
}
