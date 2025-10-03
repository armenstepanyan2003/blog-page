"use server";

import { cookies } from 'next/headers'

export const setAccessToken = async (value: string) => {
    const cookiesStore = await cookies();
    cookiesStore.set("token", value, {
        maxAge: 60 * 60 * 8
    });
};

export const deleteAccessToken = async () => {
    const cookiesStore = await cookies();
    cookiesStore.delete("token");
};

export const getAccessToken = async () => {
    const cookiesStore = await cookies();
    const cookie = cookiesStore.get("token");
    return cookie?.value;
};
