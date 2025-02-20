import React, { useEffect } from 'react'
import LayoutComp from '../../../global/layout'
import { useOrder } from '../../../../context/OrderContext'
import CardTitleStep from '../../../global/title/cardTitleStep';
import { Col, Row } from 'antd';
import CardTotal from './cardTotal';
import CardMethod from './cardMethod';

export default function PaymentComp() {

    const {
        currStep, setCurrStep
    } = useOrder();

    useEffect(() => {
        setCurrStep(1)
    }, []);
    
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
                            padding: '30px 80px 10px 80px',
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
                            padding: '10px 90px 30px 90px',
                            width: '100%'
                        }}
                        gutter={[12, 12]}
                    >
                        <Col
                            span={16}
                        >
                            <CardMethod />
                        </Col>
                        <Col
                            span={8}
                        >
                            <CardTotal  />
                        </Col>
                    </Row>
                </div>
            </LayoutComp>
        </>
    )
}
