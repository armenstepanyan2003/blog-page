import Image from "next/image";

const EmptyData = ({src = "/assets/emptyData.png", label = "No Data"}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-sky-50 to-sky-100 p-6">
            <Image
                src={src}
                alt="Empty Data"
                width={112}
                height={112}
                className="w-28 h-auto"
            />
            <p>{label}</p>
        </div>
    );
};

export default EmptyData;
