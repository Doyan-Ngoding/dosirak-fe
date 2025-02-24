import React from 'react'
import { ConfigProvider, Select, Table } from 'antd'
import { columnInvoiceList } from '../../../global/consts/columns'
import { useAuth } from '../../../../context/AuthContext';

export default function InvoiceSumComp() {

    const {
        setSize
    } = useAuth()

    const data = [
        {
            invoice_id: 'INV109012',
            username: 'Udin',
            date: '2018-07-25 10:30:30',
            amount: 98700,
            status: 'Scheduled',
            scheduled_time: '2018-07-26 10:30:30',
            bulk: 'Tidak',
            qty: 10,
        },
        {
            invoice_id: 'INV109013',
            username: 'Udin',
            date: '2018-07-25 10:30:30',
            amount: 98700,
            status: 'Immediately',
            scheduled_time: null,
            bulk: 'Tidak',
            qty: 10,
        },
        {
            invoice_id: 'INV109014',
            username: 'Udin',
            date: '2018-07-25 10:30:30',
            amount: 98700,
            status: 'Immediately',
            scheduled_time: null,
            bulk: 'Ya',
            qty: 190,
        },
    ]

    return (
        <>
            <div
                className='bg-white w-full lg:my-0 lg:rounded-2xl lg:py-5 lg:px-5 md:my-3 md:rounded-xl md:py-3 md:px-3 my-2 rounded-xl py-2 px-2'
            >
                <div
                    className='flex justify-between items-center'
                >
                    <div
                        className='text-[#202224] font-bold lg:text-[24px] md:text-[16px] text-[12px]'
                    >
                        Invoice List
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Select: {
                                    controlHeight: setSize(26, 20, 15),
                                    fontSize: setSize(12, 10, 10),
                                    colorBgContainer: '#FCFDFD',
                                    colorTextPlaceholder: '#2B303466',
                                    colorText: '#2B303466',
                                    colorBorder: '#D9D9D9',
                                    colorBgElevated: '#FCFDFD',
                                    optionSelectedBg: '#DDE9E9',
                                    hoverBorderColor: '#BED5D5',
                                    activeBorderColor: '#BED5D5',
                                }
                            }
                        }}  
                    >
                        <Select 
                            style={{
                                width: setSize(180, 120, 100),
                            }}
                            options={[
                                { label: 'October', value: 'October'},
                                { label: 'Octobers', value: 'Octobers'},
                            ]}
                        />
                    </ConfigProvider>
                </div>
                <Table 
                    dataSource={data}
                    columns={columnInvoiceList(data)}
                    className='lg:pt-5 md:pt-3 pt-2'
                    size={setSize('medium', 'small', 'small')}
                    pagination={{
                        total: data && data?.length,
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
                        x: setSize(0, 500, 500),
                    }}
                />
            </div>
        </>
    )
}
