import {ButtonProps} from "@/constants";

const typeStyles = {
    primary:
        "border border-blue-500 bg-blue-500 text-white rounded-md py-2 px-5 hover:cursor-pointer hover:opacity-70 transition duration-300",
    default:
        "border border-gray-300 rounded-md py-2 px-5 hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-300",
    dashed:
        "border border-dashed border-gray-300 rounded-md py-2 px-5 hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 transition duration-300",
    text: "rounded-md py-2 px-5 hover:cursor-pointer hover:bg-gray-100 transition duration-300",
    link: "text-blue-500 hover:cursor-pointer hover:opacity-70 transition duration-300",
};

const sizeStyles = {
    large: "px-4 py-3 text-lg",
    default: "px-3 py-2 text-md",
    small: "px-2 py-1 text-sm",
};

const Button = ({btnType = "default", size = "default",title = "Custom Button", onClick}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${typeStyles[btnType]} ${sizeStyles[size]}`}
        >
            {title}
        </button>
    );
};
export default Button;
