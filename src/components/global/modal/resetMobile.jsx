import React from 'react'
import { 
    Button,
    Drawer, 
    Form,
    Input
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function ResetMobile({
    isOpen,
    setIsOpen
}) {

    const {
        setSize 
    } = useAuth()

    return (
        <>
            <Drawer
                title={<span className='text-[14px]'>Reset Password</span>}
                placement={"bottom"}
                closable={false}
                open={isOpen}
                key={"bottom"}
                height="auto"
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
                        span: 1
                    }}
                >
                    <Form.Item
                        label={<span className='text-xs'><span className='text-red-600'>*</span>New Password</span>}
                        name="newPasswprd"
                        required={false}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your new password!</span>
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
                        label={<span className='w-full text-xs size-0'><span className='text-red-600'>*</span>Confirm Password</span>}
                        required={false}
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your confirm password!</span>
                                ),
                            },
                        ]}
                        >
                        <Input.Password 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full' style={{ height: setSize(45, 35, 30) }}>
                            Save Password
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}
