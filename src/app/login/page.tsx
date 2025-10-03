"use client"

import React, { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";
import Form from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { setAccessToken } from "@/utils/actions";

const Login = () => {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const loginRef = useRef<HTMLFormElement>(null);

    const handleOk = async () => {
        await loginRef?.current?.submit();
    }

    const loginForm = [
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

    const handleLogin = async (formData) => {
        try {
            setError("");
            const res = await fetch(`http://localhost:5000/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                await setAccessToken(data.token);

                router.push("/posts");
            } else {
                if (data.error?.details) {
                    return {
                        error: data.error
                    };
                } else {
                    setError(data.error || "Something went wrong");
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">LOGIN</h1>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <Form form={loginForm} onAdd={handleLogin} ref={loginRef}/>
                <div className="flex justify-center mt-4">
                    <Button title="SIGN IN" onClick={handleOk}/>
                </div>
                <p className="text-center mt-4 text-gray-700">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-medium hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
