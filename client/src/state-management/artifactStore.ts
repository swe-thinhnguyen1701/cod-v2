import { create } from "zustand";
import type ArtifactEntity from "../entities/ArtifactEntity";

interface ArtifactStore {
  artifact: ArtifactEntity | null;
  setArtifacts: (artifacts: ArtifactEntity) => void;
}

const useArtifactStore = create<ArtifactStore>((set) => ({
  artifact: null,
  setArtifacts: (artifact: ArtifactEntity) => set({ artifact }),
}));

export default useArtifactStore;
