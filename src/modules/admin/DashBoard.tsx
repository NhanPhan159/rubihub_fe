import { useEffect, useState } from "react";
import { getRequestsInWeek, getSummaryUserActivities } from "../../api";
import { BarChartCustom } from "./BarChartAdmin";
import { TableAdmin } from "./TableAdmin";
import { RequestsInWeek, SummaryUserActivities } from "../../types/admin";
import { Box, Stack } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const spreadStyle = {
  borderBottom: "solid #F4F5F6 2px",
  padding: "0 30px 20px 30px",
  display: "flex",
  alignItems: "center",
  gap: "30px"
};
const boxStyle = {
  borderRadius: "15px",
  backgroundColor: "white",
  boxShadow: "5px 5px 6px 1px #E8EBEC",
};
const DashBoard = () => {
  const [summaryUserActivities, setSummaryUserActivities] = useState<
    SummaryUserActivities[]
  >([]);
  const [requestsInWeek, setRequestsInWeek] = useState<RequestsInWeek[]>([]);
  const [selectedMonitoringDate,setSelectedMonitoringDate] = useState("")
  const currentDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserLogInDate(currentDate);
      await fetchRequestsInWeek(currentDate);
    };
    fetchData()
  }, []);

  const fetchUserLogInDate = async (date:Date) => {
    const data = await getSummaryUserActivities(date);
    setSummaryUserActivities(data);
  };
  const fetchRequestsInWeek = async (date:Date) => {
    const res = await getRequestsInWeek(date);
    setRequestsInWeek(res);
  };

  const setDetailByDate = async (index: number) => {
    const data = await getSummaryUserActivities(
      new Date(requestsInWeek[index].date.split("T")[0])
    );
    setSummaryUserActivities(data);
  };
  const setDateForDetailTable = (index:number) => {
    const date = new Date(requestsInWeek[index].date)
    setSelectedMonitoringDate(date.toDateString())
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "start",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
        <Box sx={{ padding: "20px 0", ...boxStyle }}>
          <Box sx={spreadStyle}>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              Monitoring activities chart
            </span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
              {/* @ts-expect-error: dont know the type of value */}
                <DatePicker onChange={(value)=>fetchRequestsInWeek(value["$d"])} label="Choose date in week" />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <BarChartCustom
            requests={requestsInWeek}
            onItemClick={(index)=>{
              setDetailByDate(index)
              setDateForDetailTable(index)
            }}
          />
        </Box>
      </Stack>
      <Box sx={{ padding: "20px 0", ...boxStyle }}>
        <Box sx={spreadStyle}>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>{selectedMonitoringDate ? "Detail user activities on - " + selectedMonitoringDate:"Detail table"}</span>
        </Box>
        <TableAdmin data={summaryUserActivities} />
      </Box>
    </Box>
  );
};

export default DashBoard;
