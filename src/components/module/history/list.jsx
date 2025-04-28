import React from 'react'
import { Anchor, Button, Col, ConfigProvider, DatePicker, Input, Row, Select } from 'antd'
import { IconBuildingStore, IconCalendarWeek, IconChevronDown, IconChevronRight, IconClock, IconNotes, IconSearch, IconToolsKitchen2, IconXboxXFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useAuth } from '../../../context/AuthContext';
import { useOrder } from '../../../context/OrderContext';

export default function ListHistory() {
    
    const {
        setSize
    } = useAuth()
    
    const {
        selectedTempDate, setSelectedTempDate,
        selectedTempTime, setSelectedTempTime,
    } = useOrder();

    const disabledDate = (current) => {
        return current && current < dayjs().add(1, 'day').endOf('day');
    };

    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);

    return (
        <>
            <div
                className='lg:pt-[30px] md:pt-[20px] pt-[15px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#FF6B00',
                        },
                        components: {
                            Select: {
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#84888E',
                                colorText: '#000000',
                                colorBorder: '#A5ABB3',
                                controlHeight: setSize(32, 28, 28),
                                fontSize: setSize(12, 10, 10),
                                borderRadius: 4,
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#E83600',
                                optionSelectedColor: '#FFFFFF',
                                fontSizeIcon: setSize(12, 10, 8)
                            },
                            DatePicker: {
                                controlHeight: setSize(34, 32, 32),
                                fontSize: setSize(12, 10, 10),
                                borderRadius: 4,
                                colorBorder: '#A5ABB3',
                                fontSizeIcon: setSize(12, 10, 8),
                                cellWidth: setSize(40, 30, 25),
                                colorTextPlaceholder: '#84888E'
                            },
                            Button: {
                                controlHeight: setSize(32, 24, 24),
                                fontSize: setSize(12, 10, 10),
                            }
                        }
                    }}
                >
                    <Row
                        align={"bottom"}
                    >
                        <Col
                            span={setSize(12, 12, 24)}
                        >
                            <div 
                                className='text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px]'
                            >
                                Schedule your delivery time
                            </div>
                            <div
                                className='text-[#818182] leading-3 font-[Noto Sans KR] font-semibold lg:text-[14px] md:text-[12px] text-[10px] pt-1'
                            >
                                Pick the time that works best for you, and we’ll make sure your food arrives fresh and on time
                            </div>
                        </Col>
                        <Col
                            span={setSize(12, 12, 24)}
                        >
                            <Row
                                align={"middle"}
                                gutter={[12, 6]}
                                style={{
                                    marginTop: setSize(0, 0, 10)
                                }}
                            >
                                <Col
                                    span={12}
                                >
                                    <DatePicker 
                                        allowClear={true}
                                        showNow={false}
                                        value={selectedTempDate && dayjs(selectedTempDate).subtract(1, 'day')}
                                        onChange={(e) => {setSelectedTempDate(dayjs(e).add(1, 'day')), setOpenDate(true)}}
                                        open={openDate}
                                        onOpenChange={() => setOpenDate(true)}
                                        style={{
                                            width: '100%'
                                        }}
                                        format={"dddd, DD MMM YYYY"}
                                        prefix={
                                            <IconCalendarWeek 
                                                color='#2F2F2F'
                                                size={setSize(14, 12, 10)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                        suffixIcon={
                                            <IconChevronDown 
                                                color='#FF6B00'
                                                size={setSize(14, 12, 10)}
                                            />
                                        }
                                        clearIcon={
                                            <IconXboxXFilled 
                                                color='#FF6B00'
                                                size={setSize(14, 12, 10)}
                                            />
                                        }
                                        placeholder='Order Date'
                                        disabledDate={disabledDate} 
                                        width={"100%"}
                                        panelRender={(date) => (
                                            <div>
                                                {
                                                    openAlert && (
                                                        <div
                                                            className='flex justify-between items-center bg-[#FFD39A] lg:m-3 md:m-2 m-2 lg:rounded-[8px] md:rounded-[6px] rounded-[4px] px-2 py-1.5'
                                                        >
                                                            <div
                                                                className='lg:text-[12px] md:text-[10px] text-[8px] flex justify-start items-center'
                                                            >
                                                                <IconNotes 
                                                                    size={setSize(14, 12, 10)}
                                                                    style={{
                                                                        marginRight: 3
                                                                    }}
                                                                />
                                                                Please place orders at least 2 days before
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div>
                                                    {date}
                                                </div>
                                                <div
                                                    className='lg:px-5 md:px-3 px-2 pb-2'
                                                >
                                                    <Button
                                                        type='primary'
                                                        style={{
                                                            width: '100%',
                                                            borderRadius: 50
                                                        }}
                                                        onClick={() => setOpenDate(false)}
                                                    >
                                                        Select Date
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </Col>
                                <Col
                                    span={12}
                                >   
                                    <Select 
                                        allowClear={true}
                                        style={{
                                            width: '100%'
                                        }}
                                        prefix={
                                            <IconClock 
                                                color='#2F2F2F'
                                                size={setSize(14, 12, 10)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                        suffixIcon={
                                            <IconChevronDown 
                                                color='#FF6B00'
                                                size={setSize(14, 12, 10)}
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
                                        open={openTime}
                                        onDropdownVisibleChange={() => setOpenTime(true)}
                                        onChange={(e) => {setOpenTime(true), setSelectedTempTime(e)}}
                                        value={selectedTempTime}
                                        dropdownRender={(menu) => (
                                            <>
                                                <div className='lg:p-3 md:p-3 p-2'>
                                                    <div
                                                        className='font-[Noto Sans KR] font-semibold text-black lg:text-[14px] lg:pb-3 md:text-[12px] md:pb-2 text-[10px] pb-1'
                                                    >
                                                        Select Time Delivery
                                                    </div>
                                                    <div>
                                                        {menu}
                                                    </div>
                                                    <div
                                                        className='lg:mt-3 md:mt-2 mt-1'
                                                    >
                                                        <Button
                                                            type='primary'
                                                            style={{
                                                                width: '100%',
                                                                borderRadius: 50
                                                            }}
                                                            onClick={() => setOpenTime(false)}
                                                        >
                                                            Select Time
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        optionRender={(option) => (
                                            <>
                                                <div
                                                    className='flex justify-between items-center'
                                                >
                                                    <div>
                                                        {option.data.label}
                                                    </div>
                                                    <div>
                                                        <IconChevronRight 
                                                            size={setSize(14, 12, 10)}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ConfigProvider>
            </div>
        </>
    )
}
