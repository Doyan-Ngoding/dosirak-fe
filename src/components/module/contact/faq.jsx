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
                className='bg-[#FFF1E6]'
                style={{
                    padding: setSize("30px", "40px", "30px"),
                }}
            >
                <div
                    className='text-[#818182] leading-1 font-[Noto Sans KR] font-semibold lg:text-[14px] md:text-[12px] text-[10px]'
                >
                    Before you ask—see if it’s answered here!
                </div>
                <div 
                    className='text-[#FF6B00] font-[Noto Sans KR]  font-bold lg:text-[30px] md:text-[24px] text-[18px] lg:pt-5 md:pt-4 pt-3'
                >
                    Frequently Asked Questions
                </div>
                <div
                    style={{
                        paddingTop: 20
                    }}
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Collapse: {
                                    fontSize: setSize(12, 10, 10),
                                    headerBg: '#FFFFFF',
                                    fontSizeIcon: setSize(12, 10, 10),
                                }
                            }
                        }}
                    >
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            expandIconPosition="end"
                            bordered={false}
                            items={[{ key: '1', label: <b>What is KDosirak?</b>, children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                        <div
                            style={{ margin: setSize('20px 0px', '15px 0px', '10px 0px') }}
                        />
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            expandIconPosition="end"
                            bordered={false}
                            items={[{ key: '1', label: <b>Is there minimum order requirement?</b>, children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                        <div
                            style={{ margin: setSize('20px 0px', '15px 0px', '10px 0px') }}
                        />
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            expandIconPosition="end"
                            bordered={false}
                            items={[{ key: '1', label: <b>Do you serve individual customers or only corporate clients?</b>, children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                        <div
                            style={{ margin: setSize('20px 0px', '15px 0px', '10px 0px') }}
                        />
                        <Collapse
                            size={setSize('medium', 'small', 'small')}
                            expandIconPosition="end"
                            bordered={false}
                            items={[{ key: '1', label: <b>How do I track my order?</b>, children: <p>{'KDosirak is your go-to platform for ordering authentic Korean lunchboxes (Dosirak), daily catering, and restaurant-prepared meals. We bring delicious, balanced Korean food straight to your office, home, or event.'}</p> }]}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </>
    )
}
