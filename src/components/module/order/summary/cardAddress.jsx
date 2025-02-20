import React from 'react'
import { 
    Col,
    ConfigProvider,
    Input,
    Row 
} from 'antd'
import { 
    IconHomeFilled, 
    IconPencilMinus 
} from '@tabler/icons-react';
import { useOrder } from '../../../../context/OrderContext';
const { TextArea } = Input;

export default function CardAddress() {

    const {
        editAbleAddress, setEditAbleAddress,
        addressUser, setAddressUser,
    } = useOrder()

    return (
        <>
            <Row
                style={{
                    padding: 20,
                    borderRadius: 10,
                    backgroundColor: '#FFFFFF'
                }}
                align={"middle"}
                gutter={[0, 12]}
            >
                <Col
                    span={24}
                    style={{
                        color: '#393939',
                        fontWeight: 600,
                        fontSize: 20,
                    }}
                >
                    SELECT ADDRESS
                </Col>
                <Col
                    span={24}
                >
                    <ConfigProvider
                        theme={{
                            components: {
                                Input: {
                                    fontSize: 14
                                }
                            }
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: editAbleAddress ? '' : 'rgba(40, 125, 60, 0.05)',
                                border: editAbleAddress ? '1px solid #DCDCDC' : '1px solid #287D3C',
                                padding: "2px 5px",
                                borderRadius: 10
                            }}
                        >
                            <IconHomeFilled 
                                color='#287D3C'  
                                size={26} 
                            />
                            <TextArea 
                                rows={2}
                                variant='borderless'
                                disabled={editAbleAddress ? false : true}
                                value={addressUser}
                                onChange={(e) => setAddressUser(e.target.value)}
                            />
                        </div>
                        
                    </ConfigProvider>
                </Col>
                <Col
                    span={24}
                    style={{
                        padding: '0px 5px'
                    }}
                >
                    <div
                        className='input-address'
                        onClick={() => setEditAbleAddress(!editAbleAddress)}
                    >
                        <IconPencilMinus />
                        <div
                            style={{
                                paddingLeft: 10
                            }}
                        >
                            Change Address
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}
