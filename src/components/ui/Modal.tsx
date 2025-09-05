import * as React from "react";
import {createPortal} from "react-dom";

const Modal = ({ visible, title, onOk, onCancel, children }) => {

    return (
        <>
            {visible && (
                createPortal(
                    <div>
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 md:mx-0 overflow-hidden transform transition-transform duration-300 scale-100">
                                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                                    <button onClick={onCancel}>X</button>
                                </div>
                                <div className="p-6 text-gray-700">
                                    {children}
                                </div>
                                <div className="flex justify-end gap-4 p-5 border-t border-gray-200">
                                    <button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                                    <button onClick={onOk} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>, document.body
                )
            )}
        </>
    );
};

export default Modal;