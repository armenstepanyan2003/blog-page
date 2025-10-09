import { NextResponse } from "next/server";

type Params = {
    params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: Params) {
    const { id } = await params;

    try {
        const res = await fetch(`http://localhost:5000/posts/${id}`, {
            cache: "no-store",
            headers: req.headers
        });

        if (!res.ok) {
            return NextResponse.json(
                { message: `Blog with id ${id} not found` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch post", error },
            { status: 500 }
        );
    }
}
