import { create } from 'zustand'

type Store = {
  choice: string
  change: (ch: string) => void
}

type Auth = {
  id: string,
  setId: (ch: string) => void
}

type Fetch = {
  doFetch: number,
  setFetch: () => void
}

const useStore = create<Store>((set) => ({
  choice: "main",
  change: (ch: string) => set(() => ({ choice: ch })),
}))

const useAuth = create<Auth>((set) => ({
  id: "",
  setId: (ch: string) => set(() => ({ id: ch })),
}))

const useFetch = create<Fetch>((set) => ({
  doFetch: 1,
  setFetch: () => set((state) => ({ doFetch: state.doFetch * -1 })),
}))

export { useStore, useAuth, useFetch }
