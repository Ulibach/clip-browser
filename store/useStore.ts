import create from "zustand";
type State = {
  clip: any;
  filters: {};
  channel: string;
  game: string;
  selectClip: (clip: any) => void;
  setFilters: ({}: any) => void;
  selectChannel: (channel: string) => void;
  GameFilter: (game: string) => void;
}




const useStore = create<State>(set => ({
    clip: null,
    filters: {period: 'day'},
    channel: '',
    game: '',
    selectClip: clip => set(state => ({...state,clip})),
    setFilters : f => set(state => ({...state, filters: f})),
    selectChannel: channel => set(state => ({...state, channel})),
    GameFilter: game => set(state => ({...state, game}))
  }))

  

export default useStore
  