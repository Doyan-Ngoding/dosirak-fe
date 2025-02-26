import React, { useEffect } from 'react'
import { Button, ConfigProvider, Form, Input, message, Modal, Select } from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function Action({
    isOpen,
    setIsopen,
    isLoading, 
    setIsLoading,
    title,
    item,
    action,
    resMessage,
    setResMessage,
    data,
    isReq = true
}) {

    const [form] = Form.useForm()
    
    const {
        setSize
    } = useAuth();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if ((resMessage && resMessage.length === 2)) {
            const [type, content] = resMessage;
            messageApi[type](content)
        }
    }, [resMessage]);

    useEffect(() => {
        if (data) {
            (data && item) && (
                form.setFieldsValue(
                    item.reduce((acc, field) => {
                        if (field.name !== "password") {
                            acc[field.name] = data[field.name];
                        }
                        return acc;
                    }, {})
                )
            ) 
        }
    }, [data]);

    return (
        <>
            {contextHolder}
            <ConfigProvider
                theme={{
                    components: {
                        Form: {
                            itemMarginBottom: setSize(14, 12, 5),
                            labelFontSize: setSize(16, 12, 10),
                            verticalLabelMargin: setSize('5px 0px -5px 0px', '0px 0px -5px 0px', '0px 0px -10px 0px'),
                            fontSize: setSize(16, 12, 10)
                        },
                        Input: {
                            controlHeight: setSize(40, 30, 24),
                            fontSize: setSize(16, 12, 10),
                        },
                        Modal: {
                            titleFontSize: setSize(20, 18, 16)
                        }
                    }
                }}
            >
                <Modal
                    open={isOpen}
                    onCancel={() => {setIsopen(false), form.resetFields()}}    
                    footer={null} 
                    title={title}
                    width={setSize("40%", "50%", "60%")}
                >
                    {
                        item && (
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={async () => {
                                    try {
                                        // console.log(form.getFieldsValue())
                                        await action(form.getFieldsValue())
                                        setTimeout(() => {
                                            setIsLoading(false)
                                            form.resetFields()
                                        }, 1000)
                                    } catch (error) {
                                        setIsLoading(false)
                                        setResMessage(['error', error.message]);
                                    }
                                }}
                            >
                                {
                                    item.map(val => (
                                        <Form.Item
                                            label={val.label}
                                            name={val.name}
                                            rules={[
                                                {
                                                    required: val.name === "password" ? (isReq ? true : false) : val.required,
                                                    message: `Please input your ${val.label.toLowerCase()}!`,
                                                    type: val.name === "email" && "email"
                                                },
                                            ]}
                                        >
                                            {
                                                val.type === "input" ? (
                                                    (
                                                        val.name === "password" ? (
                                                            <Input.Password />
                                                        ) : (
                                                            <Input type={val.name === "phone" ? "number" : undefined} />
                                                        )
                                                    )
                                                ) : (
                                                    val.type === "textarea" ? (
                                                        <Input.TextArea rows={3} />
                                                    ) : (
                                                        val.type === "select" ? (
                                                            <Select options={val.option} />
                                                        ) : (
                                                            <></>
                                                        )
                                                    )
                                                )
                                            }
                                        </Form.Item>
                                    ))
                                }
                                <Form.Item label={null}>
                                    <Button loading={isLoading} type="primary" htmlType="submit" className='w-full lg:mt-5 md:mt-4 mt-3' style={{ height: setSize(45, 30, 28), fontSize: setSize(18, 10, 10) }}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        )
                    }
                </Modal>
            </ConfigProvider>
        </>
    )
}
