import React from 'react'
import { 
    Button,
    ConfigProvider,
    Form,
    Input,
    Modal 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function VerifyStandard({
    isOpen,
    setIsOpen,
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <Modal
                open={isOpen}
                footer={null} 
                width={{
                    md: '40%',
                    lg: '40%',
                    xl: '30%',
                }}
                title={"Verify your Email"}
                styles={{
                    body: {
                        padding: 5,
                    },
                    header: {
                        padding: 5
                    }
                }}
                closable={false}
            >
                <Form
                    layout="vertical"
                >
                    <div
                        className='pb-5'
                    >
                        We’ve sent a verification code to your email <b>joe@gmail.com</b>. Please enter the 6-digit code you received.
                    </div>
                    <Form.Item
                        label={null}
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the OTP code!',
                            },
                        ]}
                    >
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        fontSize: 30,
                                        controlHeightLG: 60,
                                    }
                                }
                            }}
                        >
                            <Input.OTP className='input-otp' size='large' type='number' length={6} style={{ width: '100%' }} />
                        </ConfigProvider>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button disabled type='text' className='w-full' style={{ height: setSize(45, 35, 0) }}>
                            Resend code in 00:30
                        </Button>
                        <Button type='text' className='w-full text-[#E83600] font-semibold' style={{ height: setSize(45, 35, 0), color: '#E83600', fontWeight: 600 }}>
                            Resend code
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-10px]">Entered the wrong number? <span className='text-[#E83600] ml-2'>Change Email</span></div>
                </Form>
            </Modal>    
        </>
    )
}
