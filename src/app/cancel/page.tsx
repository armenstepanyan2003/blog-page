import React from "react";
import Link from "next/link";

const Cancel = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
            <h1 className="text-4xl font-bold text-red-700 mb-4">
                Payment Cancelled
            </h1>
            <p className="text-lg text-red-800 mb-6">
                Your payment was not completed. You can try again or contact support.
            </p>
            <Link href="/products">
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                    Go Back to Home
                </button>
            </Link>
        </div>
    );
};

export default Cancel;
