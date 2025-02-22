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
                    className='text-[#A5ABB3] font-[Plus Jakarta Sans] lg:text-[18px] md:text-[14px] text-[8px]'
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
                                controlHeight: setSize(42, 24, 18),
                                
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
                                className='text-[#E83600] font-[Thunder] font-bold lg:text-[60px] md:text-[30px] text-[24px] lg:pr-5 md:pr-3 pr-2'
                            >
                                OUR MENU
                            </div>
                            {
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
                            }
                        </div>
                        {
                            !isMobile && (
                                <div>
                                    <Input 
                                        placeholder='Search your menu here'
                                        style={{ borderRadius: 50, width: setSize(350, 250, 120) }}
                                        // value={menuSearched}
                                        // onChange={(e) => setMenuSearched(e.target.value)}
                                        suffix={
                                            <div
                                                className='bg-[#FA5523] rounded-full lg:py-1.5 md:py-1 md:px-1 px-1.5 py-[5px]'
                                            >
                                                <IconSearch 
                                                    color='#FFFFFF'
                                                    size={setSize(16, 10, 14)}
                                                />
                                            </div>  
                                        }
                                    />
                                </div>
                            )
                        }
                    </div>
                    {
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
                                        placeholder='Search your menu here'
                                        style={{ borderRadius: 50, width: "100%" }}
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
                    }
                </ConfigProvider>
            </div>
        </>
    )
}
