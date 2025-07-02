import { IconChevronDown, IconChevronUp, IconEdit, IconEye, IconFilter, IconSelector, IconTrash } from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { Button, Image, Modal, Popconfirm, Tooltip } from "antd";

const iconSort = () => {
    const { setSize } = useAuth();

    return {
        sortIcon: (order) => {
            if (order.sortOrder === "ascend") {
                return ( 
                    <IconChevronUp 
                        style={{
                            border: "1px solid #009FF5",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "#009FF5",
                        }}
                        size={setSize(20, 14, 12)}
                    />
                )
            } else if (order.sortOrder === "descend") {
                return (
                    <IconChevronDown 
                        style={{
                            border: "1px solid #4880FF",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "#4880FF",
                        }}
                        size={setSize(20, 14, 12)}
                    />
                )
            }
            return ( 
                <IconSelector 
                    style={{
                        border: "1px solid #4880FF",
                        padding: "1px",
                        borderRadius: "4px",
                        color: "#4880FF",
                    }}
                    size={setSize(20, 14, 12)}
                />
            )
        },
    }
};

const iconFilter = () => {
    const { setSize } = useAuth();
    return {
        filterIcon: (filtered) => (
            <IconFilter
                style={{
                    color: "#4880FF",
                    border: "1px solid #4880FF",
                    padding: "2px",
                    borderRadius: "4px",
                    fill: filtered ? "#4880FF" : undefined,
                }}
                size={setSize(20, 14, 12)}
            />
        ),
    }
};

const iconSorts = () => {
    const { setSize } = useAuth();

    return {
        sortIcon: (order) => {
            if (order.sortOrder === "ascend") {
                return ( 
                    <IconChevronUp 
                        style={{
                            border: "1px solid #FF6B00",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "#FF6B00",
                        }}
                        size={setSize(20, 14, 12)}
                    />
                )
            } else if (order.sortOrder === "descend") {
                return (
                    <IconChevronDown 
                        style={{
                            border: "1px solid #FF6B00",
                            padding: "1px",
                            borderRadius: "4px",
                            color: "#FF6B00",
                        }}
                        size={setSize(20, 14, 12)}
                    />
                )
            }
            return ( 
                <IconSelector 
                    style={{
                        border: "1px solid #FF6B00",
                        padding: "1px",
                        borderRadius: "4px",
                        color: "#FF6B00",
                    }}
                    size={setSize(20, 14, 12)}
                />
            )
        },
    }
};

const iconFilters = () => {
    const { setSize } = useAuth();
    return {
        filterIcon: (filtered) => (
            <IconFilter
                style={{
                    color: "#FF6B00",
                    border: "1px solid #FF6B00",
                    padding: "2px",
                    borderRadius: "4px",
                    fill: filtered ? "#FF6B00" : undefined,
                }}
                size={setSize(20, 14, 12)}
            />
        ),
    }
};

export const columnInvoiceList = (data = []) => [
    {
        title: "Invoice Number",
        key: "format_id",
        dataIndex: "format_id",
        sorter: (a, b) => String(a.format_id || '').localeCompare(String(b.format_id || '')),
        ...iconSort(),
    },
    {
        title: "User",
        key: "name",
        dataIndex: "name",
        sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
        ...iconSort(),
    },
    {
        title: "Date Time",
        key: "pre_order",
        dataIndex: "pre_order",
        render: (text) => text ? dayjs(text).format('DD.MM.YYYY - hh.mm A') : '',
        sorter: (a, b) => String(a.pre_order || '').localeCompare(String(b.pre_order || '')),
        ...iconSort(),
    },
    {
        title: "Amount",
        key: "amount",
        dataIndex: "amount",
        render: (text) => 'Rp. ' + (text ? parseFloat(text).toLocaleString() : '-'),
        sorter: (a, b) => String(a.amount || '').localeCompare(String(b.amount || '')),
        ...iconSort(),
    },
    // {
    //     title: "Status",
    //     key: "status",
    //     dataIndex: "status",
    //     render: (text, record) => (
    //         <>
    //             <Tooltip title={text === "Scheduled" ? (record.date ? dayjs(record.date).format('DD.MM.YYYY - hh.mm A') : '') : ''}>
    //                 <div
    //                     className={`${text === "Scheduled" ? 'bg-amber-100 cursor-pointer' : 'bg-blue-50'} rounded-lg text-center`}
    //                 >
    //                     {text}
    //                 </div>
    //             </Tooltip>
    //         </>
    //     ),
    //     filters: [
    //         ...new Set(data?.map((item) => item.status)),
    //         ].map((el) => {
    //         return { text: el, value: el };
    //     }),
    //     onFilter: (value, record) => record.status.indexOf(value) === 0,
    //     filterSearch: true,
    //     ...iconFilter()
    // },
    {
        title: "Bulk",
        key: "qty",
        dataIndex: "qty",
        render: (text, record) => (
            <>
                <Tooltip title={ text + ' items'}>
                    <div
                        className={`${text >= 100 ? 'bg-red-100' : 'bg-blue-50'} rounded-lg text-center cursor-pointer`}
                    >
                        {text >= 100 ? 'Ya' : 'Tidak'}
                    </div>
                </Tooltip>
            </>
        ),
        filters: [
            ...new Set(data?.map((item) => item.qty)),
            ].map((el) => {
            return { text: el, value: el };
        }),
        onFilter: (value, record) => record.qty.indexOf(value) === 0,
        filterSearch: true,
        ...iconFilter(),
    },
]

export const columnProductList = (data = [], getDetail, modalEdit, handleDelete) => {
    const { setSize, authUser } = useAuth();
    return [
        {
            title: '#',
            key: '#',
            dataIndex: '#',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Product Name',
            key: 'name',
            dataIndex: 'name',
            width: 200,
            sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
            ...iconSort(),
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
            width: 250,
        },
        // {
        //     title: 'Qty',
        //     key: 'qty',
        //     dataIndex: 'qty',
        //     sorter: (a, b) => String(a.qty || '').localeCompare(String(b.qty || '')),
        //     ...iconSort(),
        // }, 
        {
            title: 'Price',
            key: 'price',
            dataIndex: 'price',
            width: 150,
            render: (text) => 'Rp. ' + (text ? parseFloat(text).toLocaleString() : '-'),
            sorter: (a, b) => String(a.price || '').localeCompare(String(b.price || '')),
            ...iconSort(),
        },
        {
            title: 'Variant',
            key: 'variant',
            dataIndex: 'variant',
            width: 250,
            render: (text) => (
                text ? (
                    <dl>
                        {
                            JSON.parse(text).map(value => (
                                <>
                                    <dt style={{ fontWeight: 'bold' }}>
                                        {value.variant}
                                    </dt>
                                    {
                                        value.sizes.map(val => (
                                            <>
                                                <dd>- {val.size}: Rp. {parseFloat(val.base_price).toLocaleString()}</dd>       
                                            </>
                                        ))
                                    }
                                </>
                            ))
                        }
                    </dl>
                ) : '-'
            )
        },
        {
            title: 'Category',
            key: 'category_name',
            dataIndex: 'category_name',
            filters: [
                ...new Set(data?.map((item) => item.category_name)),
                ].map((el) => {
                return { text: el, value: el };
            }),
            onFilter: (value, record) => record.category_name.indexOf(value) === 0,
            filterSearch: true,
            ...iconFilter(),
        },
        {
            title: 'Restaurant',
            key: 'restaurant_name',
            dataIndex: 'restaurant_name',
            filters: [
                ...new Set(data?.map((item) => item.restaurant_name)),
                ].map((el) => {
                return { text: el, value: el };
            }),
            onFilter: (value, record) => record.restaurant_name.indexOf(value) === 0,
            filterSearch: true,
            ...iconFilter(),
        },
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: (text) => (
                <Image 
                    width={70}
                    src={`${import.meta.env.VITE_API_BE_BASE_URL}/${text}`}
                />
            )   
        },
        (authUser && authUser.role === 'superadmin') && {
            title: '',
            width: 80,
            render: (text, record, index) => (
                <>
                    <div
                        className="flex items-center justify-between w-full"
                    >
                        <IconEdit 
                            size={setSize(16, 14, 12)}
                            color="#faad14"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {getDetail(record.id), modalEdit(true)}}
                        />
                        <Popconfirm
                            title={`Delete the user`}
                            description={<span>Are you sure to delete this user: <b>{record.name}</b>?</span>}
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <IconTrash 
                                size={setSize(16, 14, 12)}
                                color="red"
                                style={{ cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </div>
                </>
            )
        },
    ].filter(Boolean)
}

export const columnUserList = (data = [], getDetail, modalEdit, handleDelete) => {
    const { setSize } = useAuth();
    return [
        {
            title: '#',
            key: '#',
            dataIndex: '#',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
            ...iconSort(),
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            sorter: (a, b) => String(a.email || '').localeCompare(String(b.email || '')),
            ...iconSort(),
        },
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone',
            sorter: (a, b) => String(a.phone || '').localeCompare(String(b.phone || '')),
            ...iconSort(),
        }, 
        {
            title: 'Address',
            key: 'location',
            dataIndex: 'location',
        }, 
        {
            title: 'Role',
            key: 'role',
            dataIndex: 'role',
            render: (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : '',
            filters: [
                ...new Set(data?.map((item) => (item.role ? item.role.charAt(0).toUpperCase() + item.role.slice(1) : ''))),
                ].map((el) => {
                return { text: el, value: el };
            }),
            onFilter: (value, record) => (record.role ? record.role.charAt(0).toUpperCase() + record.role.slice(1) : '').indexOf(value) === 0,
            filterSearch: true,
            ...iconFilter(),
        },
        {
            title: '',
            width: 80,
            render: (text, record, index) => (
                <>
                    <div
                        className="flex items-center justify-between w-full"
                    >
                        <IconEdit 
                            size={setSize(16, 14, 12)}
                            color="#faad14"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {getDetail(record.id), modalEdit(true)}}
                        />
                        <Popconfirm
                            title={`Delete the user`}
                            description={<span>Are you sure to delete this user: <b>{record.name}</b>?</span>}
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <IconTrash 
                                size={setSize(16, 14, 12)}
                                color="red"
                                style={{ cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </div>
                </>
            )
        },
    ]
}

export const columnCategoryList = (data = [], getDetail, modalEdit, handleDelete, category) => {
    const { setSize, authUser } = useAuth();
    return [
        {
            title: '#',
            key: '#',
            dataIndex: '#',
            render: (text, record, index) => index + 1
        },
        {
            title: category + ' Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
            ...iconSort(),
        },
        (authUser && authUser.role === 'superadmin') && {
            title: '',
            width: 80,
            render: (text, record, index) => (
                <>
                    <div
                        className="flex items-center justify-between w-full"
                    >
                        <IconEdit 
                            size={setSize(16, 14, 12)}
                            color="#faad14"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {getDetail(record.id), modalEdit(true)}}
                        />
                        <Popconfirm
                            title={`Delete the ${category.toLowerCase()}`}
                            description={<span>Are you sure to delete this {category.toLowerCase()}: <b>{record.name}</b>?</span>}
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <IconTrash 
                                size={setSize(16, 14, 12)}
                                color="red"
                                style={{ cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </div>
                </>
            )
        },
    ].filter(Boolean)
}

export const columnRestaurantList = (data = [], getDetail, modalEdit, handleDelete, category, hideAction) => {
    const { setSize, authUser } = useAuth();
    return [
        {
            title: '#',
            key: '#',
            dataIndex: '#',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Restaurant Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
            ...iconSort(),
            filters: [
                ...new Set(data?.map((item) => (item.name))),
                ].map((el) => {
                return { text: el, value: el };
            }),
            onFilter: (value, record) => (record.name).indexOf(value) === 0,
            filterSearch: true,
        },
        // {
        //     title: 'Sub Restaurant Name',
        //     key: 'sub_name',
        //     dataIndex: 'sub_name',
        //     sorter: (a, b) => String(a.sub_name || '').localeCompare(String(b.sub_name || '')),
        //     ...iconSort(),
        // },
        // {
        //     title: 'Email',
        //     key: 'email',
        //     dataIndex: 'email',
        //     sorter: (a, b) => String(a.email || '').localeCompare(String(b.email || '')),
        //     ...iconSort(),
        // },
        // {
        //     title: 'Phone',
        //     key: 'phone',
        //     dataIndex: 'phone',
        //     sorter: (a, b) => String(a.phone || '').localeCompare(String(b.phone || '')),
        //     ...iconSort(),
        // }, 
        // {
        //     title: 'Address',
        //     key: 'address',
        //     dataIndex: 'address',
        //     width: 300,
        // }, 
        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: (text) => (
                <Image 
                    width={50}
                    src={`${import.meta.env.VITE_API_BE_BASE_URL}/${text}`}
                />
            )
        },
        (authUser && authUser.role === 'superadmin') && 
        {
            title: 'Hide',
            key: 'is_hide',
            dataIndex: 'is_hide',  
            width: 100,
            render: (text, record) => (
                <>
                    <Popconfirm
                        title={`Hide this ${category.toLowerCase()}`}
                        description={<span>Are you sure to {text === true ? 'unhide' : 'hide'} this {category.toLowerCase()}: <b>{record.name}</b>?</span>}
                        onConfirm={() => hideAction(record.id, {is_hide: text === false ? true : false})}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            size="small"
                            danger
                            type={text === false && "primary"}
                        >
                            {
                                text === false ? 'Hide' : 'Unhide'
                            }
                            
                        </Button>
                    </Popconfirm>
                </>
            )
        },
        {
            title: '',
            width: 80,
            render: (text, record, index) => (
                <>
                    <div
                        className="flex items-center justify-between w-full"
                    >
                        <IconEdit 
                            size={setSize(16, 14, 12)}
                            color="#faad14"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {getDetail(record.id), modalEdit(true)}}
                        />
                        <Popconfirm
                            title={`Delete the ${category.toLowerCase()}`}
                            description={<span>Are you sure to delete this {category.toLowerCase()}: <b>{record.name}</b>?</span>}
                            onConfirm={() => handleDelete(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <IconTrash 
                                size={setSize(16, 14, 12)}
                                color="red"
                                style={{ cursor: 'pointer' }}
                            />
                        </Popconfirm>
                    </div>
                </>
            )
        },
    ].filter(Boolean)
}

export const columnOrderList = (data = [], modalDetail, dataDetail) => {

    const { setSize } = useAuth()

    return [
        {
            title: "Order Number",
            key: "format_id",
            dataIndex: "format_id",
            sorter: (a, b) => String(a.format_id || '').localeCompare(String(b.format_id || '')),
            ...iconSort(),
        },
        {
            title: "User",
            key: "name",
            dataIndex: "name",
            sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
            ...iconSort(),
        },
        {
            title: "Pre Order Date",
            key: "pre_order",
            dataIndex: "pre_order",
            render: (text) => text ? dayjs(text).format('dddd, DD MMM YYYY HH:mm') + '-' + dayjs(text).add(1, 'hour').format('HH:mm') : '',
            sorter: (a, b) => String(a.pre_order || '').localeCompare(String(b.pre_order || '')),
            ...iconSort(),
        },
        {
            title: "Address",
            key: "address_order",
            dataIndex: "address_order",
        },
        {
            title: "Qty",
            key: "qty",
            dataIndex: "qty",
            sorter: (a, b) => String(a.qty || '').localeCompare(String(b.qty || '')),
            ...iconSort(),
        },
        {
            title: "Amount",
            key: "amount",
            dataIndex: "amount",
            render: (text) => 'Rp. ' + (text ? parseFloat(text).toLocaleString() : '-'),
            sorter: (a, b) => String(a.amount || '').localeCompare(String(b.amount || '')),
            ...iconSort(),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (text) => (
                <div
                    className={`${text === 'success' ? 'bg-green-100' : 'bg-blue-50'} rounded-lg text-center cursor-pointer`}
                >
                    {
                        text === 'success' ? (
                            'Success Payment'
                        ) : text
                    }
                </div>
            ),
            filters: [
                ...new Set(data?.map((item) => (item.status))),
                ].map((el) => {
                return { text: el, value: el };
            }),
            onFilter: (value, record) => (record.status).indexOf(value) === 0,
            filterSearch: true,
            ...iconFilter(),
        },
        {
            title: '',
            width: 80,
            render: (text, record, index) => (
                <>
                    <div
                        className="flex items-center justify-between w-full"
                    >
                        <IconEye 
                            size={setSize(16, 14, 12)}
                            color="#4880FF"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {modalDetail(true), dataDetail(record)}}
                        />
                    </div>
                </>
            )
        },
    ]
}
export const columnOrderListUser = (data = [], modalDetail, dataDetail) => {

    const { setSize } = useAuth()

    return [
        {
            title: "No",
            key: "index",
            dataIndex: "index",
            render: (text, record, index) => index + 1,
            sorter: (a, b) => String(a.index || '').localeCompare(String(b.index || '')),
            ...iconSorts(),
        },
        {
            title: "Order List",
            key: "detail_menus",
            dataIndex: "detail_menus",
            render: (text) => text ? text.map(value => ( <span>{value.qty}x {value.name}, </span> )) : '',
        },
        {
            title: "Restaurant",
            key: "detail_menus",
            dataIndex: "detail_menus",
            render: (text) => text ? text[0].restaurant_name : '',
            sorter: (a, b) => String(a.restaurant_name || '').localeCompare(String(b.restaurant_name || '')),
            ...iconSorts(),
        },
        {
            title: "Order Date",
            key: "pre_order",
            dataIndex: "pre_order",
            render: (text) => text ? dayjs(text).format('DD MMMM YYYY') : '',
            sorter: (a, b) => String(a.pre_order || '').localeCompare(String(b.pre_order || '')),
            ...iconSorts(),
        }, 
        {
            title: "Delivery Time",
            key: "pre_order",
            dataIndex: "pre_order",
            render: (text) => text ? dayjs(text).format('HH:mm') + '-' + dayjs(text).add(1, 'hour').format('HH:mm') : '',
            sorter: (a, b) => String(a.pre_order || '').localeCompare(String(b.pre_order || '')),
            ...iconSorts(),
        },
        {
            title: "Qty",
            key: "qty",
            dataIndex: "qty",
            sorter: (a, b) => String(a.qty || '').localeCompare(String(b.qty || '')),
            ...iconSorts(),
        },
        {
            title: "Amount",
            key: "amount",
            dataIndex: "amount",
            render: (text) => 'Rp. ' + (text ? parseFloat(text).toLocaleString() : '-'),
            sorter: (a, b) => String(a.amount || '').localeCompare(String(b.amount || '')),
            ...iconSorts(),
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (text) => (
                <div className={`${text === 'success' ? 'bg-green-100' : 'bg-blue-50'} rounded-lg text-center cursor-pointer`}>
                    {text[0].toUpperCase() + text.slice(1)}
                </div>
            ),
        },
        {
            title: 'Action',
            width: 150,
            align: 'center',
            render: (text, record, index) => (
                <>
                    <div
                        className="flex items-center justify-between w-full text-[#E83600] cursor-pointer"
                        // onClick={() => {modalDetail(true), dataDetail(record)}}
                    >
                        Order Again
                    </div>
                </>
            )
        },
    ]
}