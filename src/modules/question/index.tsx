import { Box } from "@mui/material"
import {Button} from "../../components/ui/Button"
import CreateQuestionDialog from "./CreateQuestionDialog"
import { useState } from "react"
import QuestionTable from "./QuestionTable"
export const Question = () => {
  const [isOpen,setIsOpen] = useState(false)
  return(
    <>
      <Box>
        <Button text={"Create question"} onClick={()=>setIsOpen(true)}/>
        <CreateQuestionDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
        <QuestionTable/>
      </Box>
    </>
  )
}
