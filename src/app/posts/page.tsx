import { Suspense } from "react";
import Blogs from "@/components/Blogs";
import Loading from "@/components/ui/Loading";

export default async function Home() {
    return (
        <Suspense fallback={<Loading text="Loading..."/>}>
            <Blogs />
        </Suspense>
    );
};
