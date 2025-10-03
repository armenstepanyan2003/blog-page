"use client";

import AuthWrapper from "@/components/wrappers/AuthWrapper";
import { LayoutProps } from "@/constants";

const Layout = ({ children }: LayoutProps) => {
    return <AuthWrapper>{children}</AuthWrapper>;
};

export default Layout;
