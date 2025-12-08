import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SavedToolsState {
  savedTools: string[];
  toggleSaved: (toolId: string) => void;
  isSaved: (toolId: string) => boolean;
  clearAll: () => void;
}

export const useSavedToolsStore = create<SavedToolsState>()(
  persist(
    (set, get) => ({
      savedTools: [],
      
      toggleSaved: (toolId: string) => {
        set((state) => {
          const isCurrentlySaved = state.savedTools.includes(toolId);
          if (isCurrentlySaved) {
            return {
              savedTools: state.savedTools.filter((id) => id !== toolId),
            };
          } else {
            return {
              savedTools: [...state.savedTools, toolId],
            };
          }
        });
      },
      
      isSaved: (toolId: string) => {
        return get().savedTools.includes(toolId);
      },
      
      clearAll: () => {
        set({ savedTools: [] });
      },
    }),
    {
      name: 'saved-tools-storage',
    }
  )
);
