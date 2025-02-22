import React from 'react'
import { 
    Button,
    Col,
    ConfigProvider,
    Form,
    Input,
    Modal, 
    Row
} from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function CompleteStandard({
    isOpen,
    setIsOpen,
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <Modal
                open={isOpen}
                footer={null}
                width={setSize('30%', '40%', '60%')}
                styles={{
                    body: {
                        padding: 5,
                    },
                    header: {
                        padding: 5
                    }
                }}
                closable={false}
            >
                <Row>
                    <Col
                        span={24}
                        className='flex justify-center w-full'
                    >
                        <div 
                            className='lg:h-[170px] md:h-[150px] h-[100px] w-[60%] bg-[#D9D9D9] m-auto'
                        />
                    </Col>
                    <Col
                        span={24}
                        className='pt-5'
                    >
                        <div
                            className='lg:text-[20px] md:text-[16px] font-semibold'
                        >
                            Registration Complete
                        </div>
                    </Col>
                    <Col
                        span={24}
                        className='pt-3'
                    >
                         <div
                            className='lg:text-[14px] md:text-[12px] text-[10px]'
                        >
                            Your account has been set up. Continue ordering and enjoy your meal!
                        </div>
                    </Col>
                    <Col
                        span={24}
                        className='pt-5'
                    >
                        <Button
                            className='w-full'
                            style={{
                                color: '#E83600',
                                borderColor: '#E83600'
                            }}
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </Button>
                    </Col>
                </Row>
            </Modal>    
        </>
    )
}
