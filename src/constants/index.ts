import { ReactNode } from "react";

export interface ButtonProps {
    btnType?: "primary" | "default" | "dashed" | "text" | "link";
    size?: "large" | "default" | "small";
    title?: string;
    onClick?: () => void;
}

export interface LoadingProps {
    text?: string;
    size?: 'small' | 'medium' | 'large';
    indicator?: React.ReactNode;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface Blog {
    id?: string;
    title: string;
    description: string;
    tags: Tag[];
    userId: number;
    user: {
        firstName: string;
    };
    post_likes_count: number;
    isFollowing: boolean;
    isLiked: number;
    updateFollowings: (userId: number, following: boolean) => void;
}

export interface BlogProps {
    blog: Blog;
}

export interface AddModalProps {
    visible: boolean;
    title: string;
    onCancel: () => void;
    onAdd: (values: Omit<Blog, 'id'>) => void;
}

export interface DeleteModalProps {
    visible: boolean;
    title: string;
    onOk: () => void;
    onCancel: () => void;
}

export interface EditModalProps {
    title: string;
    visible: boolean;
    onEdit: (values: Blog) => Promise<void>;
    onCancel: () => void;
    blog: Blog;
}

export interface ModalProps {
    visible: boolean;
    title: string;
    onOk: () => void;
    onCancel: () => void;
    isLoading: boolean;
    children: React.ReactNode;
}

export interface FormField {
    name: keyof Blog;
    label: string;
    type: string;
    placeholder?: string;
}

export interface FormProps {
    form: FormField[];
    onAdd: (values: Blog) => void;
    initialValues?: Partial<Blog>;
    ref: React.RefObject<HTMLFormElement | null>;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}


export interface BlogPageProps {
    params: { id: string; title: string };
}

export interface AuthWrapperProps {
    children: ReactNode;
}

export interface LayoutProps {
    children: ReactNode;
}

export interface Post {
    id: number | string;
    title: string;
    description: string;
    user: User;
}

export interface AuthorResponse {
    author: {
        name: string;
        lastname: string;
        email: string;
        phone?: string;
    };
    posts: Post[];
}
