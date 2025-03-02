import { Box, Input, InputLabel, Modal } from "@mui/material";
import { FC, useState } from "react";
import { useGlobalStore } from "../../store";
import { Button } from "../../components/ui";
import { updateUserProfile } from "../../api";
import { UserDetails } from "../../types";

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
export const UpdateProfileModal: FC<Props> = ({ isOpen,setIsOpen }) => {
  const {
    value: {currentUser},
    actions: {fetchCurrentUser}
  } = useGlobalStore()
  const [userProfile,setUserProfile] = useState({...currentUser})

  const handleClickSave = async (data:Partial<UserDetails>) => {
    await updateUserProfile(data)
    await fetchCurrentUser()
    setIsOpen(false)
  }
  return ( 
    <div>
      <Modal
        open={isOpen}
        onClose={()=>setIsOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{userProfile?.firstName + " " + userProfile?.lastName}</h2>
          <p id="parent-modal-description">{userProfile?.email}</p>
          <Box sx={{display: "flex",gap: 5}}>
            <InputLabel>Name</InputLabel>
            <Input value={userProfile?.firstName} onChange={(e)=>setUserProfile({...userProfile,firstName: e.target.value})}></Input>
            <Input value={userProfile?.lastName} onChange={(e)=>setUserProfile({...userProfile,lastName: e.target.value})}></Input>
          </Box>
          <Box sx={{display: "flex",gap: 5}}>
            <InputLabel>Email</InputLabel>
            <Input value={userProfile?.email} onChange={(e)=>setUserProfile({...userProfile,email: e.target.value})}></Input>
          </Box>
          <Box sx={{display: "flex",gap: 5}}>
            <InputLabel>Username</InputLabel>
            <Input value={userProfile.userName} onChange={(e)=>setUserProfile({...userProfile,userName: e.target.value,})} />
          </Box>
          <Button onClick={()=>handleClickSave(userProfile)} text="Save"/>
        </Box>
      </Modal>
    </div>
   );
}
 
export default UpdateProfileModal;