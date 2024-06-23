import { create } from 'zustand'

type Store = {
  choice: string
  change: (ch: string) => void
}

type Auth = {
  id: Number,
  setId: (ch: string) => void
  name: string,
  setName: (ch: string) => void
  email: string,
  setEmail: (ch: string) => void
  password: string,
  setPassword: (ch: string) => void
  
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
  id: 0,
  setId: (ch: string) => set(() => ({ id: ch })),
  name: "",
  setName: (ch: string) => set(() => ({ name: ch })),
  email: "",
  setEmail: (ch: string) => set(() => ({ email: ch })),
  password: "",
  setPassword: (ch: string) => set(() => ({ password: ch })),
}))

const useFetch = create<Fetch>((set) => ({
  doFetch: 1,
  setFetch: () => set((state) => ({ doFetch: state.doFetch * -1 })),
}))

export { useStore, useAuth, useFetch }
