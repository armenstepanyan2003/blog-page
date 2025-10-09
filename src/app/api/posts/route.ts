import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "2";
    const search = searchParams.get("search") || "";

    const res = await fetch(`http://localhost:5000/posts?page=${page}&limit=${limit}&search=${search}`, {
        headers: req.headers
    });
    const data = await res.json();

    return NextResponse.json(data);
}
