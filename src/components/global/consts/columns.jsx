import { IconChevronDown, IconChevronUp, IconFilter, IconSelector } from "@tabler/icons-react";
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