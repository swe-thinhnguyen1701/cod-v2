import { useState, useMemo } from "react";
import type { HeroBriefEntity } from "../entities/HeroEntity";
import type { ArtifactBriefEntity } from "../entities/ArtifactEntity";
import type { PetBriefEntity } from "../entities/PetEntity";

const useSearch = (data: HeroBriefEntity[] | ArtifactBriefEntity[] | PetBriefEntity[]) => {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        if(!query) return [];
        
        return data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }, [query, data]);

    return {query, setQuery, results};
} 

export default useSearch;