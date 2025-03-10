import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Form, Input, message, Modal, Select, Upload } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { IconUpload } from '@tabler/icons-react';

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
    const [fileList, setFileList] = useState([])

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

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const props = {
        name: 'file',
        onChange(info) {
            setFileList(info.fileList)
            if (info.file.status === 'done') {
                message.success(`Uploaded successfully`);
                form.setFieldValue("image", info.file.originFileObj)
            } else if (info.file.status === 'error') {
                message.error(`Upload failed`);
            }
        },
        beforeUpload: file => {
            const isSize = file.size / 1024 / 1024 < 1;
            if (!isSize) {
                message.error('Image must smaller than 1MB!');
                form.setFieldValue("image", "")
            }
            return isSize;
        }
    }

    const propsImg = {
        defaultFileList: [
            {
                uid: data && data.id,
                name: data && data.image,
                status: 'done',
                response: 'done',
                url: `${import.meta.env.VITE_URL_BE}/${data && data.image}`
            }
        ],
        onChange(info) {
            form.setFieldValue("image", info.file)
        }
    };

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
                    onCancel={() => {setIsopen(false), form.resetFields(), setFileList()}}    
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
                                        await action(form.getFieldsValue())
                                        setTimeout(() => {
                                            setIsLoading(false)
                                            form.resetFields()
                                            setFileList()
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
                                            rules={val.name !== 'image' ? [
                                                {
                                                    required: (val.name === "password") ? (isReq ? true : false) : val.required,
                                                    message: `Please input your ${val.label.toLowerCase()}!`,
                                                    type: val.name === "email" && "email"
                                                },
                                            ] : []}
                                        >
                                            {
                                                val.type === "input" ? (
                                                    (
                                                        val.name === "password" ? (
                                                            <Input.Password />
                                                        ) : (
                                                            <Input type={(val.name === "phone" || val.name === "price") ? "number" : undefined} />
                                                        )
                                                    )
                                                ) : (
                                                    val.type === "textarea" ? (
                                                        <Input.TextArea rows={3} />
                                                    ) : (
                                                        val.type === "select" ? (
                                                            <Select options={val.option} />
                                                        ) : (
                                                            (val.type === "upload" && title === "Add Product") ? (
                                                                <>
                                                                    <Upload
                                                                        {...props}
                                                                        fileList={fileList}
                                                                        customRequest={dummyRequest}
                                                                        accept=".png, .jpg, .jpeg"
                                                                        listType="picture"
                                                                    >
                                                                        <Button
                                                                            icon={
                                                                                <IconUpload 
                                                                                    size={setSize(16, 14, 12)}
                                                                                />
                                                                            }
                                                                        >
                                                                            Upload Image
                                                                        </Button>
                                                                    </Upload>
                                                                    <small
                                                                        className='text-red-500'
                                                                    >
                                                                        Max. 1MB (.jpg, .jpg, .jpeg)
                                                                    </small>
                                                                </>
                                                            ) : (   
                                                                (val.type === "upload" && title === "Edit Product") ? (
                                                                    <>
                                                                        <Upload
                                                                            {...propsImg}
                                                                            valuePropName='fileList'
                                                                            customRequest={dummyRequest}
                                                                            accept=".png, .jpg, .jpeg"
                                                                            listType="picture"
                                                                        >
                                                                            <Button
                                                                                icon={
                                                                                    <IconUpload 
                                                                                        size={setSize(16, 14, 12)}
                                                                                    />
                                                                                }
                                                                            >
                                                                                Upload Image
                                                                            </Button>
                                                                        </Upload>
                                                                        <small
                                                                            className='text-red-500'
                                                                        >
                                                                            Max. 1MB (.jpg, .jpg, .jpeg)
                                                                        </small>
                                                                    </>
                                                                ) : (
                                                                    <></>
                                                                )
                                                            )
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
