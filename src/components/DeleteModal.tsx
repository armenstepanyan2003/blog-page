import { type FC } from 'react';
import type {DeleteModalProps} from "../../constants";
import Modal from "@/components/ui/Modal";

const DeleteModal: FC<DeleteModalProps> = ({ visible, onOk, title,onCancel }) => {
    return (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel}  title={title}>
            <div className="p-2">
                <p>Are you sure?</p>
            </div>
        </Modal>
    );
};

export default DeleteModal;