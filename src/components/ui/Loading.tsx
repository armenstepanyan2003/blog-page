import {LoadingProps} from "@/constants";

const loadingSize = {
    small: "w-14 h-14",
    medium: "w-20 h-20",
    large: "w-32 h-32",
}

const Loading = ({ text, size = "small" }:LoadingProps) => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white/70 z-50">
            <div className={`${loadingSize[size]} border-4 border-blue-400 border-t-transparent rounded-full animate-spin`}></div>
            <div className="text-gray-700 font-medium">{text}</div>
        </div>
    );
};

export default Loading;