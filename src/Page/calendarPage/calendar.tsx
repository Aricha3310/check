import React, { useEffect, useState } from "react";
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { firestore } from "../../utils/Firebase";
import { collection, doc, GeoPoint, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import { pink, purple, red } from "@mui/material/colors";
import { async } from "@firebase/util";
import moment from "moment";

interface Subject {
  SubjectID : string;
  classStart: string;
  classroom: string;
  day: string;
  endClass: string;
  location: GeoPoint;
  subjectName: string;
  teacher:[];
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  p: 4,
};

export default function Calendar() {
  const [subject, setSubject] = useState<Array<Subject>>([]);
  const [selectDay, setSelectDay] = useState<any>([]);
  const [selectName, setSelectName] = useState<Array<Subject>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<any>([]);
  const [datedb,setDatedb] =useState<any>()
  const [booleanValue, setBooleanValue] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const getdata = async () => {
    await getDocs(collection(firestore, "subject")).then((item: any) => {
      const newdata = item.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSubject(Object.assign(newdata));
    });
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let days = formatDate(selectInfo.start, {
      weekday: "long",
    });
    let dateformat = formatDate(selectInfo.start, {
      day: "numeric",
      year: "numeric",
      month: "long",
    });
    let dateformat0 = formatDate(selectInfo.start, {
     year: "numeric", 
      
      month: "numeric",
      day: "numeric",
    });
    setDatedb(moment(dateformat0).format("YYYY-MM-DD"))
    setSelectDay(subject.filter((z: any) => z.day === days));
    setDate(dateformat);
  };

  const getStatus = async () => {
    try {
      
      const parentDocumentRef = doc(firestore, 'subject', `001101[2]`);
      const subDocumentRef = doc(parentDocumentRef, 'date', '2023-10-02 00:00:00.000');

      const docSnapshot = await getDoc(subDocumentRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const initialBooleanValue = data.classStatus;
        setBooleanValue(initialBooleanValue);
        console.log(initialBooleanValue)
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  useEffect(() => {
    getdata();
    getStatus();
  }, []);

  const handleupdateClick = async (e:any) => {
    console.log(e)
    try {
      // Toggle the boolean value
      const updatedBooleanValue = !booleanValue;

      // Update the Firestore subcollection document with the new boolean value
      const parentDocumentRef = doc(firestore, 'subject', e.SubjectID);
      const subDocumentRef = doc(parentDocumentRef, 'date', `${datedb} 00:00:00.000`);

      await updateDoc(subDocumentRef, {
        classStatus: updatedBooleanValue,
      });
      
      setSelectDay(selectDay.map((x:any)=>{
        if(x.SubjectID === e.SubjectID){
          return {...x, classStatus:updatedBooleanValue} 
        }
        else{
          return x
        }
      }))
      setOpen(false);

      // Update the local state with the new boolean value
      setBooleanValue(updatedBooleanValue);
      console.log(updatedBooleanValue)
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleOpen = (SubjectID: string) => {
    setOpen(true);
    setSelectName(subject.filter((z: any) => z.SubjectID === SubjectID));
    console.log(date);
  };
  // const handleClose = () => {
  //   setOpen(false);
  //   console.log("first");
  // };

  return (
    <>
      <Grid container>
        <Grid item lg={9}>
          <div className="demo-app">
            {/* {this.renderSidebar()} */}
            <div className="demo-app-main">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateSelect}
              />
            </div>
          </div>
        </Grid>
        <Grid item lg={3}>
          <Box sx={{ marginLeft: "24px" }}>
            <Box sx={{ backgroundColor: "lightgray", padding: "20px" }}>
              <Typography>สถานะการเรียนการสอน</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircleIcon
                  sx={{
                    fontSize: "18px",
                    color: purple[50],
                    marginRight: "10px",
                  }}
                />
                <Typography>สถานะการเรียนการสอนปกติ</Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}
              >
                <CircleIcon
                  sx={{
                    fontSize: "18px",
                    color: red[300],
                    marginRight: "10px",
                  }}
                />

                <Typography>งดการเรียนการสอน</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: "lightgray",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <Typography>ตารางเรียน</Typography>

              {selectDay?.map((x: any, i: any) => (
                <>
                  <Card
                    sx={{
                      minWidth: 260,
                      marginRight: 3,
                      backgroundColor: x.classStatus ? red[300] : purple[50],
                      marginTop: 2,
                    }}
                    onClick={() => handleOpen(x.SubjectID)}

                    // handleNameSelect(x._id);
                  >
                    <CardContent>
                      <Typography>รายวิชา : {x?.subjectName}</Typography>
                      <Typography>รหัสวิชา : {x?.SubjectID}</Typography>
                      <Typography>ห้องเรียน : {x?.classroom}</Typography>
                      <Typography>
                        เวลา : {x?.classStart} - {x?.endClass} น.
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              ))}

              {selectName?.map((x: any, i: any) => (
                <>
                  <Modal open={open} onClose={() => setOpen(false)}>
                    <Box sx={style}>
                      <Typography>คุณต้องการเปลี่ยนสถานะการเรียนการสอนหรือไม่</Typography>
                      <Divider />
                      <Typography sx={{ marginTop: "10px" }}>
                        รายวิชา : {x?.subjectName}
                      </Typography>
                      <Typography>วันที่ : {moment(date).format("DD/MM/YYYY")}</Typography>

                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        marginTop={3}
                      >
                        <Button
                          color="error"
                          size="small"
                          variant="outlined"
                          onClick={() => setOpen(false)}
                        >
                          ไม่
                        </Button>
                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                          onClick={() => handleupdateClick(x)}
                        >
                          ใช่
                        </Button>
                      </Stack>
                    </Box>
                  </Modal>
                </>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
