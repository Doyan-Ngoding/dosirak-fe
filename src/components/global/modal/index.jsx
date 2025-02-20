import React from 'react'
import { 
    Button, 
    Col, 
    Form, 
    Input, 
    Modal, 
    Row 
} from 'antd'

export default function ModalComp({
    isOpen,
    setIsOpen,
    title,
    main,
    name,
    child,
    titleButton,
    action,
}) {
    const handleCancel = () => {
        setIsOpen(false);
    };
    return (
        <>
            <Modal
                open={isOpen}
                closeIcon={false}  
                onCancel={handleCancel}    
                footer={null} 
            >
                <div
                    style={{
                        fontSize: 30,
                        fontWeight: 600
                    }}
                >
                    {title}
                </div>
                <Row
                    justify={"center"}
                    style={{
                        padding: '30px 10px 0px 10px',
                    }}
                >
                    <Col
                        span={24}
                    >
                        <Form
                            onFinish={action}
                        >
                            <Form.Item
                                label={null}
                                name={name}
                                rules={[
                                    {
                                        required: true,
                                        message: 'This field is required!',
                                    },
                                ]}
                            >
                                <span>
                                    {main}
                                    {child}
                                </span>
                            </Form.Item>
                            <Form.Item label={null} style={{ width: '100%', paddingTop: 30 }}>
                                <div
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <Button size='large' type="primary" htmlType="submit" style={{ width: '100%', borderRadius: 100, fontWeight: 600, fontSize: 16 }} >
                                        {titleButton}
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal> 
        </>
    )
}
