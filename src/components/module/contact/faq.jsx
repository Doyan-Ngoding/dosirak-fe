import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Collapse, ConfigProvider } from 'antd'

export default function FaqComp() {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='bg-[#FF55211A]'
                style={{
                    padding: setSize("50px", "40px", "30px"),
                }}
            >
                <div
                    className='text-[#E83600] leading-1 font-[Plus Jakarta Sans] lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    BEFORE YOU ASK - SEE IF IT'S ANSWERED HERE
                </div>
                <div 
                    className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px]'
                >
                    FAQ
                </div>
                <div
                    style={{
                        paddingTop: 10
                    }}
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Collapse: {
                                    fontSize: setSize(16, 12, 10),
                                    headerBg: '#FFFFFF'
                                }
                            }
                        }}
                    >
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            items={[{ key: '1', label: 'What is KDosirak?', children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                        <div
                            style={{ margin: setSize('20px 0px', '15px 0px', '10px 0px') }}
                        />
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            items={[{ key: '1', label: 'Is there minimum order requirement?', children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                        <div
                            style={{ margin: setSize('20px 0px', '15px 0px', '10px 0px') }}
                        />
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            items={[{ key: '1', label: 'Do you serve individual customers or only corporate clients?', children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                                                <div
                            style={{ margin: setSize('20px 0px', '15px 0px', '10px 0px') }}
                        />
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            items={[{ key: '1', label: 'How do I track my order?', children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </>
    )
}
