import React from 'react'
import { Button, Col, Modal, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'

export default function AlertSuccess({
    isOpen,
    setIsOpen,
}) {

    const {
        setSize 
    } = useAuth()

    return (
        <>
            <Modal
                width={setSize("30%", "40%", "50%")}
                open={isOpen}
                footer={null}
                onCancel={() => {setIsOpen(false)}} 
                closable={false}   
            >
                <Row
                    // justify={"center"}
                >
                    <Col
                        span={24}
                    >
                        <div
                            style={{
                                backgroundColor: '#D9D9D9',
                                width: '70%',
                                height: setSize('200px', '150px', '100px'),
                                margin: '0 auto'
                            }}
                        >

                        </div>
                        <div
                            style={{
                                padding: '20px 0px 10px 0px',
                                fontSize: setSize(24, 16, 14),
                                fontWeight: 'bold'
                            }}
                        >
                            Registration Complete!                            
                        </div>
                        <div
                            style={{
                                padding: '10px 0px 20px 0px',
                                fontSize: setSize(16, 12, 10),
                            }}
                        >
                            Your account has been set up. Continue ordering and enjoy your meal!                         
                        </div>
                        <Button
                            style={{
                                width: '100%',
                                borderColor: '#E83600',
                                color: '#E83600'
                            }}
                            size={setSize('large', 'medium', 'small')}
                            onClick={() => {setIsOpen(false)}} 
                        >
                            Close
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}
