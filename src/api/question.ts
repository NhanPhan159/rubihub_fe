import { TCreateQuestion, TQuestion } from "../types";
import { axiosClient } from "../utils";

export const createQuestion = async (data: TCreateQuestion):Promise<string>=>{
  const res = await axiosClient.post<{message:string,data:Record<string,string>}>("/questions",data)
  return res.data.message
}

export const getAllQuestions = async ():Promise<TQuestion[]> => {
  const res = await axiosClient.get<{message:string,data:TQuestion[]}>("/questions")
  return res.data.data
}