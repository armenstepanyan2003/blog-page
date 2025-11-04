"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import Form from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import Link from "next/link";

const Register = () => {
    const router = useRouter();
    const [error, setError] = useState<{ [key: string]: string }>({});
    const registerRef = useRef<HTMLFormElement>(null);

    const handleOk = async () => {
        await registerRef.current?.submit();
    }

    const registerForm = [
        {
            placeholder: "Enter FirstName",
            name: "firstName",
            label: "FirstName",
            type: "text",
        },
        {
            placeholder: "Enter LatsName",
            name: "lastName",
            label: "LastName",
            type: "text",
        },
        {
            placeholder: "Enter Email",
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            placeholder: "Enter Password",
            name: "password",
            label: "Password",
            type: "password",
        },
    ];

    const handleRegister = async (formData) => {
        try {
            setError({})
            const res = await fetch(`http://localhost:5000/auth/register`, {
                method: "POST",
                headers:  { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/login");
            } else  {
                if (data.error?.details) {
                    const newErrors: { [key: string]: string } = {};
                    data.error.details.forEach((err: any) => {
                        newErrors[err.key] = err.message;
                    });
                    setError(newErrors);
            } else {
                    setError({ general: data.message || "Something went wrong" });
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">REGISTER HERE</h1>
                {Object.keys(error).length > 0 && (
                    <div className="text-red-600 mb-4 text-center space-y-1">
                        {Object.values(error).map((msg, i) => (
                            <p key={i}>{msg}</p>
                        ))}
                    </div>
                )}
                <Form
                    form={registerForm}
                    onAdd={handleRegister}
                    ref={registerRef}
                />
                <div className="flex justify-center mt-4">
                    <Button title="SIGN UP" onClick={handleOk}/>
                </div>
                <p className="text-center mt-4 text-gray-700">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;