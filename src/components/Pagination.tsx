import React from 'react';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    const onNext = () => {
        onPageChange(currentPage +1);
    }

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    }

    const renderPageNumbers = () => {
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-4 py-2 rounded-lg border cursor-pointer ${
                        currentPage === i ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                    } transition`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-end gap-6 mt-4 items-center">
            {currentPage > 1 && (
                <button
                    className="border border-gray-300 bg-white hover:bg-gray-100 py-2 px-5 rounded-xl cursor-pointer transition"
                    onClick={onPrevious}
                >
                    Previous
                </button>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages && (
                <button
                    className="border border-gray-300 bg-white hover:bg-gray-100 py-2 px-5 rounded-xl cursor-pointer transition"
                    onClick={onNext}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default Pagination;