import React, {useRef, useState} from 'react';
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";
import Loading from "@/components/ui/Loading";
import {AddModalProps, FormField} from "@/constants";

const AddModal: React.FC<AddModalProps> = ({ visible, title, onCancel, onAdd }) => {
    const addFormRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const blogForm: FormField[] = [
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
        await addFormRef?.current?.submit();
        setIsLoading(false);
    }

    console.log(isLoading)

    return (
        <>
            <Modal
                visible={visible}
                title={title}
                onCancel={onCancel}
                onOk={handleOk}
                isLoading={isLoading}
            >
                <Form
                    ref={addFormRef}
                    form={blogForm}
                    onAdd={onAdd}
                />

                {isLoading && <Loading text="Adding..." size="small" />}
            </Modal>

        </>

    );
};

export default AddModal;
