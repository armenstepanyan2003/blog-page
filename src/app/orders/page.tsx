'use client';

import React, { useEffect, useState } from 'react';
import apiService from "@/services/api.service";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await apiService.getUserOrders();
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const paymentOrders = orders.filter(o => o.product.purchaseType === "payment");
    const subscriptionOrders = orders.filter(o => o.product.purchaseType === "subscription");

    const handleCancelSubscription = async (subscriptionId) => {
        if (!subscriptionId) {
            console.log("No subscription ID found for this order.");
            return;
        }

        try {
            const res = await apiService.cancelSubscription(subscriptionId);
            if (res.success) {
                console.log("Subscription cancelled successfully!");
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.subscriptionId === subscriptionId
                            ? { ...order, status: 'canceled' }
                            : order
                    )
                );
            } else {
                console.log("Failed to cancel subscription: " + res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleRefundPayment = async (paymentId) => {
        if (!paymentId) {
            console.log("No payment ID found for this order.");
            return;
        }

        try {
            const res = await apiService.refundPayment(paymentId);
            if (res.success) {
                console.log("Payment refunded successfully!");
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.paymentId === paymentId
                            ? { ...order, status: 'canceled' }
                            : order
                    )
                );
            } else {
                console.log("Failed to refund payment: " + res.message);
            }
        } catch (error) {
            console.error("Refund error:", error);
        }
    };



    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                My Orders
            </h1>

            {paymentOrders.length === 0 ? (
                <p className="text-center text-gray-500 mb-12">
                    You have no regular orders yet.
                </p>
            ) : (
                <div className="space-y-6 mb-12">
                    {paymentOrders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center bg-white shadow-md rounded-2xl overflow-hidden"
                        >
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${order.product.imageUrl}`}
                                alt={order.product.name}
                                className="w-32 h-32 object-cover"
                            />

                            <div className="flex-1 p-5">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {order.product.name}
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    Price: ${order.product.price}
                                </p>
                                <p className="text-gray-500">
                                    Quantity: {order.quantity}
                                </p>

                                {order.status === 'canceled' ? (
                                    <p className="text-green-600 font-semibold mt-2">
                                        Payment refunded
                                    </p>
                                ) : (
                                    <button
                                        onClick={() => handleRefundPayment(order.paymentId)}
                                        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-yellow-600 transition-all duration-300"
                                    >
                                        Refund Payment
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                My Subscriptions
            </h1>

            {subscriptionOrders.length === 0 ? (
                <p className="text-center text-gray-500">
                    You have no active subscriptions.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {subscriptionOrders.map((order) => (
                        <div key={order.id} className="flex flex-col bg-indigo-50 border border-indigo-200 shadow-sm rounded-2xl overflow-hidden">

                            {order.product.imageUrl && (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${order.product.imageUrl}`}
                                    alt={order.product.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}

                            <div className="flex-1 p-5">
                                <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                                    {order.product.name}
                                </h2>
                                <p className="text-indigo-600 font-medium">
                                    ${order.product.price} / month
                                </p>

                                {order.status === 'canceled' ? (
                                    <p className="text-red-500 font-semibold mt-2">Subscription canceled</p>
                                ) : (
                                    <button
                                        onClick={() => handleCancelSubscription(order.subscriptionId)}
                                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-red-600 transition-all duration-300"
                                    >
                                        Cancel Subscription
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default OrdersPage;


