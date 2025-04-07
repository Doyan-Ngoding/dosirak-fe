    import { useEffect, useState } from "react";
    import { useParams, useLocation, useNavigate } from "react-router-dom";
    import axios from "axios";
    import { Spin, Alert } from "antd";

    export default function PaymentDetails() {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchPayment = async () => {
        if (location.state?.payment) {
            setPayment(location.state.payment);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
            `${import.meta.env.VITE_API_BE}/payment-invoice/${orderId}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );
            setPayment(response.data.data);
        } catch (err) {
            console.error("❌ Error fetching payment details:", err);
            setError("Gagal mengambil detail pembayaran.");
        } finally {
            setLoading(false);
        }
        };

        fetchPayment();
    }, [orderId, location.state, token]);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-64">
            <Spin size="large" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="p-4">
            <Alert message="Error" description={error} type="error" showIcon />
        </div>
        );
    }

    if (!payment) {
        return (
        <div className="p-4">
            <Alert
            message="Data tidak ditemukan"
            description="Invoice tidak tersedia atau telah dihapus."
            type="warning"
            showIcon
            />
        </div>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Detail Pembayaran</h1>

        <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <div>
            <strong>Order ID:</strong> {payment.order_id}
            </div>
            <div>
            <strong>Produk:</strong> {payment.item_details.description}
            </div>
            <div>
            <strong>Nomor Tujuan:</strong> {payment.customer_no}
            </div>
            <div>
            <strong>Harga:</strong> Rp {Number(payment.price).toLocaleString("id-ID")}
            </div>
            <div>
            <strong>Status:</strong>{" "}
            <span className="font-medium text-blue-600">{payment.status}</span>
            </div>
            <div>
            <strong>Metode Pembayaran:</strong> {payment.payment_method}
            </div>
            <div>
            <strong>Tanggal:</strong>{" "}
            {new Date(payment.created_at).toLocaleString("id-ID")}
            </div>
        </div>

        <button
            onClick={() => navigate(-1)}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Kembali
        </button>
        </div>
    );
    }
