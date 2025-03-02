import { Box, Modal, Stack, styled, TextareaAutosize as BaseTextareaAutosize } from "@mui/material";
import { FC, useState } from "react";
import { Button } from "../../components/ui";
import { createQuestion } from "../../api";
import { TCreateQuestion } from "../../types";
import { RadioButtonUnchecked } from "@mui/icons-material";
import Input from "../../components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import useStore from "./store";


type Props = {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width:100% !important; 
  height:99px !important;
  resize: none;
  box-sizing: border-box;
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? '#fff' : grey[200]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:focus {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
`,
);

export const CreateQuestionDialog: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { fetchAllQuestions } = useStore(state => state)
  const [question, setQuestion] = useState<TCreateQuestion>({
    questionContent: "",
    answerA: "",
    answerB: "",
    answerC: "",
    answerD: "",
    rightAnswer: ""
  })
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateQuestion>()

  const handleSubmitForm: SubmitHandler<TCreateQuestion> = async (data) => {
    const messages = await createQuestion(data)
    if (messages === "create success!!!") {
      await fetchAllQuestions()
      setIsOpen(false)
    }

  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box>
          <Box sx={{ ...style, width: 800, backgroundColor: "black", borderRadius: 5, color: "white", padding: 1 }}>
            <Stack direction={"row"} sx={{ marginBottom: 2 }} justifyContent={"space-between"} alignItems={'center'}>
              <h3 style={{ margin: 0 }}>Form question</h3>
              <span style={{ paddingRight: '12px' }}>X</span>
            </Stack>
            <Box>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <Box sx={{ padding: 3, background: "white", borderRadius: 5, color: "black" }}>
                  <TextareaAutosize {...register("questionContent", { required: true })} value={question.questionContent} onChange={(e) => setQuestion({ ...question, questionContent: e.target.value })} placeholder="Input a question" />
                  {errors.questionContent && <span>This is required field</span>}
                  <Box sx={{ color: "black", display: "grid", rowGap: 1 }}>
                    <Stack direction={'row'} justifyContent={"space-between"}>
                      <Stack direction={'row'} alignItems={'center'}>
                        <RadioButtonUnchecked></RadioButtonUnchecked>
                        <span style={{ marginLeft: 3 }}>A.</span>
                        <div>
                          <Input {...register("answerA", { required: true })} value={question.answerA} onChange={(e) => setQuestion({ ...question, answerA: e.target.value })} />
                          {errors.answerA && <span>This is required field</span>}
                        </div>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'}>
                        <RadioButtonUnchecked></RadioButtonUnchecked>
                        <span style={{ marginLeft: 3 }}>B.</span>
                        <div>
                          <Input {...register("answerB", { required: true })} value={question.answerB} onChange={(e) => setQuestion({ ...question, answerB: e.target.value })} />
                          {errors.answerB && <span>This is required field</span>}
                        </div>
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={"space-between"}>
                      <Stack direction={'row'} alignItems={'start'}>
                        <RadioButtonUnchecked></RadioButtonUnchecked>
                        <span style={{ marginLeft: 3 }}>C.</span>
                        <div>
                          <Input {...register("answerC", { required: true })} value={question.answerC} onChange={(e) => setQuestion({ ...question, answerC: e.target.value })} />
                          {errors.answerC && <span>This is required field</span>}
                        </div>
                      </Stack>
                      <Stack direction={'row'} alignItems={'center'}>
                        <RadioButtonUnchecked></RadioButtonUnchecked>
                        <span style={{ marginLeft: 3 }}>D.</span>
                        <Input {...register("answerD", { required: true })} value={question.answerD} onChange={(e) => setQuestion({ ...question, answerD: e.target.value })} />
                        {errors.answerD && <span>This is required field</span>}
                      </Stack>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                      <Stack direction={'row'} useFlexGap alignItems={'center'} gap={2}>
                        <span style={{ fontWeight: 600 }}>Which one is the right answer</span>
                        {/*@ts-expect-error: "onChange"*/}
                        <select onChange={e => setQuestion({ ...question, rightAnswer: e.target.value })} {...register("rightAnswer", { required: true })}>
                          <option value={question.answerA}>A</option>
                          <option value={question.answerB}>B</option>
                          <option value={question.answerC}>C</option>
                          <option value={question.answerD}>D</option>
                        </select>
                        {errors.rightAnswer && <span>This is required field</span>}
                      </Stack>
                      <Button type="submit" text="submit" />
                    </Stack>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateQuestionDialog;
