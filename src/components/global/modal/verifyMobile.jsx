import React from 'react'
import { 
    Button,
    ConfigProvider,
    Drawer, 
    Form,
    Input
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function VerifyMobile({
    isOpen,
    setIsOpen
}) {

    const {
        setSize 
    } = useAuth()

    return (
        <>
            <Drawer
                title={<span className='text-[14px]'>Verify your Email</span>}
                placement={"bottom"}
                closable={false}
                open={isOpen}
                key={"bottom"}
                height="auto"
                styles={{
                    body: { 
                        padding: "0px 30px 16px 30px",
                        fontSize: 12,
                    },
                    header: {
                        borderBottom: '1px solid transparent'
                    },
                    content: {
                      borderRadius: "16px 16px 0 0",
                      overflow: "hidden",
                      fontSize: 14
                    },
                }}
                style={{
                    fontSize: 12
                }}
            >
                <Form
                    layout="vertical"
                    wrapperCol={{
                        span: 1
                    }}
                >
                    <div
                        className='pb-5 text-[12px]'
                    >
                        We’ve sent a verification code to your email <b>joe@gmail.com</b>. Please enter the 6-digit code you received.
                    </div>
                    <Form.Item
                        label={null}
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input the OTP code!</span>
                                ),
                            },
                        ]}
                    >
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        fontSize: 20,
                                        controlHeightLG: 50,
                                    }
                                }
                            }}
                        >
                            <Input.OTP className='input-otp' size='large' type='number' length={6} style={{ width: '100%' }} />
                        </ConfigProvider>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button disabled type='text' className='w-full' style={{ height: setSize(45, 35, 30) }}>
                            Resend code in 00:30
                        </Button>
                        <Button type='text' className='w-full text-[#E83600] font-semibold' style={{ height: setSize(45, 35, 30), color: '#E83600', fontWeight: 600 }}>
                            Resend code
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-10px] text-[12px]">Entered the wrong number? <span className='text-[#E83600] ml-2'>Change Email</span></div>
                </Form>
            </Drawer>
        </>
    )
}
