import React, { useState } from 'react'
import { 
    Col, 
    Collapse, 
    ConfigProvider, 
    Input, 
    Radio, 
    Row 
} from 'antd';
import { IconCreditCard } from '@tabler/icons-react';
import { useAuth } from '../../../../context/AuthContext';

const { Panel } = Collapse;


export default function CardMethod() {

    const {
        setSize
    } = useAuth()

    const [selectedPayment, setSelectedPayment] = useState(null);

    const paymentOptions = [
        { key: "ovo", label: "OVO", input: true, icon: "🟣" },
        { key: "shopeepay", label: "SHOPEEPAY", input: true, icon: "🛍️" },
        { key: "gopay", label: "GOPAY", input: true, icon: "💳" },
        { key: "qris", label: "QRIS", input: true, icon: "📸" },
        { key: "bank_va", label: "BANK VIRTUAL ACCOUNT", input: true, icon: "🏦" },
    ];


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
                        className='text-[#393939] font-bold lg:text-[24px] md:text-[20px] text-[16px]'
                    >
                        CHOOSE PAYMENT
                    </div>
                </Col>
                <Col
                    span={24}
                    style={{
                        backgroundColor: '#FFFFFF'
                    }}
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Collapse: {
                                    // contentBg: '#FFFFFF',
                                    colorBorder: '#FFFFFF',
                                    borderRadius: 0,
                                },
                                Radio: {
                                    colorPrimary: '#287D3C'
                                }
                            }
                        }}
                    >
                        <Collapse
                            accordion
                            activeKey={selectedPayment}
                            onChange={(key) => setSelectedPayment(key[0])}
                            style={{
                                backgroundColor: '#FFFFFF',
                            }}
                            
                        >
                            {
                                paymentOptions.map(option => (
                                    <Panel
                                        showArrow={false}
                                        key={option.key}
                                        header={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <span>{option.icon}</span>
                                                    <span>{option.label}</span>
                                                </div>
                                                <Radio checked={JSON.stringify(selectedPayment) === JSON.stringify(option.key)} />
                                            </div>
                                        }
                                        style={{
                                            backgroundColor: selectedPayment === option.key ? "#e6f7e6" : "#fff",
                                            borderRadius: "6px",
                                            marginBottom: "8px",
                                            border: selectedPayment === option.key ?  "1px solid #287D3C" :  "1px solid #d9d9d9",
                                        }}
                                        styles={{
                                            body: {
                                                backgroundColor: '#e6f7e6',
                                            }
                                        }}
                                    >
                                        {
                                            option.input && (
                                                <Input
                                                    placeholder="Phone Number"
                                                    prefix={<IconCreditCard style={{ marginRight: 10 }} />}
                                                    type='number'   
                                                />
                                            )
                                        }
                                    </Panel>
                                ))
                            }
                        </Collapse>
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    )
}
