import React, { useRef, useState } from 'react';
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import Loading from "@/components/ui/Loading";
import { EditModalProps } from "@/constants";

const EditModalProfile: React.FC<EditModalProps> = ({ title, onEdit, visible, onCancel, data }) => {
    const editFormRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const blogForm = [
        {
            placeholder: "Enter firstName",
            name: "firstName",
            label: "FirstName",
            type: "text",
        },
        {
            placeholder: "Enter lastName",
            name: "lastName",
            label: "LastName",
            type: "text",
        },
        {
            placeholder: "Enter email",
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            placeholder: "Enter phone number",
            name: "phone",
            label: "Phone",
            type: "number",
        },
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
                initialValues={data}
            />

            {isLoading && <Loading text="Adding..." size="small" />}
        </Modal>
    );
};

export default EditModalProfile;
