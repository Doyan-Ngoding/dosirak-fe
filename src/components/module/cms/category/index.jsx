import React, { useEffect, useState } from 'react'
import FullComp from '../../../global/layout/full'
import { Button, Input, message, Table } from 'antd'
import { useAuth } from '../../../../context/AuthContext'
import { IconSearch } from '@tabler/icons-react'
import { columnCategoryList } from '../../../global/consts/columns'
import { useCategory } from '../../../../context/CategoryContext'
import Action from '../../../global/modal/action'

export default function CmsCategoryComp() {

    const {
        setSize,
        authUser
    } = useAuth()

    const {
        listCategory,
        detailCategory,
        modalAddCategory, setModalAddCategory,
        modalEditCategory, setModalEditCategory,
        isLoading, setIsLoading, 
        resMessage, setResMessage,
        handleAddCategory,
        getDetailCategory,
        handleEditCategory,
        handleDeleteCategory,
    } = useCategory()

    
    const formAdd = [
        {
            name: "name",
            label: "Category Name",
            required: true,
            type: "input"
        }
    ]

    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(listCategory)
    }, [listCategory]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
    
        if (!value || value === null) {
            setFilteredData(listCategory);
            return;
        }
        
        const filtered = listCategory.filter((item) => 
            item.name.toLowerCase().includes(value)
        );
    
        setFilteredData(filtered);
    };

    return (
        <>
            <FullComp
                menu="Users"
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
                                    onClick={() => setModalAddCategory(true)}
                                >
                                    + Add Category
                                </Button>
                            )
                        }
                    </div>
                    <div
                        className='lg:mt-5 md:mt-3 mt-3'
                    >
                        <Table 
                            dataSource={filteredData}
                            columns={columnCategoryList(filteredData, getDetailCategory, setModalEditCategory, handleDeleteCategory, 'Category')}
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
                        />
                    </div>
                </div>
            </FullComp>
            <Action 
                isOpen={modalAddCategory}
                setIsopen={setModalAddCategory}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title={"Add Category"}
                item={formAdd}
                action={handleAddCategory}
                resMessage={resMessage}
                setResMessage={setResMessage}
            />
            <Action 
                isOpen={modalEditCategory}
                setIsopen={setModalEditCategory}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title={"Edit Category"}
                item={formAdd}
                data={detailCategory}
                action={handleEditCategory}
                resMessage={resMessage}
                setResMessage={setResMessage}
            />
        </>
    )
}
