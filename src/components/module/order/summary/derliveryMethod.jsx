import React, { useEffect, useState } from 'react'
import { 
    Button,
    Col,
    ConfigProvider,
    DatePicker,
    Row, 
    Select
} from 'antd'
import { 
    IconCalendarWeek, 
    IconChevronDown, 
    IconChevronRight, 
    IconClock, 
    IconMotorbike, 
    IconNotes, 
    IconXboxXFilled
} from '@tabler/icons-react'
import { useOrder } from '../../../../context/OrderContext'
import ModalComp from '../../../global/modal';
import dayjs from 'dayjs';
import { useAuth } from '../../../../context/AuthContext';

export default function DerliveryMethod() {

    const {
        setSelectedDate,
        selectedTempDate, setSelectedTempDate,
        selectedTempTime, setSelectedTempTime,
    } = useOrder();

    const {
        setSize
    } = useAuth()

    const disabledDate = (current) => {
        return current && current < dayjs().add(1, 'day').endOf('day');
    };

    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);

    useEffect(() => {
        if (selectedTempDate && selectedTempTime) {
            setSelectedDate(
                `${dayjs(selectedTempDate && selectedTempDate).format('YYYY-MM-DD')} ${selectedTempTime && selectedTempTime.slice(0, 2)}:00:00`
            );
        }
    }, [selectedTempDate, selectedTempTime]);

    return (
        <>
            <Row
                align={"middle"}
                gutter={setSize([0, 20], [0, 18], [0, 14])}
                className='bg-white lg:p-5 md:p-3.5 p-3 rounded-lg'
            >
                <Col
                    span={24}
                >
                    <div
                        className='text-[#393939] font-semibold lg:text-lg md:text-[16px] text-[12px]'
                    >
                        DELIVERY METHOD
                    </div>
                </Col>
                <Col
                    span={24}
                >
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#E83600',
                            },
                            components: {
                                Select: {
                                    colorBgContainer: '#FFFFFF',
                                    colorTextPlaceholder: '#6B6B6B',
                                    colorText: '#6B6B6B',
                                    colorBorder: '#A5ABB3',
                                    controlHeight: setSize(42, 28, 20),
                                    fontSize: setSize(14, 10, 10),
                                    borderRadius: setSize(8, 6, 4),
                                    colorBgElevated: '#FFFFFF',
                                    optionSelectedBg: '#E83600',
                                    optionSelectedColor: '#FFFFFF',
                                    fontSizeIcon: setSize(14, 10, 8)
                                },
                                DatePicker: {
                                    controlHeight: setSize(40, 32, 28),
                                    fontSize: setSize(14, 10, 10),
                                    borderRadius: setSize(8, 6, 4),
                                    colorBorder: '#A5ABB3',
                                    fontSizeIcon: setSize(14, 10, 8),
                                    cellWidth: setSize(50, 25, 25),
                                    colorTextPlaceholder: '#6B6B6B',
                                    colorText: '#6B6B6B',
                                    fontWeightStrong: 600
                                },
                                Button: {
                                    controlHeight: setSize(38, 24, 18),
                                    fontSize: setSize(16, 12, 10),
                                }
                            }
                        }}
                    >
                        <Row
                            align={"middle"}
                            justify={setSize("space-between", "space-around", "space-around")}
                            gutter={[16, 16]}
                        >
                            <Col
                                span={12}
                            >
                                <DatePicker 
                                    allowClear={true}
                                    showNow={false}
                                    value={selectedTempDate}
                                    onChange={(e) => {setSelectedTempDate(e), setOpenDate(true)}}
                                    open={openDate}
                                    onOpenChange={() => setOpenDate(true)}
                                    style={{
                                        width: '100%'
                                    }}
                                    format={"dddd, DD MMM YYYY"}
                                    prefix={
                                        <IconCalendarWeek 
                                            color='darkGray'
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
                                    clearIcon={
                                        <IconXboxXFilled 
                                            size={setSize(18, 12, 12)}
                                        />
                                    }
                                    placeholder='SELECT SCHEDULE DELIVERY'
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
                                                            className='lg:text-[15px] md:text-[10px] text-[8px] flex justify-start items-center'
                                                        >
                                                            <IconNotes 
                                                                size={setSize(20, 14, 12)}
                                                                style={{
                                                                    marginRight: 2
                                                                }}
                                                            />
                                                            Please place orders at least 2 days
                                                        </div>
                                                        <div
                                                            className='lg:text-[15px] md:text-[10px] text-[8px] text-[#E83600]'
                                                            onClick={() => setOpenAlert(false)}
                                                        >
                                                            Okay
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
                                            color='darkGrey'
                                            size={setSize(24, 14, 12)}
                                            style={{
                                                marginRight: 5
                                            }}
                                        />
                                    }
                                    placeholder="SELECT TIME DELIVERY"
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
                                            <div className='lg:p-5 md:p-3 p-2'>
                                                <div
                                                    className='font-[Source Sans Pro] font-semibold text-black lg:text-[18px] lg:pb-3 md:text-[12px] md:pb-2 text-[10px] pb-1'
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
                                                        size={setSize(24, 18, 12)}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                />
                            </Col>
                        </Row>
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    )
}
