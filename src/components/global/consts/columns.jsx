import { IconChevronDown, IconChevronUp, IconEdit, IconFilter, IconSelector, IconTrash } from "@tabler/icons-react";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import { Tooltip } from "antd";

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
        key: "invoice_id",
        dataIndex: "invoice_id",
        sorter: (a, b) => String(a.invoice_id || '').localeCompare(String(b.invoice_id || '')),
        ...iconSort(),
    },
    {
        title: "User",
        key: "username",
        dataIndex: "username",
        sorter: (a, b) => String(a.username || '').localeCompare(String(b.username || '')),
        ...iconSort(),
    },
    {
        title: "Date Time",
        key: "date",
        dataIndex: "date",
        render: (text) => text ? dayjs(text).format('DD.MM.YYYY - hh.mm A') : '',
        sorter: (a, b) => String(a.date || '').localeCompare(String(b.date || '')),
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
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (text, record) => (
            <>
                <Tooltip title={text === "Scheduled" ? (record.date ? dayjs(record.date).format('DD.MM.YYYY - hh.mm A') : '') : ''}>
                    <div
                        className={`${text === "Scheduled" ? 'bg-amber-100 cursor-pointer' : 'bg-blue-50'} rounded-lg text-center`}
                    >
                        {text}
                    </div>
                </Tooltip>
            </>
        ),
        filters: [
            ...new Set(data?.map((item) => item.status)),
            ].map((el) => {
            return { text: el, value: el };
        }),
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        filterSearch: true,
        ...iconFilter()
    },
    {
        title: "Bulk",
        key: "bulk",
        dataIndex: "bulk",
        render: (text, record) => (
            <>
                <Tooltip title={text === "Ya" ? record.qty + ' items' : ''}>
                    <div
                        className={`${text === "Ya" ? 'bg-red-100 cursor-pointer' : 'bg-blue-50'} rounded-lg text-center`}
                    >
                        {text}
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

export const columnProductList = (data = []) => {
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
        {
            title: 'Qty',
            key: 'qty',
            dataIndex: 'qty',
            sorter: (a, b) => String(a.qty || '').localeCompare(String(b.qty || '')),
            ...iconSort(),
        }, 
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
            width: 10
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
                        />
                        <IconTrash 
                            size={setSize(16, 14, 12)}
                            color="red"
                        />
                    </div>
                </>
            )
        },
    ]
}