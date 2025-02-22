import React from 'react'
import { 
    Button,
    Checkbox,
    Drawer, 
    Form,
    Input
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function SignupMobile({
    isOpen,
    setIsOpen
}) {

    const {
        setSize,
        setModalLogin,
        setModalOtp
    } = useAuth()

    return (
        <>
            <Drawer
                title={<span className='text-[14px]'>Sign Up!</span>}
                placement={"bottom"}
                closable={false}
                open={isOpen}
                key={"bottom"}
                height="80vh"
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
                        span: 24
                    }}
                >
                    <Form.Item
                        label={<span className='text-xs size-0'><span className='text-red-600'>*</span>Name</span>}
                        required={false}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your name!</span>
                                ),
                            },
                        ]}
                        style={{ marginBottom: "8px" }}
                    >
                        <Input 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span className='text-xs size-0 w-full'><span className='text-red-600'>*</span>Phone Number</span>}
                        required={false}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your phone number!</span>
                                ),
                            },
                        ]}
                        style={{ marginBottom: "8px" }}
                    >
                        <Input 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span className='text-xs size-0'><span className='text-red-600'>*</span>Email</span>}
                        required={false}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your email!</span>
                                ),
                                type: 'email'
                            },
                        ]}
                        style={{ marginBottom: "8px" }}
                    >
                        <Input 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span className='text-xs size-0'><span className='text-red-600'>*</span>Password</span>}
                        required={false}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your password!</span>
                                ),
                            },
                        ]}
                        style={{ marginBottom: "8px" }}
                    >
                        <Input.Password
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={<span className='w-full text-xs size-0'><span className='text-red-600'>*</span>Confrim Password</span>}
                        required={false}
                        name="confrimPassword"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your confirm password!</span>
                                ),
                            },
                        ]}
                        style={{ marginBottom: "8px" }}
                    >
                        <Input 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={null}
                        name="term"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please check the term!</span>
                                ),
                            },
                        ]}
                        >
                        <Checkbox style={{ fontSize: 12 }}>By clicking sign up, you are agree to out <soan className='cursor-pointer text-[#E83600] font-semibold underline'>Privacy & Policy</soan></Checkbox>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full' style={{ height: setSize(45, 35, 30) }} onClick={() => {setModalOtp(true), setIsOpen(false)}}>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-12px] text-[12px]">Already have an account? <span className='text-[#E83600] ml-2 cursor-pointer hover:text-[#FA5523]' onClick={() => {setModalLogin(true), setIsOpen(false)}}>Log In</span></div>
                </Form>
            </Drawer>
        </>
    )
}
