import React from 'react'
import { ConfigProvider, Modal } from 'antd'
import { useAuth } from '../../../context/AuthContext'
import dayjs from 'dayjs';

export default function ModalDetailOrder({
    isOpen,
    setIsopen,
    data
}) {

    const {
        setSize
    } = useAuth()

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Modal: {
                            titleFontSize: setSize(20, 18, 16)
                        }
                    }
                }}
            >
                <Modal
                    open={isOpen}
                    onCancel={() => setIsopen(false)}    
                    footer={null} 
                    title={"Detail Data Order"}
                    width={setSize("40%", "50%", "60%")}
                    styles={{
                        body: {
                            paddingTop: 10,
                            fontSize: setSize(14, 12, 10)
                        }
                    }}
                >
                    <div
                        className='flex items-center mb-1'
                    >
                        <div
                            className='w-[30%] font-semibold'
                        >
                            Order Number
                        </div>
                        <div className='w-[70%]'>
                            : {data && data.format_id}
                        </div>
                    </div>
                    <div
                        className='flex items-center mb-1'
                    >
                        <div
                            className='w-[30%] font-semibold'
                        >
                            Name
                        </div>
                        <div className='w-[70%]'>
                            : {data && data.name}
                        </div>
                    </div>
                    <div
                        className='flex items-center mb-1'
                    >
                        <div
                            className='w-[30%] font-semibold'
                        >
                            Pre Order Date
                        </div>
                        <div className='w-[70%]'>
                            : {data && dayjs(data.pre_order).format('dddd, DD MMM YYYY HH:mm') + '-' + dayjs(data.pre_order).add(1, 'hour').format('HH:mm')}
                        </div>
                    </div>
                    <div
                        className='flex items-center mb-1'
                    >
                        <div
                            className='w-[30%] font-semibold'
                        >
                            Address
                        </div>
                        <div className='w-[70%]'>
                            : {data && data.address_order}
                        </div>
                    </div>
                    <div
                        className='flex items-center mb-1'
                    >
                        <div
                            className='w-[30%] font-semibold'
                        >
                            Status
                        </div>
                        <div className='w-[70%]'>
                            : {data && (data.status === 'success' ? 'Success Payment' : data.status)}
                        </div>
                    </div>
                    <div 
                        className='mt-5'
                    >
                        <div
                            className='w-[30%] font-semibold mb-2'
                        >
                            Detail Menu
                        </div>
                        <div>
                            {
                                data && data.detail_menus.map(value => (
                                    <div
                                        className='mb-2'
                                    >
                                        <div
                                            className='flex justify-between items-center'
                                        >
                                            <div>
                                                <div>
                                                    {value.name}
                                                </div>
                                                <div>
                                                    {value.qty} x Rp. {value.price && parseFloat(value.price).toLocaleString()}
                                                </div>
                                            </div>
                                            <div
                                                className='font-semibold'
                                            >
                                                Rp. {value.subTotal && parseFloat(value.subTotal).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <hr />
                        <div
                            className='flex justify-end mt-2 font-bold'
                        >
                            <div
                                className='mr-5'
                            >
                                Total
                            </div>
                            <div>
                                Rp. {data && parseFloat(data.amount).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </Modal>
            </ConfigProvider>
        </>
    )
}
