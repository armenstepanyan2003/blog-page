import React from "react";
import {useState} from "react";
import Modal from "@/components/ui/Modal";
import Loading from "@/components/ui/Loading";
import {DeleteModalProps} from "@/constants";

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onOk, title,onCancel }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleOk = async () => {
        setIsLoading(true);
        await onOk();
        setIsLoading(false);
    }

    return (
        <Modal visible={visible}  onOk={handleOk}  onCancel={onCancel}  title={title} isLoading={isLoading} >
            <div className="p-2">
                <p>Are you sure?</p>
            </div>

            {isLoading && <Loading text="Deleting..." size="small" />}
        </Modal>
    );
};

export default DeleteModal;
