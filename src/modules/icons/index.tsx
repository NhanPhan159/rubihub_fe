import { FC } from "react";
import { Icons } from "../../enums";
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import AppsIcon from '@mui/icons-material/Apps';
import { TNameIcons } from "../../types/icons";

export const IconsComponent:FC<TNameIcons> = (props) => {
    switch (props.name) {
        case Icons.DASHBOARD:
          return <DashboardRoundedIcon/>
        case Icons.QUESTION:
          return <QuizRoundedIcon/>
        case Icons.APP:
          return <AppsIcon/>
        default:
          return <></> 
      }
}