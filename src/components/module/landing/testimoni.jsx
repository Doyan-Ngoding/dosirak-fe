import React from 'react'
import { Col, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function TestimoniComp() {

    const {
        setSize,
    } = useAuth()

    return (
        <>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px] max-w-full w-full text-center'
            >
                <div
                    className='text-[#A5ABB3] font-[Plus Jakarta Sans] lg:text-[18px] md:text-[14px] text-[8px]'
                >
                    TESTIMONIALS
                </div>
                <div 
                    className='text-[#E83600] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[18px]'
                >
                    WHAT THEY SAID ABOUT US
                </div>
                <Row
                    justify={'center'}
                    align={'middle'}
                    gutter={[24, 24]}
                    className='lg:m-10 md:m-8 m-5'
                >
                    <Col
                        span={setSize(6, 10, 12)}
                    >
                        <div
                        style={{border: '1px solid #DADADA'}}

                        >
                        ss

                        </div>
                    </Col>
                    <Col
                        span={setSize(6, 10, 12)}
                        // style={{border: '1px solid #DADADA'}}

                    >
                        <div
                        style={{border: '1px solid #DADADA'}}

                        >
                        ss

                        </div>
                    </Col>
                    <Col
                        span={setSize(6, 10, 12)}
                        // style={{border: '1px solid #DADADA'}}

                    >
                        <div
                        style={{border: '1px solid #DADADA'}}

                        >
                        ss

                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
