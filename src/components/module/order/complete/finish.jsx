import React, { useEffect, useState } from 'react'
import LayoutComp from '../../../global/layout'
import { Button, Col, Row } from 'antd'
import CardTitleStep from '../../../global/title/cardTitleStep'
import { useOrder } from '../../../../context/OrderContext'
import { useAuth } from '../../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { IconShoppingBagCheck } from '@tabler/icons-react'
import dayjs from 'dayjs'
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function FinishComp() {

    const navigate = useNavigate()

    const {
        currStep, setCurrStep,
    } = useOrder();

    const {
        setSize
    } = useAuth();

    useEffect(() => {
        setCurrStep(3)
    }, []);

    const initialTime = dayjs.duration(1, "minute").asMilliseconds(); 
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const interval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1000) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1000;
          });
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      const formatTime = () => {
        const duration = dayjs.duration(timeLeft);
        return `${String(duration.hours()).padStart(2, "0")}:${String(
          duration.minutes()
        ).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`;
      };    

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
                                title={"COMPLETE"}
                            />
                        </Col>
                    </Row>
                    <Row
                        justify={"center"}
                        align={"center"}
                        style={{
                            padding: setSize(10, 8, 5),
                        }}
                    >
                        <Col
                            span={setSize(12, 18, 20)}
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
                                    size={setSize(18, 16, 14)}
                                />
                                <div
                                    style={{
                                        color: '#287D3C',
                                        fontSize: setSize(16, 14, 12),
                                        fontWeight: 600,
                                        paddingLeft: 5 
                                    }}
                                >
                                    COMPLETE!
                                </div>
                            </div>
                            <div
                                style={{
                                    fontSize: setSize(32, 28, 24),
                                    fontWeight: 600,
                                    padding: "10px 0"
                                }}
                            >
                                Chef start cooking for you!
                            </div>
                            <div>
                                <span style={{ color: '#838383' }}>Estimated delivery time <span style={{ backgroundColor: 'rgba(232, 54, 0, 0.1)', color: '#E83600', textDecoration: 'underline', padding: 4 }}>{formatTime()}</span></span>
                            </div>
                            <div
                                className='flex justify-center'
                            >
                                <img src='/assets/img-complete.jpg' style={{ width: '50%'}} />
                            </div>
                            <Button
                                size={setSize('large', 'medium', 'medium')}
                                style={{
                                color: '#E83600',
                                border: '1px solid #E83600',
                                borderRadius: 50,
                                width: '100%'
                                }}
                                onClick={() => {localStorage.removeItem("resHistory"), navigate("/")}}
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
