import { useState } from "react";
import Link from "next/link";
import slugify from "slugify";

const placementStyle = {
    bottom: "top-full left-0 mt-2 ",
    bottomLeft: "top-full left-0 mt-2",
    bottomRight: "top-full right-0 mt-2",
    top: "bottom-full left-0 mb-2",
    topLeft: "bottom-full left-0 mb-2",
    topRight: "bottom-full right-0 mb-2",
}

const Dropdown = ({trigger = "hover", item1 = "", item2 = "", placement = "bottom", title = "DropDown", user}: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(prev => !prev);
    let additionalProps = {};

    const handleMouseEnter = () => {
        if (trigger === "hover") setOpen(true);
    };

    const handleMouseLeave = () => {
        if (trigger === "hover") setOpen(false);
    };

    if (trigger === "hover") {
        additionalProps = {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        }
    }

    return (
        <div
            className="relative"
            {...additionalProps}
        >
            <button
                onClick={trigger === "click" ? toggle : undefined}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
                {title}
            </button>

            {open && (
                <div className={`absolute w-40 bg-white border rounded shadow-md z-50 ${placementStyle[placement]}` }>
                    <Link
                        href={`/profile/${user.slug}`}
                        onClick={() => setOpen(false)}
                        className="px-4 py-2  cursor-pointer"
                    >
                        {item1}
                    </Link>
                    <div
                        className="px-4 py-2  cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        {item2}
                    </div>

                </div>
            )}
        </div>
    );
};

export default Dropdown;