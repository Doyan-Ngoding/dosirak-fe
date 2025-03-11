import React, { useEffect, useState } from 'react'
import { Anchor, Col, ConfigProvider, Input, Row } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import { useMenu } from '../../../context/MenuContext';
import SplitTitle from '../../global/split/title';
import CardMenuHome from '../../global/menu/cardMenuHome';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../../context/OrderContext';
import { IconBuildingStore, IconSearch } from '@tabler/icons-react';

export default function ContentListComp() {

    const navigate = useNavigate()

    const {
        setSize
    } = useAuth()

    const {
        listMenuGroupedRestaurant,
        tabCategory, 
        tabRestaurant,
    } = useMenu();
    
    const {
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        cart, setCart
    } = useOrder();

    const addedToCart = (menuItem) => { 
        setSelectedMenu(
            (prevCart) => {
                const updatedCart = prevCart.map((item) =>
                    item.id === menuItem.id
                        ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                        : item
                );
                const isExisting = prevCart.find((item) => item.id === menuItem.id);
            
                if (!isExisting) {
                    updatedCart.push({ ...menuItem, qty: 1, subTotal: menuItem.price });
                }
                
                return updatedCart;                
            }
        )
    }

    useEffect(() => {
        setSubTotal(
            selectedMenu.reduce((total, item) => total + item.subTotal, 0)
        );
        setCart(selectedMenu)
    }, [selectedMenu]);
    
    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(listMenuGroupedRestaurant)
    }, [listMenuGroupedRestaurant]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
    
        if (!value || value === null) {
            setFilteredData(listMenuGroupedRestaurant);
            return;
        }
        
        const filtered = listMenuGroupedRestaurant.filter((item) => 
            item.restaurant.toLowerCase().includes(value)
        );
    
        setFilteredData(filtered);
    };

    console.log(filteredData);
    

    return (
        <>
             <div
                className='lg:pt-[100px] md:pt-[80px] pt-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                className='text-[#A5ABB3] font-[Plus Jakarta Sans] font-semibold lg:text-[20px] md:text-[14px] text-[10px]'
                >
                    WHAT WE SERVE
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Select: {
                                borderRadius: setSize(12, 6, 4),
                                colorBgContainer: '#FFFFFF',
                                colorTextPlaceholder: '#000000',
                                colorText: '#000000',
                                colorBorder: '#D9D9D9',
                                controlHeight: setSize(42, 22, 18),
                                fontSize: setSize(14, 12, 10),
                                colorBgElevated: '#FFFFFF',
                                optionSelectedBg: '#FFFFFF'
                            },
                            Input: {
                                controlHeight: setSize(42, 28, 22),
                                fontSize: setSize(14, 12, 10),
                            }
                        }
                    }}
                >
                    <div
                        className='flex justify-between items-center'
                    >
                        <div
                            className='flex items-center'
                        >
                            <div 
                                className='text-[#E83600] bebas-neue-regular font-bold lg:text-[60px] md:text-[40px] text-[24px] lg:pr-5 md:pr-3 pr-2'
                            >
                                OUR MENU
                            </div>
                        </div>
                        {
                            (
                                <div>
                                    <Input 
                                        placeholder='Search restaurant here'
                                        style={{ borderRadius: 50, width: setSize(350, 250, 200) }}
                                        value={searchText}
                                        onChange={handleSearch}
                                        suffix={
                                            <div
                                                className='bg-[#FA5523] rounded-full lg:py-1 md:py-1 md:px-1 px-1 py-1'
                                            >
                                                <IconSearch 
                                                    color='#FFFFFF'
                                                    size={setSize(16, 10, 8)}
                                                />
                                            </div>  
                                        }
                                        prefix={
                                            <IconBuildingStore 
                                                color='#FA5523'
                                                size={setSize(22, 14, 12)}
                                                style={{
                                                    marginRight: 5
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            )
                        }
                    </div>
                </ConfigProvider>
            </div>
            <div
                className='lg:pt-[50px] md:pt-[30px] pt-[20px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    className="sticky lg:top-[68px] md:top-[50px] top-[35px] z-10 bg-white w-auto text-[Plus Jakarta Sans]"
                >
                    <div
                        className="overflow-x-auto whitespace-nowrap custom-scroll border-b border-gray-500"
                    >
                        <Anchor
                            direction="horizontal"
                            className="inline-flex space-x-4"
                            targetOffset={15}
                            items={
                                tabRestaurant ? tabRestaurant.map((value) => ({
                                    key: value,
                                    href: '#'+value,
                                    title: value,
                                })) : []
                            }
                        />
                    </div>
                </div>
                <div
                    className='lg:pt-10 md:pt-7 pt-5'
                >
                    {
                        listMenuGroupedRestaurant && filteredData.map((value, key) => (
                            <>
                                <div
                                    id={value.restaurant}
                                >
                                    <div
                                        className='lg:pb-3 md:pb-2 pb-1'
                                    >
                                        <SplitTitle 
                                            no={value.restaurant_image}
                                            title={value.restaurant}
                                        />
                                    </div>
                                    <Row
                                        justify={'start'}
                                        align={'middle'}
                                        gutter={[12, 12]}
                                        style={{
                                            paddingBottom: setSize(60, 40, 30)
                                        }}
                                    >
                                        {
                                            value.menu.map((value, key) => (
                                                <Col
                                                    span={setSize(6, 6, 8)}
                                                >
                                                    <CardMenuHome 
                                                        image={value.image}
                                                        title={value.name}
                                                        desc={value.description}
                                                        price={value.price}
                                                        stock={value.qty}
                                                        showResto={false}
                                                        addToCart={() => {addedToCart(value), navigate('/order')}}
                                                        isMenu={true}
                                                    />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </div>
                            </>
                        ))
                    }
                </div>
                <style>
                {`
                    .ant-anchor-link {
                        width: ${setSize('200px', '150px', '100px')};
                        text-align: center;
                        display: inline-block;
                        transition: all 0.3s ease;
                        white-space: nowrap;
                    }

                    .ant-anchor-link-active > a {
                        background-color: rgba(255, 69, 0, 0.1);
                        color: #ff4500; 
                        width: ${setSize('200px', '150px', '100px')};
                        border-radius: 0px;
                        display: inline-block;
                        text-align: center;
                        font-weight: 700;
                    }
                `}
                </style>
            </div>
        </>
    )
}
