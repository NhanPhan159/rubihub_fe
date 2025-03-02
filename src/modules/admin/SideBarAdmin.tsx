import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Path } from "../../constants";
import { IconsComponent } from "../icons";
import { Icons } from "../../enums";

type TRoutingSideBar = {
  nameLink: string;
  path: string;
  iconName: Icons;
  isActive: boolean;
};
const routingSideBar: TRoutingSideBar[] = [
  {
    nameLink: "Dashboard",
    path: Path.Admin.children.dashBoard,
    iconName: Icons.DASHBOARD,
    isActive: true,
  },
  {
    nameLink: "Question",
    path: Path.Admin.children.question,
    iconName: Icons.QUESTION,
    isActive: true,
  },
  {
    nameLink: "Back to app",
    path: Path.Root,
    iconName: Icons.APP,
    isActive: true
  }
];

const itemSideBarStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  color: "gray",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  gap: "15px",
  justifyContent: "start",
  alignItem: "center",
  "&:hover": {
    backgroundColor: "#E6D9FB",
    color: "black",
  },
};
const SideBarAdmin = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: "10px", width: "250px" }}>
      {routingSideBar.map((curr) => (
        <Box
          sx={itemSideBarStyle}
          component={"div"}
          onClick={() => navigate(curr.path)}
        >
          <IconsComponent name={curr.iconName}/>
          {curr.nameLink}
        </Box>
      ))}
    </Box>
  );
};

export default SideBarAdmin;
