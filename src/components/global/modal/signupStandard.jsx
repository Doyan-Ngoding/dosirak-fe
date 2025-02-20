import React from 'react'
import { 
    Button,
    Checkbox,
    Form,
    Input,
    Modal 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function SignupStandard({
    isOpen,
    setIsOpen,
}) {

    const {
        setSize,
        setModalLogin,
        setModalOtp,
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
                title={"Sign Up!"}
                onCancel={() => setIsOpen(false)}
                styles={{
                    body: {
                        padding: 5,
                    },
                    header: {
                        padding: 5
                    }
                }}
            >
                <Form
                    layout="vertical"
                    style={{
                        marginTop: 20
                    }}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                        >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                        >
                        <Input type='number' />
                    </Form.Item>
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
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your confirm password!',
                            },
                        ]}
                        >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label={null}
                        name="term"
                        rules={[
                            {
                                required: true,
                                message: 'Please check the term!',
                            },
                        ]}
                        >
                        <Checkbox>By clicking sign up, you are agree to out <soan className='cursor-pointer text-[#E83600] font-semibold underline'>Privacy & Policy</soan></Checkbox>
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full' style={{ height: setSize(45, 35, 0) }} onClick={() => {setModalOtp(true), setIsOpen(false)}}>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-10px]">Already have an account? <span className='text-[#E83600] ml-2 cursor-pointer hover:text-[#FA5523]' onClick={() => {setModalLogin(true), setIsOpen(false)}}>Log In</span></div>
                </Form>
            </Modal>    
        </>
    )
}
