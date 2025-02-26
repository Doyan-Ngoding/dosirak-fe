import React, { useEffect } from 'react'
import { 
    Button,
    Form,
    Input,
    message,
    Modal 
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function LoginStandard({
    isOpen,
    setIsOpen,
    action,
    loading,
}) {

    const [form] = Form.useForm()

    const {
        setSize,
        setModalForgot,
        setModalSignup,
        resMessage
    } = useAuth()

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if ((resMessage && resMessage.length === 2)) {
            const [type, content] = resMessage;
            messageApi[type](content)
        }
    }, [resMessage]);

    return (
        <>
            {contextHolder}
            <Modal
                open={isOpen}
                footer={null} 
                onCancel={() => setIsOpen(false)}
                width={setSize('30%', '40%', '0%')}
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
                    form={form}
                    onFinish={async () => {
                        try {
                            await action(form.getFieldsValue())
                            form.resetFields()
                        } catch (error) {
                            messageApi.error(error.message)
                        }
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
                    <div className="w-full flex justify-end cursor-pointer text-[#E83600] font-semibold hover:text-[#FA5523]" onClick={() => {setModalForgot(true), setIsOpen(false)}}>Forgot Password?</div>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full mt-5' style={{ height: setSize(45, 35, 0) }} loading={loading}>
                            Log In
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-10px]">Don't have an account? <span className='text-[#E83600] ml-2 cursor-pointer hover:text-[#FA5523]' onClick={() => {setModalSignup(true), setIsOpen(false)}}>Sign Up</span></div>
                </Form>
            </Modal>    
        </>
    )
}
