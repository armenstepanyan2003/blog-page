import apiService from "@/services/api.service";
import Blogs from "@/components/Blogs";
import {Suspense} from "react";
import Loading from "@/components/ui/Loading";

export default async function Home() {
    const data = apiService.getNews();

    return (
        <Suspense fallback={<Loading text="Loading..." />}>
            <Blogs dataPromise={data}/>
        </Suspense>
    );
}
