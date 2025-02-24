import React, { useEffect } from 'react'
import { useOrder } from '../../../../context/OrderContext';
import LayoutComp from '../../../global/layout';
import { 
    Button,
    Col,
    Row 
} from 'antd';
import CardTitleStep from '../../../global/title/cardTitleStep';
import { IconShoppingBagCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

export default function CompleteComp() {

    const navigate = useNavigate();

    const {
        token
    } = useAuth()

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
                                title={"COMPLETE"}
                            />
                        </Col>
                    </Row>
                    <Row
                        justify={"center"}
                        align={"center"}
                        style={{
                            padding: 10,
                        }}
                    >
                        <Col
                            span={12}
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 10,
                                padding: 20,
                                textAlign: 'center'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: "center"
                                }}
                            >
                                <IconShoppingBagCheck 
                                    color='#287D3C'
                                />
                                <div
                                    style={{
                                        color: '#287D3C',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        paddingLeft: 5 
                                    }}
                                >
                                    COMPLETE!
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: 32,
                                    fontWeight: 600,
                                    padding: "10px 0"
                                }}
                            >
                                Chef start cooking for you!
                            </div>
                            <div>
                                <span style={{ color: '#838383' }}>Estimated delivery time <span style={{ backgroundColor: 'rgba(232, 54, 0, 0.1)', color: '#E83600', textDecoration: 'underline', padding: 4 }}>00:59:00</span></span>
                            </div>
                            <div>
                                <img src='/assets/img-complete.jpg' style={{ width: '50%'}} />
                            </div>
                            <Button
                                size='large'
                                style={{
                                   color: '#E83600',
                                   border: '1px solid #E83600',
                                   borderRadius: 50,
                                   width: '80%'
                                }}
                            >
                                Back To Home
                            </Button>
                        </Col>
                    </Row>
                </div>
            </LayoutComp>
        </>
    )
}
