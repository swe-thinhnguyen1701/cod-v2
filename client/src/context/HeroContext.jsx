/* eslint-disable react/prop-types */
import {createContext, useState} from "react";

export const HeroContext = createContext();

export function HeroProvider({children}) {
    const [heroSelected, setHeroSelected] = useState({});

    return (
        <HeroContext.Provider value={{heroSelected, setHeroSelected}}>
            {children}
        </HeroContext.Provider>
    )
}