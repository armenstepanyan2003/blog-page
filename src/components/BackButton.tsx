'use client'

import React from 'react';
import {useRouter} from "next/navigation";
import Button from "@/components/ui/Button";

const BackButton = () => {
    const router = useRouter();

    return (
        <div>
            <Button title="Back" btnType="primary" onClick={() => router.back()}/>
        </div>
    );
};

export default BackButton;
