import React from 'react'
import { 
    Button,
    Form,
    Input,
    Modal 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function ForgotStandard({
    isOpen,
    setIsOpen,
}) {

    const {
        setSize,
        setModalOtp
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
                title={"Forgot your password?"}
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
                        <Button type="primary" htmlType="submit" className='w-full' style={{ height: setSize(45, 35, 0) }} onClick={() => {setModalOtp(true), setIsOpen(false)}}>
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>    
        </>
    )
}
