import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Button, Checkbox, Col, ConfigProvider, Form, Input, Radio, Row } from 'antd'
import { IconBrandDiscordFilled, IconBrandInstagramFilled, IconBrandTwitterFilled, IconMail, IconMailFilled, IconMapPin, IconMapPinFilled, IconPhone, IconPhoneCalling, IconPhoneFilled } from '@tabler/icons-react'

export default function FormContactComp() {

    const [form] = Form.useForm();

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='lg:pt-[80px] md:pt-[70px] pt-[60px] px-10'
            >
                <div 
                    className='text-[#FF6B00] font-[Noto Sans KR] font-bold lg:text-[30px] md:text-[24px] text-[18px] lg:pt-5 md:pt-4 pt-3 text-center'
                >
                    Contact Us
                </div>
                <div
                    className='text-[#818182] leading-1 font-[Noto Sans KR] font-semibold lg:text-[16px] md:text-[14px] text-[10px] lg:pt-5 md:pt-4 pt-3 text-center'
                >
                    Any question or remarks? Just write us a message!
                </div>
                <Row
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 4,
                        border: '1px solid #D8D8D8',
                        margin: setSize("50px 50px", "40px 0px", "30px 0px"),
                        padding: 8
                    }}
                >
                    <Col
                        span={setSize(11, 11, 24)}
                        style={{
                            backgroundImage: 'url(/assets-v2/banner/contact.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div
                            className='lg:p-5 md:p-3 p-3 font-[Noto Sans KR]'
                        >
                            <div
                                className=' text-[#A64500] lg:text-[22px] md:text-[18px] text-[14px] font-bold'
                            >
                                Contact Information
                            </div>
                            <div
                                className='text-[#3B3B3B] lg:text-[12px] md:text-[10px] text-[10px]'
                            >
                                Start a message with our customer service!
                            </div>
                            <div
                                className='lg:pt-40 md:pt-30 pt-20 lg:pb-8 md:pb-5 pb-3'
                            >
                                <div
                                    className='flex items-center lg:space-x-4 md:space-x-2 space-x-2'
                                >
                                    <IconPhone
                                        size={setSize(16, 14, 13)}
                                        style={{
                                            marginTop: 2
                                        }}
                                        color='#582500'
                                    />
                                    <div
                                        className='lg:text-[13px] md:text-[11px] text-[10px] text-[#582500]'
                                    >
                                        +62 958 248 966
                                    </div>
                                </div>
                                <div
                                    className='flex items-center lg:space-x-4 md:space-x-2 space-x-2 lg:pt-5 md:pt-5 pt-3'
                                >
                                    <IconMail
                                        size={setSize(16, 14, 13)}
                                        style={{
                                            marginTop: 2
                                        }}
                                        color='#582500'
                                    />
                                    <div
                                        className='lg:text-[13px] md:text-[11px] text-[10px] text-[#582500]'
                                    >
                                        halo@kdosirak.com
                                    </div>
                                </div>
                                <div
                                    className='flex items-center lg:space-x-4 md:space-x-2 space-x-2 lg:pt-5 md:pt-5 pt-3'
                                >
                                    <IconMapPin
                                        size={setSize(16, 14, 13)}
                                        style={{
                                            marginTop: 2
                                        }}
                                        color='#582500'
                                    />
                                    <div
                                        className='lg:text-[13px] md:text-[11px] text-[10px] text-[#582500]'
                                    >
                                        Karawaci, Tangerang 15115
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col
                        span={setSize(13, 13, 24)}
                    >
                        <ConfigProvider
                            theme={{
                                components: {
                                    Form: {
                                        itemMarginBottom: setSize(10, 0, 0),
                                        labelFontSize: setSize(14, 12, 10),
                                        verticalLabelMargin: setSize('5px 0px -10px 0px', '5px 0px -12px 0px', '5px 0px -15px 0px'),
                                        fontSize: setSize(12, 10, 10),
                                    },
                                    Input: {
                                        fontSize: setSize(12, 10, 10),
                                        paddingInline: 0,
                                    },
                                    Checkbox: {
                                        fontSize: setSize(12, 10, 10),
                                        colorText: '#6C6F75'
                                    }
                                }
                            }}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                className='font-[Noto Sans KR]'
                                style={{
                                    padding: setSize('0px 10px 10px 20px', '0px 10px 0px 15px', 12),
                                }}
                            >
                                <Row gutter={16}>
                                    <Col 
                                        span={setSize(12, 12, 24)}
                                    >
                                        <Form.Item
                                            name="firstName"
                                            label={<span style={{ color: '#FF6B00', fontWeight: 600 }}>First Name</span>}
                                            required={false}
                                            rules={[{ required: true, message: 'Please enter your first name' }]}
                                        >
                                            <Input placeholder="Input your first name here" variant='underlined' />
                                        </Form.Item>
                                    </Col>
                                    <Col 
                                        span={setSize(12, 12, 24)}
                                    >
                                        <Form.Item
                                            name="lastName"
                                            label={<span style={{ color: '#FF6B00', fontWeight: 600 }}>Last Name</span>}
                                            required={false}
                                            rules={[{ required: true, message: 'Please enter your last name' }]}
                                        >
                                            <Input placeholder="Input your last name here" variant='underlined' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}
                                    style={{
                                        marginTop: setSize(5, 3, 3)
                                    }}
                                >
                                    <Col 
                                        span={setSize(12, 12, 24)}
                                    >
                                        <Form.Item
                                            name="email"
                                            label={<span style={{ color: '#FF6B00', fontWeight: 600 }}>Email</span>}
                                            required={false}
                                            rules={[{ required: true, message: 'Please enter your email', type: 'email' }]}
                                        >
                                            <Input placeholder="Input your email here" type='email' variant='underlined' />
                                        </Form.Item>
                                    </Col>
                                    <Col 
                                        span={setSize(12, 12, 24)}
                                    >
                                        <Form.Item
                                            name="phone"
                                            label={<span style={{ color: '#FF6B00', fontWeight: 600 }}>Phone Number</span>}
                                            required={false}
                                            rules={[{ required: true, message: 'Please enter your phone number' }]}
                                        >
                                            <Input placeholder="Input your phone number here" type='number' variant='underlined' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="subject"
                                    label={<span style={{ color: '#FF6B00', fontWeight: 600 }}>Select Subject</span>}
                                    required={false}
                                    rules={[{ required: true, message: 'Please select a subject' }]}
                                    style={{
                                        marginTop: setSize(5, 3, 3)
                                    }}
                                >
                                    <Checkbox.Group 
                                        size='small' 
                                        options={[
                                            { label: 'General Inquiry', value: 'general' },
                                            { label: 'Food Menu', value: 'menu' },
                                            { label: 'Subscription Order', value: 'subscription' },
                                            { label: 'Track Order', value: 'track' },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="message"
                                    label={<span style={{ color: '#FF6B00', fontWeight: 600 }}>Message</span>}
                                    rules={[{ required: true, message: 'Please enter your message' }]}
                                    required={false}
                                    style={{
                                        marginTop: setSize(5, 3, 3)
                                    }}
                                >
                                    <Input.TextArea placeholder="Write your message…" autoSize={{ minRows: 1 }} variant='underlined' />
                                </Form.Item>
                                <Form.Item>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: setSize(30, 20, 20) }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{
                                                backgroundColor: '#FF6B00',
                                                borderColor: '#FF6B00',
                                                padding: '0 20px',
                                                height: setSize(32, 28, 26),
                                                fontSize: setSize(12, 10, 10)
                                            }}
                                        >
                                            Send Message
                                        </Button>
                                    </div>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    </Col>
                </Row>
            </div>
        </>
    )
}
