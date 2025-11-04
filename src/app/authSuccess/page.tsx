'use client'

import React, { useEffect } from 'react';
import { setAccessToken } from "@/utils/actions";
import { useUserProvider } from "@/providers/UserProvider";

const AuthSuccessPage = () => {
    const { setUser } = useUserProvider();

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                localStorage.setItem('token', token);
                await setAccessToken(token);

                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));

                    const user = {
                        id: payload.id,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        email: payload.email,
                        slug: payload.slug
                    };

                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);

                    window.location.href = '/';
                } catch (err) {
                    console.error('Error decoding token', err);
                    window.location.href = '/login';
                }

            } else {
                window.location.href = '/login';
            }
        })()
    }, [setUser]);

    return (
        <div>
            Logging you in...
        </div>
    );
};

export default AuthSuccessPage;
