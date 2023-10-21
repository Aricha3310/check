import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, Button, Grid } from "@mui/material";
import {
  AccountCircle,
  LocalGroceryStoreOutlined,
  NotificationsActiveOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import NoBackpackTwoToneIcon from '@mui/icons-material/NoBackpackTwoTone';

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

type HeaderProp = {
  open: boolean;
  onDrawerOpen: () => void;
};

export default function Header({ open, onDrawerOpen }: HeaderProp) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    // setOpen(true);
    onDrawerOpen();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
          style={{ width: 50 }}
        />
        <Typography style={{ marginRight: 40 }}>แอปพลิเคชั่นเช็คชื่อ​(สำหรับอาจารย์)</Typography>

        
        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
          style={{ marginRight: 30 }}
          size="small"
          aria-label="show 4 new mails"
          color="inherit"
          startIcon={<HomeIcon />}
          onClick={() => {
            navigate("/firstpage");
          }}
          // onClick={() => {navigate("/adddata")}}
        >
          <Typography>หน้าหลัก</Typography>
        </Button>
        <Button
        style={{ marginRight: 20 }}
          size="small"
          aria-label="show 4 new mails"
          color="inherit"
          startIcon={<NoBackpackTwoToneIcon />}
          onClick={() => {
            navigate("/calendar");
          }}
          // onClick={() => {navigate("/adddata")}}
        >
          <Typography>งดการเรียนการสอน</Typography>
        </Button>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={() => {
              alert("คุณต้องการออกจากระบบ?");
              navigate("/Login");
            }}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
