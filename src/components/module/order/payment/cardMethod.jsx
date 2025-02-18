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

const { Panel } = Collapse;


export default function CardMethod() {

    const [selectedPayment, setSelectedPayment] = useState(null);

    const paymentOptions = [
        { key: "ovo", label: "OVO", input: true, icon: "🟣" },
        { key: "shopeepay", label: "SHOPEEPAY", input: true, icon: "🛍️" },
        { key: "gopay", label: "GOPAY", input: true, icon: "💳" },
        { key: "qris", label: "QRIS", input: true, icon: "📸" },
        { key: "bank_va", label: "BANK VIRTUAL ACCOUNT", input: true, icon: "🏦" },
    ];

console.log(selectedPayment);


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
                    CHOOSE PAYMENT
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
                                    borderRadius: 0
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
                            expandIconPosition={false}
                            style={{
                                backgroundColor: '#FFFFFF',
                            }}
                        >
                            {
                                paymentOptions.map(option => (
                                    <Panel
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
                                            border: "1px solid #d9d9d9",
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
