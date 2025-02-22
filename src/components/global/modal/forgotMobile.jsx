import React from 'react'
import { 
    Button,
    Drawer, 
    Form,
    Input
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function ForgotMobile({
    isOpen,
    setIsOpen
}) {

    const {
        setSize,
        setModalOtp
    } = useAuth()

    return (
        <>
            <Drawer
                title={<span className='text-[14px]'>Forgot your password?</span>}
                placement={"bottom"}
                closable={false}
                // onClose={() => setIsOpen(false)}
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
                extra={
                    <IconX 
                        size={18}
                        color='darkgrey'
                        onClick={() => setIsOpen(false)}
                    />
                }
            >
                <Form
                    layout="vertical"
                    wrapperCol={{
                        span: 1
                    }}
                >
                    <div
                        className='pb-5'
                    >
                        Please enter your email you used to sign up to Dosirak website.
                    </div>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                                type: 'email'
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full mt-5' style={{ height: setSize(45, 35, 30) }} onClick={() => {setModalOtp(true), setIsOpen(false)}}>
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}
