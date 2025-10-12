import {create} from "zustand";

interface CategoryStore {
    selectedCategory: string,
    setSelectedCategory: (category: string) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
    selectedCategory: "artifact",
    setSelectedCategory: (category: string) => set({ selectedCategory: category })
}));

export default useCategoryStore;