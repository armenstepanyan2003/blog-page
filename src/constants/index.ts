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