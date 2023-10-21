import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { firestore } from "../../utils/Firebase";
import { useEffect } from "react";
import moment from "moment";
import CircleIcon from "@mui/icons-material/Circle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  Box,
  Divider,
  FormControlLabel,
  Grid,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { margin } from "@mui/system";
import { useLocation } from "react-router-dom";
import { grey, purple } from "@mui/material/colors";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: purple[200],
    color: purple,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: grey[200],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 20,
  },
}));

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  no: number,
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const parentDocumentPath = "subject/001101[2]";
const subdocumentPath = "subject/001101[2]/date/2023-09-17 00:00:00.000";

export default function TablePage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [subJect, setSubJect] = React.useState<any[]>([]);
  const [student, setStudent] = React.useState<any>([]);
  const [subcol, setSubcol] = React.useState<any>([]);
  const [data, setData] = React.useState<any>([]);

  const location = useLocation();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  ////////////////get sub collection//////////////////

  const parentDocumentPath = `subject/${location?.state.SubjectID}`;

  // Fetch the documents from the subcollection
  const fetchSubcollection = async () => {
    try {
      getDocs(collection(firestore, parentDocumentPath, "date")).then(
        (item: any) => {
          const newdata = item.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setSubcol(newdata);
        }
      );
    } catch (error) {
      console.error("Error fetching subcollection documents:", error);
    }
  };

  const getStudent = async () => {
    await getDocs(collection(firestore, "student")).then((item: any) => {
      const studentdata = item.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudent(Object.assign(studentdata));
      setData(Object.assign(studentdata));
    });
  };
  const handleSearch = async (e: any) => {
    console.log(e);
    const value = e;
    if (e !== "") {
      // const filtered = await student?.filter((entry:any) => Object.values(entry).some((val => typeof val === "string" &&  val.includes(e)));
      const filtered = data?.filter((entry: any) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(value.toLowerCase())
        )
      );

      setStudent(filtered);
    } else {
      getStudent();
    }
  };
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
    // getdata();
    // getSubdocument();
    fetchSubcollection();
    getStudent();
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          รายละเอียด
        </Typography>
        <Divider />
      </Box>
      <Box marginTop={2}>
        <Box sx={{ display: "flex" }}>
          <Typography marginLeft={10}>
            รหัสวิชา : {location.state.SubjectID}
          </Typography>
          <Typography marginLeft={50}>
            รายวิชา : {location.state.subjectName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <Typography marginLeft={10}>
            ห้องเรียน : {location.state.classroom}
          </Typography>
          <Typography marginLeft={54}>
            เวลา : {location.state.classStart} - {location.state.endClass}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <Typography marginLeft={10} marginRight={10}>
            ต้องการเช็คชื่อจากภาพถ่ายหรือไม่?
          </Typography>
          <FormControlLabel
            control={<Android12Switch defaultChecked />}
            label=""
          />
        </Box>
      </Box>

      <Box marginTop={5}>
        <Box marginBottom={1}>
          <TextField
            label="search"
            variant="filled"
            size="small"
            color="primary"
            focused
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>no.</StyledTableCell>
                  <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
                    รหัสนิสิต
                  </StyledTableCell>
                  <StyledTableCell sx={{ whiteSpace: "nowrap" }}>
                    ชื่อ-นามสกุล
                  </StyledTableCell>
                  {subcol?.map((x: any) => (
                    <>
                      <StyledTableCell style={{ top: 57, rotate: "90" }}>
                        {moment(x?.id).format("DD/MM/YYYY")}
                      </StyledTableCell>
                    </>
                  ))}
                  {/* <StyledTableCell style={{ top: 57 }}>{x?.name}</StyledTableCell> */}
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {student.map((d: any, i: any) => (
                  <StyledTableRow key={i}>
                    {d.subject.find(
                      (subject: any) => subject === location.state.SubjectID
                    ) && (
                      <>
                        <StyledTableCell>{i + 1}</StyledTableCell>
                        <StyledTableCell style={{ top: 57 }}>
                          {d?.studentID}
                        </StyledTableCell>

                        <StyledTableCell style={{ top: 57 }}>
                          {d?.name}
                        </StyledTableCell>
                        {subcol?.map((x: any) => (
                          <>
                            <StyledTableCell style={{ top: 57, rotate: "90" }}>
                              {d?.studentID}
                              {/* {console.log(x?.student)} */}
                            </StyledTableCell>
                          </>
                        ))}
                        {/* {subJect?.map((x: any) => (
                          <>
                            {subcol?.map((g: any) => (
                              <>
                              {console.log(x.studentID)}
                                {Object.values(x?.studentID) == d?.studentID}
                                {Object.values(d?.studentID).find(
                                  (obj: any) => obj == g?.student
                                ) ? (
                                  <StyledTableCell
                                    style={{ top: 57 }}
                                    align="center"
                                  >
                                    
                                    <CircleIcon color="success" />
                                  </StyledTableCell>
                                ) : (
                                  <StyledTableCell
                                    style={{ top: 57 }}
                                    align="center"
                                  >
                                    
                                    <CircleIcon color="warning" />
                                  </StyledTableCell>
                                )}
                              </>
                            ))}
                          </>
                        ))} */}
                      </>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            </>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
