import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../utils/Firebase";
import {
  collection,
  doc,
  GeoPoint,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { purple } from "@mui/material/colors";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

interface Subject {
  SubjectID: string;
  classStart: string;
  classroom: string;
  day: string;
  endClass: string;
  location: GeoPoint;
  subjectName: string;
  teacher: [];
}

interface Teacher {
  email: string;
  name: string;
  password: string;
  subject: [];
  uid: string;
}

export default function FirstPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Array<Subject>>([]);
  const [navigator, setNavigator] = useState<Array<Subject>>([]);
  const [teach, setTeach] = useState<Array<Teacher>>([]);

  const daydata = [
    { dayTh: "วันอาทิตย์", dayEn: "Sunday" },
    { dayTh: "วันจันทร์", dayEn: "Monday" },
    { dayTh: "วันอังคาร", dayEn: "Tuesday" },
    { dayTh: "วันพุธ", dayEn: "Wednesday" },
    { dayTh: "วันพฤหัส", dayEn: "Thursday" },
    { dayTh: "วันศุกร์", dayEn: "Friday" },
    { dayTh: "วันเสาร์", dayEn: "Saturday" },
  ];

  const getSubject = async () => {
    await getDocs(collection(firestore, "subject")).then((item: any) => {
      const newdata = item.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSubject(Object.assign(newdata));
    });
  };

  const getTeacher = async () => {
    const user = auth.currentUser;
    await getDocs(collection(firestore, "teacher")).then((item: any) => {
      const teacher = item.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTeach(Object.assign(teacher.filter((z: any) => z.uid === user?.uid)));
      setSubject(
        Object.assign(subject.filter((a: any) => a.teacher == teach[0].name))
      );
      // console.log(teacher.filter((z: any) => z.uid == user?.uid))
      // setSubject(Object.assign(newdata));
      // console.log(teach);
      // setSubject(subject.filter((a: any) => a.teacher == teach[0].name));
    });
  };

  useEffect(() => {
    getSubject();
    // getTeacher();
  }, []);

  return (
    <Grid container >
      <Grid xs={12}>
        <Typography variant="h5" gutterBottom>
          รายวิชาที่มีสอน
        </Typography>
        <Divider />
      </Grid>
      <br />
      <br />
      {/* {subject.find((obj:any)=> obj.subject === teach[0].subject) && (
      {teach.map((n) => ( */}
      {/* {subject.find((obj:any)=> obj.subject === teach[0].subject) && (
        <> */}
        {daydata?.map((e) => (
          <Grid xs={12}>
            {subject.find((obj: any) => obj.day == e.dayEn) && (
              <Typography variant="h6" marginTop="30px">
                {e?.dayTh}
              </Typography>
            )}

           
            <Grid xs={12}>
              <Grid container spacing={2} sx={{padding:'24px'}}>
                {subject?.map((x, i) => (
                  <>
                    {x?.day === e.dayEn && (
                      <Grid item lg={3} md={6} xs={12}>
                      <Card
                        sx={{
                          minWidth: "100%",
                          // marginRight: 3,
                          height:"200px",
                          backgroundColor: purple[50],
                          marginTop: 2,
                          // marginBlock:3,
                          marginLeft: 4,
                        }}
                        // onClick={handleNavigate}
                        onClick={() => {
                          navigate("/table", { state: x });
                        }}
                      >
                        <CardContent>
                          <Typography marginTop={1}>รายวิชา : {x?.subjectName}</Typography>
                          <Typography>รหัสวิชา : {x?.SubjectID}</Typography>
                          <Typography>ห้องเรียน : {x?.classroom}</Typography>
                          <Typography>
                            เวลา : {x?.classStart} - {x?.endClass} น.
                          </Typography>
                          <Box textAlign={'end'}>
                            <LocationOnIcon color="primary"  />
                            <LocalSeeIcon color="primary" />
                          </Box>
                        </CardContent>
                      </Card>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ))}
        {/* </>
        )} */}
    </Grid>
  );
}
