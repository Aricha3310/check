import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { setDoc, doc, addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firestore } from "../utils/Firebase";

export default function AddData() {
  const [Id, setId] = useState("");
  const [Classroom, setClassroom] = useState("");
  const [Day, setDay] = useState("");
  const [EndCheckin, setEndCheckin] = useState("");
  const [EndTime, setEndTime] = useState("");
  const [Location, setLocation] = useState("");
  const [Name, setName] = useState("");
  const [Pictest, setPictest] = useState("");
  const [StartCheckin, setStartCheckin] = useState("");
  const [StartTime, setStartTime] = useState("");
  const [Status, setStatus] = useState("");
  const [TimeCheckin, setTimeCheckin] = useState("");


  const addData = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const docRef = await addDoc(collection(firestore ,"subject"),{
      _id: Id,
      classroom: Classroom,
      day: Day,
      end_check_in : EndCheckin,
      end_time: EndTime,
      location: Location,
      name: Name,
      pictest: Pictest,
      start_check_in: StartCheckin,
      start_time: StartTime,
      status: Status,
      time_check_in: TimeCheckin
     })
    try {
      const uploadToDatabase = (url: string) => {
          let docData = {
            Id: Id,
            Classroom: Classroom,
            day: Day,
            EndCheckin : EndCheckin,
            EndTime: EndTime,
            Location: Location,
            Name: Name,
            Pictest: Pictest,
            StartCheckin: StartCheckin,
            StartTime: StartTime,
            Status: Status,
            TimeCheckin: TimeCheckin
          };
          // const dataRef = addDoc(collection(exercisePosture,"ExercisePosture"),{data: data})
          const userRef = doc(firestore , "subject", docData.Id);
          setDoc(userRef, docData, { merge: true })
            .then(() => {
              console.log("successfully updated DB");
            })
            .catch((error) => {
              console.log("errrror");
            });
        };

      console.log("Complete");
    } catch (e) {
      console.error("error adding document: ", e);
    }
  };

  // const uploadToDatabase = (url: string) => {
  //   let docData = {
  //     Id: Id,
  //     Classroom: Classroom,
  //     day: Day,
  //     EndCheckin : EndCheckin,
  //     EndTime: EndTime,
  //     Location: Location,
  //     Name: Name,
  //     Pictest: Pictest,
  //     StartCheckin: StartCheckin,
  //     StartTime: StartTime,
  //     Status: Status,
  //     TimeCheckin: TimeCheckin
  //   };
  //   // const dataRef = addDoc(collection(exercisePosture,"ExercisePosture"),{data: data})
  //   const userRef = doc(db, "subject", docData.Id);
  //   setDoc(userRef, docData, { merge: true })
  //     .then(() => {
  //       console.log("successfully updated DB");
  //     })
  //     .catch((error) => {
  //       console.log("errrror");
  //     });
  // };

  return (
    <Box>
      <Typography>Add Data Subject</Typography>
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>id :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>class room :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setClassroom(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>day :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setDay(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>end_check_in :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setEndCheckin(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>end_time :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>location :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>name :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>pictest :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setPictest(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>start check in :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setStartCheckin(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>start time :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setStartTime(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>status :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>teacher :</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {}}
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems={"center"}>
        <Grid xs={3}>
          <></>
        </Grid>
        <Grid xs={2}>
          <>time check in:</>
        </Grid>
        <Grid xs={3}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            onChange={(e) => {
              setTimeCheckin(e.target.value);
            }}
          />
        </Grid>
      </Grid>
      <br />
      <Grid>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={addData}>
            Save
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
}
