import React, { useEffect } from 'react'
import { Button, ConfigProvider, Form, Input, message } from 'antd'
import { useAuth } from '../../../../context/AuthContext'

export default function CmsLoginComp() {

    const [form] = Form.useForm()

    const {
        setSize,
        isLoading,
        handleLogin,
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
            <div
                className='bg-[#f2f2f2] h-[100vh] w-[100vw] flex items-center justify-center font-[Nunito Sans]'
            >
                <div
                    className='bg-white mx-0 my-auto lg:p-5 md:p-3 p-3 lg:w-[30vw] md:w-[35vw] w-[60vw]'
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Form: {
                                    itemMarginBottom: setSize(14, 12, 10),
                                    labelFontSize: setSize(16, 12, 10),
                                    verticalLabelMargin: setSize('5px 0px -5px 0px', '5px 0px -5px 0px', '5px 0px -10px 0px'),
                                    fontSize: setSize(16, 12, 10)
                                },
                                Input: {
                                    controlHeight: setSize(40, 30, 24),
                                    fontSize: setSize(16, 12, 10),
                                }
                            }
                        }}
                    >
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={
                                async () => {
                                    try {
                                        await handleLogin(form.getFieldsValue())
                                        form.resetFields()
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }
                        >
                            <div
                                className='font-semibold lg:text-[24px] md:text-[16px] text-[14px] md:pb-2 pb-2'
                            >
                                Dosirak Admin Log In
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
                            <div className="w-full flex justify-end cursor-pointer underline text-[#155DFF] hover:text-[#FA5523] lg:text-[16px] md:text-[12px] text-[10px]">Forgot Password?</div>
                            <Form.Item label={null}>
                                <Button loading={isLoading} type="primary" htmlType="submit" className='w-full lg:mt-5 md:mt-4 mt-3' style={{ height: setSize(45, 30, 28), fontSize: setSize(18, 10, 10) }}>
                                    Log In
                                </Button>
                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </>
    )
}
