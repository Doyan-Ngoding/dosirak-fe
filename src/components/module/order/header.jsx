import React from 'react'
import { 
    Col,
    Input,
    Row, 
    Select
} from 'antd'
import { useOrder } from '../../../context/OrderContext'
import { IconChevronDown, IconSearch, IconX } from '@tabler/icons-react'

export default function HeaderOrder() {

    const {
        listNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        menuSearched, setMenuSearched,
    } = useOrder()

    return (
        <>
            <Row
                align={'bottom'}
                justify={'space-between'}
                style={{
                    paddingBottom: 80,
                }}
            >
                <Col>
                    <div
                        style={{
                            color: 'rgba(107, 107, 107, 0.5)',
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    >
                        Our Menu
                    </div>
                    <div
                        style={{
                            color: '#FA5523',
                            fontSize: 56,
                            fontFamily: 'Vina Sans',
                            lineHeight: 0.7
                        }}
                    >
                        READY TO ORDER?
                    </div>
                </Col>
                <Col>
                    <Row>
                        <Col
                            style={{
                                paddingRight: 30
                            }}
                        >
                            <Select
                                placeholder={'Select restaurant near you'}
                                allowClear
                                options={
                                    listNearRestaurant.map(val => ({
                                        label: val, 
                                        value: val
                                    }))
                                }
                                value={selectedNearReastaurant}
                                onChange={(e) => setSelectedNearReastaurant(e)}
                                style={{
                                    width: '230px',
                                }}
                                suffixIcon={
                                    <div
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 50,
                                            padding: '2px 4px'
                                        }}
                                    >
                                        {
                                            !selectedNearReastaurant ? (
                                                <IconChevronDown 
                                                    color='#FA5523'
                                                    size={20}
                                                    style={{
                                                        marginTop: 2
                                                    }}
                                                />
                                            ) : (
                                                <IconX 
                                                    color='#FA5523'
                                                    size={20}
                                                    style={{
                                                        marginTop: 2
                                                    }}
                                                />
                                            )
                                        }
                                    </div>                                 
                                }
                                clearIcon={
                                    <div
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 50,
                                            padding: '2px 4px',
                                            margin: '-8px 0px 0px -14px'
                                        }}
                                    >
                                        <IconX 
                                            color='#FA5523'
                                            size={20}
                                            style={{
                                                marginTop: 2
                                            }}
                                        />
                                    </div> 
                                }
                            />
                        </Col>
                        <Col>
                            <Input 
                                placeholder='Search your menu here'
                                suffix={
                                    <div
                                        style={{
                                            backgroundColor: '#FA5523',
                                            borderRadius: '50%',
                                            padding: '3px 8px'
                                        }}
                                    >
                                        <IconSearch 
                                            color='#FFFFFF'
                                            size={18}
                                            style={{
                                                marginTop: 3
                                            }}
                                        />
                                    </div>  
                                }
                                style={{
                                    borderRadius: 50,
                                    width: '320px'
                                }}
                                value={menuSearched}
                                onChange={(e) => setMenuSearched(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
