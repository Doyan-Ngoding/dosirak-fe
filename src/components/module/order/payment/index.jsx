import React, { useEffect } from 'react'
import LayoutComp from '../../../global/layout'
import { useOrder } from '../../../../context/OrderContext'
import CardTitleStep from '../../../global/title/cardTitleStep';
import { Col, Row } from 'antd';
import CardTotal from './cardTotal';
import CardMethod from './cardMethod';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentComp() {

    const navigate = useNavigate();

    const {
        currStep, setCurrStep,
        cart,
        orderTemp,
        handleAddPayment,
    } = useOrder();

    const {
        setSize,
        token,
        authUser,
        setResMessage,
    } = useAuth()

    useEffect(() => {
        setCurrStep(2)
    }, []);
    
    useEffect(() => {
        if (!token && !authUser) {
            setResMessage(['error', 'Log In First!'])
            setTimeout(() => {
                navigate('/order')
            }, 2000)
        } 
    }, [token, authUser]);

    return (
        <>
            <LayoutComp>
                <div
                    style={{
                        backgroundColor: '#F4F6F9',
                        width: '100%'
                    }}
                >
                    <Row
                        style={{
                            padding: setSize("30px 80px 10px 80px", "30px 50px 10px 50px", "30px 30px 10px 30px"),
                        }}
                    >
                        <Col
                            span={24}
                        >
                            <CardTitleStep 
                                step={currStep}
                                subTitle={"Complete the Step!"}
                                title={"PAYMENT METHOD"}
                            />
                        </Col>
                    </Row>
                    <Row
                        style={{
                            padding: setSize("10px 70px 10px 80px", "10px 40px 10px 50px", "10px 20px 10px 30px"),
                            width: '100%'
                        }}
                        gutter={[12, 12]}
                    >
                        <Col
                            span={setSize(16, 14, 24)}
                        >
                            <CardMethod />
                        </Col>
                        <Col
                            span={setSize(8, 10, 24)}
                        >
                            <CardTotal  
                                // handleClick={handleAddPayment}
                            />
                        </Col>
                    </Row>
                </div>
            </LayoutComp>
        </>
    )
}
