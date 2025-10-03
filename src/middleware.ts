import { NextResponse, NextRequest } from 'next/server'
import { getAccessToken } from "@/utils/actions";

export async function middleware(request: NextRequest) {
    const token = await getAccessToken();
    if (!token) {
        return NextResponse.redirect(
            new URL(`/login`, request.nextUrl)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/posts/:path*',
}
