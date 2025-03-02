import { create } from "zustand"
import { TQuestion } from "../../types"
import { getAllQuestions } from "../../api"

type State = {
  questions: TQuestion[]
}
type Action = {
  fetchAllQuestions: ()=>void
}

const useStore = create<State & Action>((set)=>({
  questions: [],
  fetchAllQuestions: async () => {
    const res = await getAllQuestions()
    set(()=>({questions: res}))
  }
}))

export default useStore
