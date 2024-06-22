import { create } from 'zustand'

type Store = {
  choice: string
  change: (ch: string) => void
}
type auth = {
  id : string,
  setId : (ch:string)=>void
}

const useStore = create<Store>((set) => ({
  choice: "main",
  change: (ch: string) => set(() => ({ choice: ch })),
}))
const useAuth = create<auth>((set) => ({
  id:"",
  setId: (ch: string) => set(() => ({ id: ch })),
}))

export {useStore , useAuth};
