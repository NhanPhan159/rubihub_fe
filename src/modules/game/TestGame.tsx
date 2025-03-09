import { Box, Modal } from "@mui/material"
import { FC } from "react"

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
const TestGame:FC<{isOpen: boolean,settingIsOpen: (value: boolean)=>void}> = ({isOpen,settingIsOpen})=>{
 return(
   <Modal
      open={isOpen}
      onClose={()=>settingIsOpen(false)}> 
      <Box sx={{ ...style, width: "70%", height: "50%",padding:10, textAlign: "center" }}>
        <h1>Quick test</h1>
      </Box>
   </Modal>
 ) 
}
export default TestGame;
