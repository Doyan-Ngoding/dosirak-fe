import React, { use, useEffect, useState } from 'react'
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
    const [isParent, setIsParent] = useState("false");
    const [formItems, setFormItems] = useState(item);

    useEffect(() => {
        if ((resMessage && resMessage.length === 2)) {
            const [type, content] = resMessage;
            messageApi[type](content)
        }
    }, [resMessage]);

    const handleParentChange = (isParent) => {
        let updatedFields = [...item];
      
        if (isParent === "true") {
          updatedFields = updatedFields.filter(item => item.name !== "price");
        } else {
          updatedFields = updatedFields.filter(item => item.name !== "variants");
        }
      
        setFormItems(updatedFields);
    };

    useEffect(() => {
        let updatedFields = [...item];

        if (isParent === "true") {
          updatedFields = updatedFields.filter(item => item.name !== "price");
        } else {
          updatedFields = updatedFields.filter(item => item.name !== "variants");
        }
      
        setFormItems(updatedFields);
    }, [isParent, item]);

    useEffect(() => {
        if (data) {
            const initialValues = formItems.reduce((acc, field) => {
              if (field.name !== "password") {
                if (field.name === "variants" && typeof data["variant"] === "string") {
                  try {
                    acc["variants"] = JSON.parse(data["variant"]);
                  } catch (e) {
                    acc["variants"] = [];
                  }
                } else if (field.name === "is_parent_menu") {
                  acc["is_parent_menu"] = String(data["is_parent_menu"]);
                  setIsParent(String(data["is_parent_menu"]));
                } else {
                  acc[field.name] = data[field.name];
                }
              }
              return acc;
            }, {});
        
            form.setFieldsValue(initialValues);
        }
    }, [data, formItems]);

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
            const isSize = file.size / 1024 / 1024 < 3;
            if (!isSize) {
                message.error('Image must smaller than 3MB!');
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
                url: `/assets${data && data.image}`
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
                        formItems && (
                            <Form
                                layout="vertical"
                                form={form}
                                onFinish={async () => {
                                    try {
                                        console.log(form.getFieldsValue())
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
                                    formItems.map(val => (
                                        <Form.Item
                                            label={val.label}
                                            name={val.name}
                                            rules={(val.name !== 'image' && val.name !== 'variants') ? [
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
                                                            val.name === "price" ? (
                                                                isParent === "false" && (
                                                                    <Input type={"number"} />
                                                                ) 
                                                            ) : (
                                                                <Input type={((val.name === "phone" && title === "Add User")) ? "number" : undefined} />
                                                            )
                                                        )
                                                    )
                                                ) : (
                                                    val.type === "textarea" ? (
                                                        <Input.TextArea rows={3} />
                                                    ) : (
                                                        val.type === "select" ? (
                                                            val.name === "is_parent_menu" ? (
                                                                <Select options={val.option} value={isParent} onChange={(e) => {setIsParent(e), handleParentChange(e)}} />
                                                            ) : (
                                                                <Select options={val.option} />
                                                            )
                                                        ) : (
                                                            (val.type === "upload" && (title === "Add Product" || title === "Add Restaurant")) ? (
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
                                                                            Upload Images
                                                                        </Button>
                                                                    </Upload>
                                                                    <small
                                                                        className='text-red-500'
                                                                    >
                                                                        Max. 1MB (.jpg, .jpg, .jpeg)
                                                                    </small>
                                                                </>
                                                            ) : (   
                                                                (val.type === "upload" && (title === "Edit Product" || title === "Edit Restaurant")) ? (
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
                                                                    (val.type === "custom" && val.name === "variants" && isParent === "true") ? (
                                                                        <Form.List name="variants">
                                                                            {(fields, { add, remove }) => (
                                                                                <div className="flex flex-col gap-4">
                                                                                {fields.map((field, index) => (
                                                                                    <div key={field.key} className="border p-4 rounded-md space-y-2 bg-gray-50">
                                                                                    <Form.Item
                                                                                        {...field}
                                                                                        label="Variant Name"
                                                                                        name={[field.name, "variant"]}
                                                                                        rules={[{ required: true, message: 'Variant name is required' }]}
                                                                                    >
                                                                                        <Input placeholder="e.g. Beef, Pork, etc" />
                                                                                    </Form.Item>

                                                                                    <Form.List name={[field.name, "sizes"]}>
                                                                                        {(sizeFields, { add: addSize, remove: removeSize }) => (
                                                                                        <div className="space-y-2">
                                                                                            {sizeFields.map((sizeField) => (
                                                                                            <div key={sizeField.key} className="flex gap-2 items-end">
                                                                                                <Form.Item
                                                                                                name={[sizeField.name, "size"]}
                                                                                                label="Size"
                                                                                                rules={[{ required: true, message: 'Size required' }]}
                                                                                                >
                                                                                                <Input placeholder="e.g. Regular, Large" />
                                                                                                </Form.Item>
                                                                                                <Form.Item
                                                                                                name={[sizeField.name, "base_price"]}
                                                                                                label="Base Price"
                                                                                                rules={[{ required: true, message: 'Price required' }]}
                                                                                                >
                                                                                                <Input type="number" placeholder="e.g. 12000" />
                                                                                                </Form.Item>
                                                                                                <Button
                                                                                                danger
                                                                                                type="text"
                                                                                                onClick={() => removeSize(sizeField.name)}
                                                                                                >
                                                                                                Remove
                                                                                                </Button>
                                                                                            </div>
                                                                                            ))}
                                                                                            <Form.Item>
                                                                                            <Button
                                                                                                type="dashed"
                                                                                                onClick={() => addSize()}
                                                                                                block
                                                                                            >
                                                                                                + Add Size
                                                                                            </Button>
                                                                                            </Form.Item>
                                                                                        </div>
                                                                                        )}
                                                                                    </Form.List>

                                                                                    <Button danger type="text" onClick={() => remove(field.name)}>
                                                                                        Remove Variant
                                                                                    </Button>
                                                                                    </div>
                                                                                ))}
                                                                                <Form.Item>
                                                                                    <Button type="dashed" onClick={() => add()} block>
                                                                                    + Add Variant
                                                                                    </Button>
                                                                                </Form.Item>
                                                                                </div>
                                                                            )}
                                                                            </Form.List>
                                                                    ) : (
                                                                        <></>
                                                                    )
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
