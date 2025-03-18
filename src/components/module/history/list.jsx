import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { Table } from 'antd'
import { columnOrderListUser } from '../../global/consts/columns'
import { useHistory } from '../../../context/HistoryContext'
import ModalDetailOrder from '../../global/modal/detailOrder'

export default function ListHistory() {

    const { setSize } = useAuth()

    const { listHistoryOrder } = useHistory()

    const [modalDetail, setModalDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState();

    return (
        <>
            <div
                style={{
                    backgroundColor: '#E83600',
                    height: setSize('30vh', '40vh', '35vh'),
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    color: '#FFFFFF',
                    fontFamily: 'Bebas Neue',
                    paddingBottom: 20,
                    
                }}
                className='lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    style={{
                        fontSize: setSize(50, 30, 30)
                    }}
                >
                    Order History
                </div>
            </div>
            <div
                className='lg:py-[100px] md:py-[80px] py-[50px] lg:px-[50px] md:px-[30px] px-[20px]'
            >
                <div
                    style={{
                        // backgroundColor: '#E83600'
                    }}
                >
                    <Table 
                        columns={columnOrderListUser(listHistoryOrder, setModalDetail, setDataDetail)}
                        dataSource={listHistoryOrder}
                        size={setSize('medium', 'small', 'small')}
                        pagination={{
                            total: listHistoryOrder && listHistoryOrder?.length,
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
            <ModalDetailOrder 
                isOpen={modalDetail}
                setIsopen={setModalDetail}
                data={dataDetail}
            />
        </>
    )
}
