import React, { useEffect, useState } from 'react'
import { 
    Button,
    Checkbox,
    Drawer, 
    Form,
    Input,
    message
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import authConfig from '../../../config/auth';
import { useLocation, useNavigate } from 'react-router-dom'

export default function SignupMobile({
    isOpen,
    setIsOpen,
}) {

    const [form] = Form.useForm()
    
    const {
        setSize,
        setModalLogin,
        setModalOtp,
        setToken,
        setAuthUser,
        resMessage,
        setResMessage,
    } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    const [loading, setLoading] = useState(false);
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
                    }, 3000)
                } else {
                    setResMessage(['success', 'Registration Success!'])
                    setTimeout(() => {
                        navigate('/order');
                    }, 3000)
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
                    form={form}
                    onFinish={handleSubmit}
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
                            type='number'
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
                        label={<span className='text-xs size-0'><span className='text-red-600'>*</span>Address</span>}
                        required={false}
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your address!</span>
                                ),
                                type: 'location'
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
                        style={{ marginBottom: "8px" }}
                    >
                        <Input.Password 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={null}
                        valuePropName="checked"
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
                        <Button type="primary" htmlType="submit" className='w-full' style={{ height: setSize(45, 35, 30) }} loading={loading}>
                            Sign Up
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-12px] text-[12px]">Already have an account? <span className='text-[#E83600] ml-2 cursor-pointer hover:text-[#FA5523]' onClick={() => {setModalLogin(true), setIsOpen(false)}}>Log In</span></div>
                </Form>
            </Drawer>
        </>
    )
}
