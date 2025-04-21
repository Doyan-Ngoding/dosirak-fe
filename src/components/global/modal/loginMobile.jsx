import React, { useEffect } from 'react'
import { 
    Button,
    Divider,
    Drawer, 
    Form,
    Input,
    message
} from 'antd'
import { IconX } from '@tabler/icons-react'
import { useAuth } from '../../../context/AuthContext'
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function LoginMobile({
    isOpen,
    setIsOpen,
    action
}) {

    const [form] = Form.useForm()
    
    const {
        setSize,
        setModalForgot, 
        setModalSignup,
        resMessage,
        handleLoginGoogle,
        handleLoginSuccessFacebook
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
                    <Divider style={{ fontSize: 12 }}>
                        OR
                    </Divider>
                    <Button 
                        className="flex items-center w-full py-3 rounded-full border-gray-300 shadow-sm" 
                        icon={<img src='/assets/icon/icon-google.png' width={'20px'}/>} 
                        size="small"
                        onClick={handleLoginGoogle}
                    >
                        Sign in with Google
                    </Button>
                    {/* <FacebookLogin
                        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
                        render={renderProps => (
                            <Button 
                                className="flex items-center w-full py-3 rounded-full border-gray-300 shadow-sm mt-2" 
                                icon={<img src='/assets/icon/icon-facebook.png' width={'22px'}/>} 
                                size="small"
                                onClick={renderProps.onClick}
                            >
                                Sign in with Facebook
                            </Button>
                        )} 
                        textButton='Sign in with Facebook'
                        autoLoad={false}  
                        fields="id,name,email"  
                        callback={handleLoginSuccessFacebook}
                        isMobile={false}
                    /> */}
                    <div className="w-full flex justify-center font-semibold mt-[10px] text-[12px]">Don't have an account? <span className='text-[#E83600] ml-2  cursor-pointer hover:text-[#FA5523]' onClick={() => {setModalSignup(true), setIsOpen(false)}}>Sign Up</span></div>
                </Form>
            </Drawer>
        </>
    )
}
