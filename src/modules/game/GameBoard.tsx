import { Avatar, Box,  Modal } from "@mui/material";
import { FC } from "react";
import games from "../../constants/game";
import { useGlobalStore } from "../../store";


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

export const GameBoard: FC<Props> = ({ isOpen,setIsOpen }) => {
  const {actions:{setIsGameModal}} = useGlobalStore(state=>state)
  return ( 
    <div>
      <Modal
        open={isOpen}
        onClose={()=>setIsOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
          <Box sx={{ ...style, width: "70%", height: "50%",padding:10, textAlign: "center" }}>
           <h1>It's time to play</h1>
           <Box sx={{
             display: 'flex', 
             gap: 5,
           }}>
              {games.map(game=>(
                <Box sx={{
                  display: "flex", 
                  flexDirection:"column",
                  alignItems:"center",
                  padding:1,
                  cursor: "pointer",
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#CCCCCC',
                  }
                }}
                onClick={()=>{
                  setIsGameModal(true)
                  setIsOpen(false)
                }}
                >
                  <Avatar alt="Remy Sharp" src={game.image} />
                  <p>{game.title}</p>
                </Box>
              ))} 
           </Box>
        </Box>
      </Modal>
    </div>
   );
}
 
export default GameBoard; 
