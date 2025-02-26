import React from 'react'
import FullComp from '../../../global/layout/full'
import { Button, Input, Table } from 'antd'
import { useAuth } from '../../../../context/AuthContext'
import { IconSearch } from '@tabler/icons-react'
import { columnCategoryList } from '../../../global/consts/columns'
import { useRestaurant } from '../../../../context/RestaurantContext'
import Action from '../../../global/modal/action'

export default function CmsRestaurantComp() {

    const {
        setSize
    } = useAuth()

    const {
        listNearRestaurant,
        listRestaurant,
        detailRestaurant,
        modalAddRestaurant, setModalAddRestaurant,
        modalEditRestaurant, setModalEditRestaurant,
        isLoading, setIsLoading,
        resMessage, setResMessage,
        handleAddRestaurant,
        getDetailRestaurant,
        handleEditRestaurant,
        handleDeleteRestaurant,
    } = useRestaurant()

    const formAdd = [
        {
            name: "name",
            label: "Restaurant Name",
            required: true,
            type: "input"
        }
    ]

    return (
        <>
            <FullComp
                menu="Restaurants"
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
                        />
                        <Button
                            type='primary'
                            onClick={() => setModalAddRestaurant(true)}
                        >
                            + Add Restaurant
                        </Button>
                    </div>
                    <div
                        className='lg:mt-5 md:mt-3 mt-3'
                    >
                        <Table 
                            dataSource={listRestaurant}
                            columns={columnCategoryList(listRestaurant, getDetailRestaurant, setModalEditRestaurant, handleDeleteRestaurant, 'Restaurant')}
                            className='lg:pt-5 md:pt-3 pt-2'
                            size={setSize('medium', 'small', 'small')}
                            pagination={{
                                total: listRestaurant && listRestaurant?.length,
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
                isOpen={modalAddRestaurant}
                setIsopen={setModalAddRestaurant}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title={"Add Restaurant"}
                item={formAdd}
                action={handleAddRestaurant}
                resMessage={resMessage}
                setResMessage={setResMessage}
            />
                <Action 
                isOpen={modalEditRestaurant}
                setIsopen={setModalEditRestaurant}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                title={"Edit Restaurant"}
                item={formAdd}
                data={detailRestaurant}
                action={handleEditRestaurant}
                resMessage={resMessage}
                setResMessage={setResMessage}
            />
        </>
    )
}
