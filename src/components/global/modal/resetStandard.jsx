import React from 'react'
import { 
    Button,
    Form,
    Input,
    Modal 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function ResetStandard({
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
                onCancel={() => setIsOpen(false)}
                width={setSize('30%', '40%', '0%')}
                title={"Reset Password"}
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
                        marginTop: 10
                    }}
                >
                    <div className='mb-5'>Your verification success! Please enter your new password!</div>
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
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
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full mt-5' style={{ height: setSize(45, 35, 0) }}>
                            Save Password
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>    
        </>
    )
}
