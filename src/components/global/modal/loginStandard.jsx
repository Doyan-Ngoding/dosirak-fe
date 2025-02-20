import React from 'react'
import { 
    Button,
    Form,
    Input,
    Modal 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function LoginStandard({
    isOpen,
    setIsOpen,
}) {

    const {
        setSize,
        setModalForgot,
    } = useAuth()

    return (
        <>
            <Modal
                open={isOpen}
                footer={null} 
                onCancel={() => setIsOpen(false)}
                width={{
                    md: '40%',
                    lg: '40%',
                    xl: '30%',
                }}
                title={"Log In to Continue Ordering"}
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
                    <div className="w-full flex justify-end cursor-pointer text-[#E83600] font-semibold" onClick={() => {setModalForgot(true), setIsOpen(false)}}>Forgot Password?</div>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full mt-5' style={{ height: setSize(45, 35, 0) }}>
                            Log In
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-10px]">Don't have an account? <span className='text-[#E83600] ml-2'>Sign Up</span></div>
                </Form>
            </Modal>    
        </>
    )
}
