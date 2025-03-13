import React, { useEffect, useState } from 'react';
import { 
    Button,
    Checkbox,
    Form,
    Input,
    Modal,
    message
} from 'antd';
import axios from 'axios';
import authConfig from '../../../config/auth';
import { useAuth } from '../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SignupStandard({ isOpen, setIsOpen }) {
    const { setSize, setModalLogin, setModalOtp, setToken, resMessage, setResMessage, setAuthUser, } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(authConfig.registerEndPoint, {
                name: values.name,
                phone: values.phone,
                email: values.email,
                password: values.password,
                location: values.location,
                confirmPassword: values.confirmPassword,
                created_by: "user",
            });
            setToken(response.data.results.token);
            setAuthUser(response.data.results.user)
            setModalOtp(false);
            setIsOpen(false);
            if (pathname === '/order') {
                if (localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length > 0) {
                    setResMessage(['success', 'Registration Success!'])
                    setTimeout(() => {
                        navigate('/order-summary');
                    }, 2000)
                } else {
                    setResMessage(['success', 'Registration Success!'])
                    setTimeout(() => {
                        navigate('/order');
                    }, 2000)
                }
            }
        } catch (error) {
            messageApi.error(error.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

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
                width={setSize('30%', '40%', '0%')}
                title={"Sign Up!"}
                onCancel={() => setIsOpen(false)}
                styles={{
                    body: { padding: 5 },
                    header: { padding: 5 }
                }}
            >
                <Form layout="vertical" style={{ marginTop: 20 }} onFinish={handleSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input type='number' />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!', type: 'email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="location"
                        rules={[
                            { required: true, message: 'Please input your address!', type: 'location' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please input your confirm password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="term"
                        valuePropName="checked"
                        rules={[{ required: true, message: 'Please check the terms!' }]}
                    >
                        <Checkbox>
                            By clicking sign up, you agree to our{' '}
                            <span className="cursor-pointer text-[#E83600] font-semibold underline">
                                Privacy & Policy
                            </span>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            style={{ height: setSize(45, 35, 0) }}
                            loading={loading} // Button loading state
                        >
                            Sign Up
                        </Button>
                    </Form.Item>

                    <div className="w-full flex justify-center font-semibold mt-[-10px]">
                        Already have an account?{' '}
                        <span
                            className="text-[#E83600] ml-2 cursor-pointer hover:text-[#FA5523]"
                            onClick={() => {
                                setModalLogin(true);
                                setIsOpen(false);
                            }}
                        >
                            Log In
                        </span>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
