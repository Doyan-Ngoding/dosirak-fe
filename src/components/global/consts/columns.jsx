import { IconChevronDown, IconChevronUp, IconEdit, IconFilter, IconSelector, IconTrash } from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { Image, Modal, Popconfirm, Tooltip } from "antd";

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
            ...new Set(data?.map((item) => item.bulk)),
            ].map((el) => {
            return { text: el, value: el };
        }),
        onFilter: (value, record) => record.bulk.indexOf(value) === 0,
        filterSearch: true,
        ...iconFilter(),
    },
]

export const columnProductList = (data = [], getDetail, modalEdit, handleDelete) => {
    const { setSize } = useAuth();
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
            sorter: (a, b) => String(a.name || '').localeCompare(String(b.name || '')),
            ...iconSort(),
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
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
            render: (text) => 'Rp. ' + (text ? parseFloat(text).toLocaleString() : '-'),
            sorter: (a, b) => String(a.price || '').localeCompare(String(b.price || '')),
            ...iconSort(),
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
                    src={`${import.meta.env.VITE_URL_BE}/${text}`}
                />
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
    const { setSize } = useAuth();
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
    ]
}