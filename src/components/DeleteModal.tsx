import React from "react";
import Modal from "@/components/ui/Modal";
import {DeleteModalProps} from "@/constants";

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onOk, title,onCancel }) => {
    return (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel}  title={title}>
            <div className="p-2">
                <p>Are you sure?</p>
            </div>
        </Modal>
    );
};

export default DeleteModal;