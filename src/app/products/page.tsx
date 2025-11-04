'use client';

import React, { useEffect, useState } from 'react';
import apiService from "@/services/api.service";
import { useUserProvider } from "@/providers/UserProvider";
const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const { user } = useUserProvider()
    const [quantities, setQuantities] = useState({});


    useEffect(() => {
        const fetchProducts = async () => {
            const data = await apiService.getAllProducts();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    const updateQuantity = (productId, change) => {
        setQuantities(prev => {
            const newQty = Math.max(1, (prev[productId] || 1) + change);
            return { ...prev, [productId]: newQty };
        });
    };


    const handleBuyNow = async (product) => {
        try {
            const quantity = quantities[product.id] || 1;
            const data = await apiService.createPayment({
                amount: product.price * 100,
                productId: product.id,
                quantity,
                userId: user.id
            });

            window.location.href = data.url;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Our Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="group bg-white border border-gray-200 rounded-2xl shadow-sm"
                    >
                        <div className="relative">
                            <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${product.imageUrl}`}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-t-2xl"
                            />
                            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-gray-800 text-sm px-2 py-1 rounded-md">
                                ${product.price * (quantities[product.id] || 1)}
                            </div>
                        </div>

                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                    {product.name}
                                </h2>
                            </div>

                            <div className="flex items-center justify-center space-x-3 mt-3">
                                <button
                                    onClick={() => updateQuantity(product.id, -1)}
                                    className="w-8 h-8 bg-gray-200 text-gray-800 rounded-full text-lg font-bold hover:bg-gray-300"
                                >
                                    –
                                </button>

                                <span className="text-lg font-semibold">
                                    {quantities[product.id] || 1}
                                </span>

                                <button
                                    onClick={() => updateQuantity(product.id, 1)}
                                    className="w-8 h-8 bg-gray-200 text-gray-800 rounded-full text-lg font-bold hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>


                            <button
                                onClick={() => handleBuyNow(product)}
                                className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 rounded-xl font-medium shadow-md"
                            >
                                {product.purchaseType === "payment" ?  "Buy Now" :  "Buy by Subscription" }
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;