import React from 'react'
import { Col, ConfigProvider, Input, Row, Select } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { IconBuildingStore, IconSearch } from '@tabler/icons-react'

export default function HeadListComp() {

    const {
        setSize,
        isMobile
    } = useAuth()

    return (
        <>
            <div
                className='lg:pt-[100px] md:pt-[80px] pt-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                className='text-[#A5ABB3] font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    WHAT WE SERVE
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                borderRadius: setSize(12, 6, 4),
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#000000',
                                colorText: '#000000',
                                colorBorder: '#D9D9D9',
                                controlHeight: setSize(42, 22, 18),
                                fontSize: setSize(14, 12, 10),
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#FFFFFF'
                            },
                            Input: {
                                controlHeight: setSize(42, 28, 22),
                                fontSize: setSize(14, 12, 10),
                            }
                        }
                    }}
                >
                    <div
                        className='flex justify-between items-center'
                    >
                        <div
                            className='flex items-center'
                        >
                            <div 
                                className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px] lg:pr-5 md:pr-3 pr-2'
                            >
                                OUR MENU
                            </div>
                            {/* {
                                !isMobile && (
                                    <Select 
                                        style={{
                                            width: setSize(250, 180, 120),
                                        }} 
                                        prefix={
                                            <IconBuildingStore 
                                                color='#E83600'
                                                size={setSize(22, 14, 12)}
                                            />
                                        }
                                        value={'sssdaldjald'}
                                    />
                                )
                            } */}
                        </div>
                        {
                            (
                                <div>
                                    <Input 
                                        placeholder='Search restaurant here'
                                        style={{ borderRadius: 50, width: setSize(350, 250, 200) }}
                                        // value={menuSearched}
                                        // onChange={(e) => setMenuSearched(e.target.value)}
                                        suffix={
                                            <div
                                                className='bg-[#FA5523] rounded-full lg:py-1 md:py-1 md:px-1 px-1 py-1'
                                            >
                                                <IconSearch 
                                                    color='#FFFFFF'
                                                    size={setSize(16, 10, 8)}
                                                />
                                            </div>  
                                        }
                                        prefix={
                                            <IconBuildingStore 
                                                color='#FA5523'
                                                size={setSize(22, 14, 12)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            )
                        }
                    </div>
                    {/* {
                        isMobile && (
                            <Row
                                justify={'space-between'}
                                align={"middle"}
                                gutter={[24, 0]}
                            >
                                <Col 
                                    span={12}
                                >
                                    <Select 
                                        style={{
                                            width: "100%",
                                            marginTop: 3
                                        }} 
                                        prefix={
                                            <IconBuildingStore 
                                                color='#E83600'
                                                size={setSize(22, 14, 12)}
                                            />
                                        }
                                        value={'sssdaldjald'}
                                    />
                                </Col>
                                <Col
                                    span={12}
                                >
                                    <Input 
                                        placeholder='Search  here'
                                        style={{ borderRadius: 50, width: "100%", }}
                                        // value={menuSearched}
                                        // onChange={(e) => setMenuSearched(e.target.value)}
                                        suffix={
                                            <div
                                                className='bg-[#FA5523] rounded-full lg:py-1.5 md:py-1 md:px-1 px-0.5 py-0.5'
                                            >
                                                <IconSearch 
                                                    color='#FFFFFF'
                                                    size={setSize(16, 10, 10)}
                                                />
                                            </div>  
                                        }
                                    />
                                </Col>
                            </Row>
                        )
                    } */}
                </ConfigProvider>
            </div>
        </>
    )
}
