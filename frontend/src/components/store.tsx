import { create } from 'zustand'

type Store = {
  choice: string
  change: (ch: string) => void
}

const useStore = create<Store>((set) => ({
  choice: "main",
  change: (ch: string) => set(() => ({ choice: ch })),
}))

export default useStore;
