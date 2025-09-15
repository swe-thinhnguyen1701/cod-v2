import { create } from "zustand";
import type {ArtifactEntity} from "../entities/ArtifactEntity";

interface ArtifactStore {
  artifact: ArtifactEntity | null;
  selectedArtifactRank: string | null;
  setArtifacts: (artifacts: ArtifactEntity) => void;
  setArtifactRank: (rank: string) => void;
  resetArtifactRank: () => void;
}

const useArtifactStore = create<ArtifactStore>((set) => ({
  artifact: null,
  selectedArtifactRank: null,
  setArtifacts: (artifact: ArtifactEntity) => set({ artifact }),
  setArtifactRank: (rank: string) => set({ selectedArtifactRank: rank }),
  resetArtifactRank: () => set({ selectedArtifactRank: null })
}));

export default useArtifactStore;
