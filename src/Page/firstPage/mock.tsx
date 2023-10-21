import * as React from "react";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../utils/Firebase";

interface Subject {
  Id: string;
  Classroom: string;
  day: string;
  EndCheckin : string;
  EndTime: string;
  Location: [];
  Name: string;
  Pictest: boolean;
  StartCheckin: string;
  StartTime: string;
  Status: boolean;
  TimeCheckin: string;
}

export default function FirstPage() {
  const navigate = useNavigate();
  const [subJect, setSubJect] = useState<Array<Subject>>([]);
  const getdata = async () => {
    await getDocs(collection(firestore, "subject")).then((item: any) => {
      const newdata = item.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSubJect(Object.assign(newdata));
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant="h5" gutterBottom>
          รายวิชา
        </Typography>
        <Divider />
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Typography variant="h6">วันจันทร์</Typography>
        <br />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Grid container>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
            onClick={()=>{navigate("/table")}}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
            onClick={()=>{navigate("/adddata")}}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid xs={1}></Grid>
      <Grid xs={11}>
      <br />
      <br />
        <Typography variant="h6">วันอังคาร</Typography>
        <br />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Grid container>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid xs={1}></Grid>
      <Grid xs={11}>
      <br />
      <br />
        <Typography variant="h6">วันพุธ</Typography>
        <br />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Grid container>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid xs={1}></Grid>
      <Grid xs={11}>
      <br />
      <br />
        <Typography variant="h6">วันพฤหัสบดี</Typography>
        <br />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Grid container>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      <Grid xs={1}></Grid>
      <Grid xs={11}>
      <br />
      <br />
        <Typography variant="h6">วันศุกร์</Typography>
        <br />
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={11}>
        <Grid container>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              minWidth: 260,
              marginRight: 3,
              backgroundColor: "lavenderblush",
            }}
          >
            <CardContent>
              <Typography>รายวิชา :</Typography>
              <Typography>รหัสวิชา :</Typography>
              <Typography>ห้องเรียน :</Typography>
              <Typography>เวลา :</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
