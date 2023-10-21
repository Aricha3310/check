import * as React from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Header from "./components/layouts/Header";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import LoginPage from "./components/layouts/Login/Login";
import FirstPage from "./Page/firstPage/firstPage";
import EdittablePage from "./Page/edittablePage/edittablePage";
import TablePage from "./Page/tablePage/tablePage";
import CalendarPage from "./Page/calendarPage/calendarPage";

import '../src/App.css';
import AddData from "./adddatatofirebase/adddatatofirebase";
import Calendar from "./Page/calendarPage/calendar";
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const theme = createTheme({
  spacing: 8,
  
  palette: {
    primary: {
      main: "#A476B7",
    },
    
    background: {
      default: "#ffffff",
    },
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {location.pathname == "/Login" ? (
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
          </Routes>
        ) : (
          <>
            <Header open={open} onDrawerOpen={handleDrawerOpen} />
            <Main open={open}>
              <DrawerHeader />
              <Routes>
                <Route path="/firstpage" element={<FirstPage />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/edittable" element={<EdittablePage />} />
                <Route path="/table" element={<TablePage />} />
                <Route path="/adddata" element={<AddData/>}/>

                <Route path="/" element={<Navigate to="/Login" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Main>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default App;
