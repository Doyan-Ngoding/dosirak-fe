import React, { useEffect, useState } from 'react'
import FullComp from '../../../global/layout/full'
import { Input, Table } from 'antd'
import { IconSearch } from '@tabler/icons-react'
import { useAuth } from '../../../../context/AuthContext'
import  { columnOrderList } from '../../../global/consts/columns'
import { useSummary } from '../../../../context/SummaryContext'
import ModalDetailOrder from '../../../global/modal/detailOrder'
import dayjs from 'dayjs'

export default function CmsOrderComp() {

    const {
        setSize
    } = useAuth()

    const {
        listAllOrder
    } = useSummary()

    const [modalDetail, setModalDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState();

    const [searchText, setSearchText] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(listAllOrder)
    }, [listAllOrder]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
    
        if (!value || value === null) {
            setFilteredData(listAllOrder);
            return;
        }
        
        const filtered = listAllOrder.filter((item) => 
            item.name.toLowerCase().includes(value) || 
            item.format_id.toLowerCase().includes(value) || 
            (item.pre_order && dayjs(item.pre_order).format('dddd, DD MMM YYYY HH:mm') + '-' + dayjs(item.pre_order).add(1, 'hour').format('HH:mm')).toLowerCase().includes(value) || 
            item.address_order.toLowerCase().includes(value) 
        );
    
        setFilteredData(filtered);
    };

    return (
        <>
            <FullComp
                menu="Orders"
            >
                <div
                    className='bg-white w-full lg:my-0 lg:rounded-2xl lg:py-5 lg:px-5 md:my-0 md:rounded-xl md:py-3 md:px-3 my-0 rounded-xl py-2 px-2'
                >
                    <div
                        className='flex justify-end items-center lg:gap-5 md:gap-3 gap-2'
                    >
                        <Input 
                            placeholder='Search here...'
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
                    </div>
                    <div
                        className='lg:mt-5 md:mt-3 mt-3'
                    >
                        <Table 
                            dataSource={filteredData}
                            columns={columnOrderList(filteredData, setModalDetail, setDataDetail)}
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
            <ModalDetailOrder 
                isOpen={modalDetail}
                setIsopen={setModalDetail}
                data={dataDetail}
            />
        </>
    )
}
