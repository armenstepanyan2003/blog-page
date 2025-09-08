import React, {useRef, useState} from 'react';
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import {EditModalProps} from "@/constants";
import Loading from "@/components/ui/Loading";

const EditModal: React.FC<EditModalProps> = ({ title, onEdit, visible, onCancel, blog }) => {
    const editFormRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const handleOk = async () => {
        setIsLoading(true);
        await editFormRef?.current?.submit();
        setIsLoading(false);
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            isLoading={isLoading}
        >
            <Form
                ref={editFormRef}
                form={blogForm}
                onAdd={onEdit}
                initialValues={blog}
            />

            {isLoading && <Loading text="Adding..." size="small" />}
        </Modal>
    );
};

export default EditModal;
