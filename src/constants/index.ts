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

export interface Blog {
    id?: string;
    title: string;
    author: string;
    description: string;
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
    onOk: (values: Partial<Blog>) => void;
    onCancel: () => void;
    blog: Blog;
}

export interface ModalProps {
    visible: boolean;
    title: string;
    onOk: () => void;
    onCancel: () => void;
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


export interface BlogPageProps {
    params: { id: string };
}