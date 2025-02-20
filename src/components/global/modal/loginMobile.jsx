import React from 'react'
import { 
    Button,
    Drawer, 
    Form,
    Input
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'

export default function LoginMobile({
    isOpen,
    setIsOpen
}) {

    const {
        setSize,
        setModalForgot, 
        setModalSignup
    } = useAuth()

    return (
        <>
            <Drawer
                title={<span className='text-[14px]'>Log In to Countinue Ordering</span>}
                placement={"bottom"}
                closable={false}
                // onClose={() => setIsOpen(false)}
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
                        label={<span className='text-xs'><span className='text-red-600'>*</span>Email</span>}
                        name="email"
                        required={false}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <span className='text-xs'>Please input your email!</span>
                                ),
                                type: 'email',
                                
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
                        >
                        <Input.Password 
                            style={{
                                padding: '5px 10px'
                            }}
                        />
                    </Form.Item>
                    <div className="w-full flex justify-end cursor-pointer text-[#E83600] font-semibold text-[12px] mt-[-14px] mb-[-10px] hover:text-[#FA5523]" onClick={() => {setModalForgot(true), setIsOpen(false)}}>Forgot Password?</div>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit" className='w-full mt-5' style={{ height: setSize(45, 35, 30) }}>
                            Log In
                        </Button>
                    </Form.Item>
                    <div className="w-full flex justify-center font-semibold mt-[-10px] text-[12px]">Don't have an account? <span className='text-[#E83600] ml-2  cursor-pointer hover:text-[#FA5523]' onClick={() => {setModalSignup(true), setIsOpen(false)}}>Sign Up</span></div>
                </Form>
            </Drawer>
        </>
    )
}
