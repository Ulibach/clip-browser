import { GetTopClipsQueryVariables, OldClip } from "frontend/generated/graphql";
import create from "zustand";
type State = {
  modal: string;
  clip: OldClip | null;
  filters: GetTopClipsQueryVariables | {};
  channel: string;
  game: string;
  setRegisterModal: () => void;
  setLoginModal: () => void;
  closeModal: () => void;
  selectClip: (clip: OldClip) => void;
  setGoogleModal: () => void;
  setFilters: ({}: GetTopClipsQueryVariables) => void;
  selectChannel: (channel: string) => void;
  GameFilter: (game: string) => void;
}




const useStore = create<State>(set => ({
    modal: '',
    clip: null,
    filters: {period: 'day'},
    channel: '',
    game: '',
    setRegisterModal: () => set((state) => ({...state, modal: 'register'})),
    setLoginModal: () => set((state) => ({...state, modal: 'login'})),
    setGoogleModal: () => set((state) => ({...state, modal: 'google'})),
    closeModal: () => set(() => ({modal: ''})),
    selectClip: clip => set(state => ({...state,clip})),
    setFilters : f => set(state => ({...state, filters: f})),
    selectChannel: channel => set(state => ({...state, channel})),
    GameFilter: game => set(state => ({...state, game}))
  }))

  

export default useStore
  