import React, { useEffect, useState } from 'react'
import FullComp from '../../../global/layout/full'
import { Button, Input, Table } from 'antd'
import { useAuth } from '../../../../context/AuthContext'
import { IconSearch } from '@tabler/icons-react'
import { useMenu } from '../../../../context/MenuContext'
import { columnProductList } from '../../../global/consts/columns'
import Action from '../../../global/modal/action'

export default function CmsProductComp() {

    const {
        setSize,
        isMobile,
        authUser,
    } = useAuth()

    const {
        listMenu,
        listCategory,
        listRestaurant,
        isLoading, setIsLoading,
        modalAddMenu, setModalAddMenu,
        modalEditMenu, setModalEditMenu,
        resMessage, setResMessage,
        handleAddMenu,
        getDetailMenu,
        detailMenu, 
        handleEditMenu,
        handleDeleteMenu,
    } = useMenu()

    const formAdd = [
        {
            name: "name",
            label: "Product Name",
            required: true,
            type: "input"
        },
        {
            name: "description",
            label: "Description",
            required: true,
            type: "textarea"
        },
        {
            name: "price",
            label: "Price",
            required: false,
            type: "input"
        },
        {
            name: "category_name",
            label: "Category",
            required: true,
            type: "select",
            option: listCategory.map(val => ({
                label: val.name, 
                value: val.name
            }))
        },
        {
            name: "restaurant_name",
            label: "Restaurant",
            required: true,
            type: "select",
            option: listRestaurant.map(val => ({
                label: val.name, 
                value: val.name
            }))
        },
        {
            name: "image",
            label: "Product Image",
            required: false,
            type: "upload"
        },
    ]    

    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(listMenu)
    }, [listMenu]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
    
        if (!value || value === null) {
            setFilteredData(listMenu);
            return;
        }
        
        const filtered = listMenu.filter((item) => 
            item.name.toLowerCase().includes(value) ||
            item.description.toLowerCase().includes(value)
        );
    
        setFilteredData(filtered);
    };
    return (
        <>
            <FullComp
                menu="Products"
            >
                <div
                    className='bg-white w-full lg:my-0 lg:rounded-2xl lg:py-5 lg:px-5 md:my-0 md:rounded-xl md:py-3 md:px-3 my-0 rounded-xl py-2 px-2'
                >
                    <div
                        className='flex justify-end items-center lg:gap-5 md:gap-3 gap-2'
                    >
                        <Input 
                            placeholder='Search proudct here...'
                            style={{
                                width: setSize(200, 180, 150)
                            }}
                            suffix={
                                <IconSearch 
                                    style={{
                                        backgroundColor: '#4880FF',
                                        color: '#FFFFFF',
                                        borderRadius: 50,
                                        padding: 3
                                    }}
                                    size={setSize(20, 16, 14)}
                                />
                            }
                            value={searchText}
                            onChange={handleSearch} 
                        />
                        {
                            (authUser && authUser.role === 'superadmin') && (
                                <Button
                                    type='primary'
                                    onClick={() => setModalAddMenu(true)}
                                >
                                    + Add Product
                                </Button>
                            )
                        }
                    </div>
                    <div
                        className='lg:mt-5 md:mt-3 mt-3'
                    >
                        <Table 
                            dataSource={filteredData}
                            columns={columnProductList(filteredData, getDetailMenu, setModalEditMenu, handleDeleteMenu)}
                            className='lg:pt-5 md:pt-3 pt-2'
                            size={setSize('medium', 'small', 'small')}
                            pagination={{
                                total: filteredData && filteredData?.length,
                                showTotal: (total, range) =>
                                    `${range[0]}-${range[1]} of ${
                                        total ? total.toLocaleString() : ""
                                    } items`,
                                defaultPageSize: 10,
                                defaultCurrent: 1,
                                showSizeChanger: true,
                                hideOnSinglePage: false,
                                pageSizeOptions: [10, 20, 50, 100],
                                size: setSize('large', 'medium', 'small'),
                            }}
                            scroll={{
                                x: setSize(0, 1000, 800),
                            }}
                        />
                    </div>
                </div>
            </FullComp>
            <Action 
                isOpen={modalAddMenu}
                setIsopen={setModalAddMenu}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title="Add Product"
                item={formAdd}
                action={handleAddMenu}
                resMessage={resMessage}
                setResMessage={setResMessage}
                // isReq={false}
            />
            <Action 
                isOpen={modalEditMenu}
                setIsopen={setModalEditMenu}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title="Edit Product"
                item={formAdd}
                data={detailMenu}
                action={handleEditMenu}
                resMessage={resMessage}
                setResMessage={setResMessage}
                // isReq={false}
            />
        </>
    )
}
