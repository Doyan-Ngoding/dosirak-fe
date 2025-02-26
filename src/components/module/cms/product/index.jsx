import React from 'react'
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
        isMobile
    } = useAuth()

    const {
        listMenu,
        isLoading, setIsLoading,
        modalAddMenu, setModalAddMenu
    } = useMenu()
    
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
                        />
                        <Button
                            type='primary'
                        >
                            + Add Product
                        </Button>
                    </div>
                    <div
                        className='lg:mt-5 md:mt-3 mt-3'
                    >
                        <Table 
                            dataSource={listMenu}
                            columns={columnProductList(listMenu)}
                            className='lg:pt-5 md:pt-3 pt-2'
                            size={setSize('medium', 'small', 'small')}
                            pagination={{
                                total: listMenu && listMenu?.length,
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
            />
        </>
    )
}
