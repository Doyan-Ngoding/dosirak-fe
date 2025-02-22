import React from 'react'
import { 
    Button,
    Col,
    DatePicker,
    Row 
} from 'antd'
import { 
    IconCalendarWeek, 
    IconMotorbike 
} from '@tabler/icons-react'
import { useOrder } from '../../../../context/OrderContext'
import ModalComp from '../../../global/modal';
import dayjs from 'dayjs';
import { useAuth } from '../../../../context/AuthContext';

export default function DerliveryMethod() {

    const {
        orderMethod, setOrderMethod,
        showDatePicker, setShowDatePicker,
        selectedDate, setSelectedDate,
    } = useOrder();

    const {
        setSize
    } = useAuth()

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
                    <Row
                        align={"middle"}
                        justify={setSize("space-between", "space-around", "space-around")}
                        gutter={[16, 16]}
                    >
                        <Col
                            span={12}
                        >
                            <Button
                                size={setSize('large', 'medium', 'medium')}
                                className={orderMethod === "IMMEDIATELY" ? 'order-method-1' : 'order-method-2'}
                                icon={
                                    <IconMotorbike 
                                        style={{
                                            marginRight: 5,
                                            marginTop: 2,
                                        }}
                                        size={setSize(24, 18, 18)}
                                    />
                                }
                                style={{
                                    fontSize: setSize(16, 12, 11)
                                }}
                                onClick={() => {setOrderMethod("IMMEDIATELY"), setSelectedDate()}}
                            >
                                IMMEDIATELY
                            </Button>
                        </Col>
                        <Col
                            span={12}
                        >
                            <Button
                                size={setSize('large', 'medium', 'middle')}
                                className={orderMethod === "SCHEDULED" ? 'order-method-1' : 'order-method-2'}
                                style={{
                                    zIndex: 3,
                                    fontSize: setSize(15, 11, 10)
                                }}
                                icon={
                                    <IconCalendarWeek 
                                        style={{
                                            marginRight: setSize(5, 5, 2),
                                            marginTop: 2,
                                        }}
                                        size={setSize(20, 18, 18)}
                                    />
                                }
                                onClick={() => {setOrderMethod("SCHEDULED"), setShowDatePicker(!showDatePicker)}}
                            >
                                {selectedDate ? dayjs(selectedDate).format("dddd, DD MMM YYYY") : "SCHEDULED DELIVERY"}
                            </Button>
                            {showDatePicker && (
                                <div 
                                    style={{
                                        position: 'absolute',
                                        top: 12,
                                        margin: 'auto'
                                    }}
                                >
                                    <DatePicker open={true} onOpenChange={setShowDatePicker} value={selectedDate} onChange={(date) => setSelectedDate(date)} />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
