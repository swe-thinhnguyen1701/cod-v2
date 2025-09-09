import { create } from "zustand";
import type ArtifactEntity from "../entities/ArtifactEntity";

interface ArtifactStore {
  artifact: ArtifactEntity | null;
  selectedArtifactRank: string;
  setArtifacts: (artifacts: ArtifactEntity) => void;
  setArtifactRank: (rank: string) => void;
}

const useArtifactStore = create<ArtifactStore>((set) => ({
  artifact: null,
  selectedArtifactRank: "Legendary",
  setArtifacts: (artifact: ArtifactEntity) => set({ artifact }),
  setArtifactRank: (rank: string) => set({ selectedArtifactRank: rank })
}));

export default useArtifactStore;
