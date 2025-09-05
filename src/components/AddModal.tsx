import React, {useRef} from 'react';
import Modal from "@/components/ui/Modal";
import Form from "@/components/ui/Form";

const AddModal = ({ visible, title, onCancel, onAdd }) => {
    const addFormRef = useRef<HTMLFormElement>(null);

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
            visible={visible}
            title={title}
            onCancel={onCancel}
            onOk={() => addFormRef?.current?.submit()}
        >
            <Form
                ref={addFormRef}
                form={blogForm}
                onAdd={onAdd}
            />
        </Modal>
    );
};

export default AddModal;