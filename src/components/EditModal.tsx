import React, {useRef} from 'react';
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import {EditModalProps} from "@/constants";

const EditModal: React.FC<EditModalProps> = ({ title, onOk, visible, onCancel, blog }) => {
    const editFormRef = useRef<HTMLFormElement>(null);

    const blogForm = [
        {
            placeholder: "Enter title",
            name: "title",
            label: "Title",
            type: "text",
        },
        {
            placeholder: "Enter author",
            name: "author",
            label: "Author",
            type: "text",
        },
        {
            placeholder: "Enter description",
            name: "description",
            label: "Description",
            type: "text",
        }
    ];

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={() => editFormRef?.current?.submit()}
        >
            <Form
                ref={editFormRef}
                form={blogForm}
                onAdd={onOk}
                initialValues={blog}
            />
        </Modal>
    );
};

export default EditModal;
