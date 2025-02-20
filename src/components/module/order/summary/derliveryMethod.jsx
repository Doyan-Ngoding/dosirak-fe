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

export default function DerliveryMethod() {

    const {
        orderMethod, setOrderMethod,
        showDatePicker, setShowDatePicker,
        selectedDate, setSelectedDate,
    } = useOrder();
// sdalkdal
    return (
        <>
            <Row
                style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF'
                }}
                align={"middle"}
                gutter={[0, 24]}
            >
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >
                    DELIVERY METHOD
                </Col>
                <Col
                    span={24}
                >
                    <Row
                        align={"middle"}
                        justify={"space-between"}
                        gutter={[16, 16]}
                    >
                        <Col
                            span={12}
                        >
                            <Button
                                size='large'
                                className={orderMethod === "IMMEDIATELY" ? 'order-method-1' : 'order-method-2'}
                                icon={
                                    <IconMotorbike 
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                }
                                onClick={() => {setOrderMethod("IMMEDIATELY"), setSelectedDate()}}
                            >
                                IMMEDIATELY
                            </Button>
                        </Col>
                        <Col
                            span={12}
                        >
                            <Button
                                size='large'
                                className={orderMethod === "SCHEDULED" ? 'order-method-1' : 'order-method-2'}
                                style={{
                                    zIndex: 3
                                }}
                                icon={
                                    <IconCalendarWeek 
                                        style={{
                                            marginRight: 5
                                        }}
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
