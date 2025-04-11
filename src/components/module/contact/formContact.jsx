import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Button, Col, ConfigProvider, Form, Input, Radio, Row } from 'antd'
import { IconBrandDiscordFilled, IconBrandInstagramFilled, IconBrandTwitterFilled, IconMailFilled, IconMapPinFilled, IconPhoneCalling, IconPhoneFilled } from '@tabler/icons-react'

export default function FormContactComp() {

    const [form] = Form.useForm();

    const {
        setSize
    } = useAuth()

    return (
        <>
            <div
                className='lg:pt-[100px] md:pt-[80px] pt-[80px] px-10'
            >
                <div 
                    className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px] text-center'
                >
                    CONTACT US
                </div>
                <div
                    className='text-[#A5ABB3] leading-1 font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px] text-center'
                >
                    ANY QUESTION OR REMARKS? JUST WRITE US MESSAGE!
                </div>
                <Row
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 4,
                        border: '1px solid #A5ABB3',
                        margin: setSize("50px 50px", "40px 0px", "30px 0px"),
                        padding: 3
                    }}
                >
                    <Col
                        span={setSize(11, 11, 24)}
                        style={{
                            background: '#FA764E'
                        }}
                    >
                        <div
                            className='lg:p-5 md:p-3 p-3 font-[Plus Jakarta Sans]'
                        >
                            <div
                                className=' text-white lg:text-[24px] md:text-[18px] text-[14px]'
                            >
                                Contact Information
                            </div>
                            <div
                                className='text-white lg:text-[14px] md:text-[10px] text-[10px]'
                            >
                                start a message with our customer service!
                            </div>
                            <div
                                className='lg:pt-15 md:pt-10 pt-8'
                            >
                                <div
                                    className='flex items-center lg:space-x-4 md:space-x-2 space-x-2'
                                >
                                    <IconPhoneFilled 
                                        size={setSize(18, 14, 14)}
                                        style={{
                                            marginTop: 2
                                        }}
                                    />
                                    <div
                                        className='lg:text-[16px] md:text-[12px] text-[12px]'
                                    >
                                        +1012 3456 789
                                    </div>
                                </div>
                                <div
                                    className='flex items-center lg:space-x-4 md:space-x-2 space-x-2 pt-5'
                                >
                                    <IconMailFilled 
                                        size={setSize(18, 14, 14)}
                                        style={{
                                            marginTop: 2
                                        }}
                                    />
                                    <div
                                        className='lg:text-[16px] md:text-[12px] text-[12px]'
                                    >
                                        demo@gmail.com
                                    </div>
                                </div>
                                <div
                                    className='flex items-center lg:space-x-4 md:space-x-2 space-x-2 pt-5'
                                >
                                    <IconMapPinFilled 
                                        size={setSize(18, 14, 14)}
                                        style={{
                                            marginTop: 2
                                        }}
                                    />
                                    <div
                                        className='lg:text-[16px] md:text-[12px] text-[12px]'
                                    >
                                        132 Dartmouth Street Boston, Massachusetts 02156 United States
                                    </div>
                                </div>
                                <div
                                    className='flex items-center space-x-4 lg:pt-20 md:pt-12 pt-10 lg:pb-10 md:pb-8 pb-5'
                                >
                                    <IconBrandTwitterFilled 
                                        size={setSize(24, 18, 16)}
                                        className="text-white bg-black rounded-full p-1 hover:text-black hover:bg-white cursor-pointer"
                                    />
                                    <IconBrandInstagramFilled 
                                        size={setSize(24, 18, 16)}
                                        className="text-white bg-black rounded-full p-1 hover:text-black hover:bg-white cursor-pointer"
                                    />
                                    <IconBrandDiscordFilled 
                                        size={setSize(24, 18, 16)}
                                        className="text-white bg-black rounded-full p-1 hover:text-black hover:bg-white cursor-pointer"
                                    />
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
                                        itemMarginBottom: setSize(14, 12, 0),
                                        labelFontSize: setSize(16, 12, 10),
                                        verticalLabelMargin: setSize('5px 0px -5px 0px', '5px 0px -5px 0px', '5px 0px -10px 0px'),
                                        fontSize: setSize(16, 12, 10)
                                    },
                                    Radio: {
                                        fontSize: setSize(16, 12, 10)
                                    }
                                }
                            }}
                        >
                            <Form
                                form={form}
                                layout="vertical"
                                className='lg:p-5 md:p-3 p-3 font-[Plus Jakarta Sans]'
                                style={{
                                    padding: setSize(20, 12, 12)
                                }}
                                
                            >
                                <Row gutter={16}>
                                    <Col 
                                        span={setSize(12, 12, 24)}
                                    >
                                        <Form.Item
                                            name="firstName"
                                            label={<span style={{ color: '#E44D26', fontWeight: 600 }}>First Name</span>}
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
                                            label={<span style={{ color: '#E44D26', fontWeight: 600 }}>Last Name</span>}
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
                                            label={<span style={{ color: '#E44D26', fontWeight: 600 }}>Email</span>}
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
                                            label={<span style={{ color: '#E44D26', fontWeight: 600 }}>Phone Number</span>}
                                            required={false}
                                            rules={[{ required: true, message: 'Please enter your phone number' }]}
                                        >
                                            <Input placeholder="Input your phone number here" type='number' variant='underlined' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="subject"
                                    label={<span style={{ color: '#E44D26', fontWeight: 600 }}>Select Subject</span>}
                                    required={false}
                                    rules={[{ required: true, message: 'Please select a subject' }]}
                                    style={{
                                        marginTop: setSize(5, 3, 3)
                                    }}
                                >
                                    <Radio.Group size='small'>
                                        <Radio value="general">General Inquiry</Radio>
                                        <Radio value="menu">Food Menu</Radio>
                                        <Radio value="subscription">Subscription Order</Radio>
                                        <Radio value="track">Track Order</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="message"
                                    label={<span style={{ color: '#E44D26', fontWeight: 600 }}>Message</span>}
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
                                                backgroundColor: '#E44D26',
                                                borderColor: '#E44D26',
                                                padding: '0 24px',
                                                height: setSize(40, 30, 25),
                                                fontSize: setSize(16, 12, 10)
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
