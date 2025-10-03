'use client';

import { createContext, useContext, useState } from "react";

export const SearchProviderContext = createContext(null);

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("");

    return (
        <SearchProviderContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchProviderContext.Provider>
    );
};

export const useSearchProvider = () => {
    const context = useContext(SearchProviderContext)
    if(!context){
        throw new Error("useSearchProvider not found")
    }
    return context
};

export default SearchProvider;