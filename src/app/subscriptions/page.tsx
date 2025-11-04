'use client';

import React, { useEffect, useState } from 'react';
import apiService from "@/services/api.service";
import { useUserProvider } from "@/providers/UserProvider";

const SubscriptionPage = () => {
    const [plans, setPlans] = useState([]);
    const { user } = useUserProvider();

    useEffect(() => {
        const fetchPlans = async () => {
            const data = await apiService.getAllSubscriptions();
            setPlans(data)
        };
        fetchPlans();
    }, []);


    const handleSubscribe = async (plan) => {
        try {
            const data = await apiService.createPayment({
                amount: plan.price * 100,
                productId: plan.id,
                quantity: 1,
                userId: user.id,
            });
            window.location.href = data.url;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Choose subscription plan
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow bg-white text-center flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{plan.name}</h2>
                            <p className="mt-3 text-gray-600">
                                <span className="text-4xl font-bold text-indigo-600">${plan.price}</span>
                                <span className="text-gray-500">/month</span>
                            </p>
                        </div>

                        <button
                            onClick={() => handleSubscribe(plan)}
                            className="mt-8 bg-indigo-600 text-white w-full py-3 rounded-xl font-medium hover:bg-indigo-700 transition-all"
                        >
                            Subscribe
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPage;
