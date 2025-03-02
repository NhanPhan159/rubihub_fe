export type TQuestion = {
  _id: string,
  createdAt: string,
  updatedAt: string,
  questionContent: string,
  answerA: string,
  answerB: string,
  answerC: string,
  answerD: string,
  rightAnswer: string
}

export type TCreateQuestion = Omit<TQuestion,"_id"|"createdAt"|"updatedAt">