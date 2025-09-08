import React, { useImperativeHandle, useRef, useState } from "react";
import { FormProps } from "@/constants";

const Form: React.FC<FormProps> = ({ form, onAdd, initialValues, ref }) => {
    const formRef = useRef(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async () => {
        if (!formRef.current) return;

        const formData = new FormData(formRef.current);
        const dataObject = Object.fromEntries(formData.entries());
        const newErrors: Record<string, string> = {};

        form.forEach(({ name, label }) => {
            if (!dataObject[name]) {
                newErrors[name] = `${label} is required`;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            await onAdd(dataObject);
        }
    };

    const handleEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>)=> {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    useImperativeHandle(ref, () => ({
        submit: handleSubmit,
    }));

    return (
        <form ref={formRef} className="flex flex-col gap-4 p-3" onKeyDown={(e) => handleEnterSubmit(e)} onSubmit={handleSubmit}>
            {form.map(({name, label, type, placeholder}, i) => {
                return (
                    <div key={i} className="flex flex-col gap-4 p-2">
                        <label>{label}</label>
                        <input
                            placeholder={placeholder}
                            type={type}
                            name={name}
                            defaultValue={initialValues?.[name] || ""}
                            className="border border-gray-500 rounded-lg p-2"
                        />
                        {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
                    </div>
                )
            })}
        </form>
    );
};

export default Form;
