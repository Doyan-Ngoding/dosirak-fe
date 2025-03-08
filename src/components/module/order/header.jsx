import React from 'react'
import { 
    Col,
    ConfigProvider,
    Input,
    Row, 
    Select
} from 'antd'
import { 
    IconChevronDown, 
    IconCircleChevronDownFilled, 
    IconSearch, 
    IconX, 
    IconXboxXFilled
} from '@tabler/icons-react'
import { useOrder } from '../../../context/OrderContext'
import { useAuth } from '../../../context/AuthContext'
import { useRestaurant } from '../../../context/RestaurantContext'

export default function HeaderOrder() {

    const {
        menuSearched, setMenuSearched,
    } = useOrder();

    const {
        listNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
    } = useRestaurant();

    const {
        setSize
    } = useAuth()

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Select: {
                            // fontSizeIcon: setSize(24, 10, 8),
                        }
                    }
                }}
            >
                <Row
                    align={'bottom'}
                    justify={'space-between'}
                    className='lg:mb-14 md:mb-10 mb-10'
                >
                    <Col
                        span={setSize(12, 24, 24)}
                    >
                        <div
                            className='text-[#6B6B6B80] text-[20px] font-semibold'
                        >
                            Our Menu
                        </div>
                        <div
                            className='title'
                        >
                            READY TO ORDER?
                        </div>
                    </Col>
                    <Col
                        span={setSize(12, 24, 24)}
                        className='mt-10'
                    >
                        <Row
                            justify={setSize("end", "end", "start")}
                            align={"bottom"}
                        >
                            <Col
                                className='lg:w-[50%] md:w-[40%] w-[100%]'
                            >
                                <Select
                                    placeholder={'Select restaurant near you'}
                                    allowClear={true}
                                    options={
                                        listNearRestaurant.map(val => ({
                                            label: val.name, 
                                            value: val.name
                                        }))
                                    }
                                    value={selectedNearReastaurant}
                                    onChange={(e) => setSelectedNearReastaurant(e)}
                                    className='lg:w-[95%] md:w-[90%] w-[70%]'
                                    showArrow={!selectedNearReastaurant}
                                    suffixIcon={
                                        <IconCircleChevronDownFilled 
                                            color='#FFFFFF'
                                            size={setSize(30, 28, 26)}
                                        />
                                    }
                                    clearIcon={
                                        <IconXboxXFilled 
                                            color='#FFFFFF'
                                            size={setSize(30, 28, 26)}
                                            style={{
                                                margin: setSize('-10px 0px 0px -20px', '-8px 0px 0px -15px', '-8px 0px 0px -15px'),
                                            }}
                                        />
                                    }
                                />
                            </Col>
                            <Col
                                className='lg:w-[45%] md:w-[40%] w-[70%]'
                            >
                                <Input 
                                    placeholder='Search your menu here'
                                    style={{ borderRadius: 50 }}
                                    className='lg:w-[100%] md:w-[100%] w-[100%] rounded-[50px] lg:mt-0 md:mt-0 mt-5'
                                    value={menuSearched}
                                    onChange={(e) => setMenuSearched(e.target.value)}
                                    suffix={
                                        <div
                                            className='bg-[#FA5523] rounded-full lg:py-1.5 px-1.5 py-[5px]'
                                        >
                                            <IconSearch 
                                                color='#FFFFFF'
                                                size={setSize(20, 16, 14)}
                                            />
                                        </div>  
                                    }
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ConfigProvider>
        </>
    )
}
