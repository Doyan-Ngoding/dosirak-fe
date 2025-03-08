import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Alert } from "antd";

export default function InvoiceComp() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BE}/invoices/${id}`
                );
                setInvoice(response.data.data);
            } catch (err) {
                setError("Gagal mengambil data invoice.");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    if (loading) return <Spin size="large" />;
    if (error) return <Alert type="error" message={error} />;

    return (
        <div style={{ padding: 20 }}>
            <h2>Invoice #{invoice.id}</h2>
            <p>Status: {invoice.status}</p>
            <p>Total Pembayaran: Rp {invoice.total}</p>
            <p>Metode Pembayaran: {invoice.payment_method}</p>
            <p>Tanggal Pembelian: {new Date(invoice.created_at).toLocaleDateString("id-ID")}</p>
        </div>
    );
}
