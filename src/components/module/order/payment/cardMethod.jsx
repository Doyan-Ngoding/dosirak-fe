import React, { useState } from 'react'
import { 
    Col, 
    Collapse, 
    ConfigProvider, 
    Input, 
    Radio, 
    Row 
} from 'antd';
import { IconChevronDown, IconCreditCard } from '@tabler/icons-react';
import { useAuth } from '../../../../context/AuthContext';
import { useOrder } from '../../../../context/OrderContext';

const { Panel } = Collapse;


export default function CardMethod() {

    const {
        setSize
    } = useAuth()

    const {
        selectedPayment, setSelectedPayment,
        activeKey, setActiveKey,
    } = useOrder()

    const paymentOptions = [
        { key: "ovo", label: "OVO", input: true, icon: './assets/payment/ovo.png' },
        { key: "shopeepay", label: "ShopeePay", input: true, icon: './assets/payment/spay.png' },
        { key: "gopay", label: "GoPay", input: true, icon: './assets/payment/gopay.png' },
        { key: "qris", label: "QRIS", input: false, icon: './assets/payment/qris.png' },
    ];

    const vaOptions = [
        { key: "bca_va", label: "Virtua Account BCA", input: false, icon: './assets/payment/bca.png' },
        { key: "bni_va", label: "Virtua Account BNI", input: false, icon: './assets/payment/bni.png' },
        { key: "bri_va", label: "Virtua Account BRI", input: false, icon: './assets/payment/bri.png' },
    ]

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
                            activeKey={null}
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
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {
                                                        option.icon && (
                                                            <div className='mr-3'><img src={option.icon} width={option.key === 'ovo' ? 20 : 40} /></div>
                                                        )
                                                    }
                                                    <div>{option.label}</div>
                                                </div>
                                                <Radio checked={selectedPayment === option.key} onChange={() => setSelectedPayment(option.key)} />
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
                                    </Panel>
                                ))
                            }
                        </Collapse>
                        <Collapse
                            accordion
                            activeKey={activeKey}
                            onChange={(e) => setActiveKey(e[0])}
                            style={{
                                backgroundColor: '#FFFFFF',
                            }}
                            expandIconPosition='end'
                            
                        >
                            <Panel
                                showArrow={true}
                                key={1}
                                header="Virtual Account Bank"
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: "6px",
                                    marginBottom: "8px",
                                    border: "1px solid #d9d9d9",
                                }}
                            >
                                <Collapse
                                    accordion
                                    activeKey={null}
                                    onChange={(key) => setSelectedPayment(key[0])}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                    }}
                                    
                                >
                                    {
                                        vaOptions.map(option => (
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
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            {
                                                                option.icon && (
                                                                    <div className='mr-3'><img src={option.icon} width={option.key === 'ovo' ? 20 : 40} /></div>
                                                                )
                                                            }
                                                            <div>{option.label}</div>
                                                        </div>
                                                        <Radio checked={selectedPayment === option.key} onChange={() => setSelectedPayment(option.key)} />
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
                                            </Panel>
                                        ))
                                    }
                                </Collapse>
                            </Panel>
                        </Collapse>
                    </ConfigProvider>
                </Col>
            </Row>
        </>
    )
}
