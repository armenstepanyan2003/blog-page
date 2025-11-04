import React from "react";
import Link from "next/link";

const Success = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
                Payment Successful!
            </h1>
            <p className="text-lg text-green-800 mb-6">
                Thank you for your purchase. Your payment was completed successfully.
            </p>
            <Link href="/orders">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                    Go Back to Home
                </button>
            </Link>
        </div>
    );
};

export default Success;
