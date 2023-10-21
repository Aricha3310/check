import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";
import {
  LocalMallOutlined,
  ErrorOutlineOutlined,
  InterestsOutlined,
} from "@mui/icons-material";
import { Stack } from "@mui/system";
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();

  const handleDrawerClose = () => {
    // setOpen(false);
    onDrawerClose();
  };

  const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) =>
        `${props.className} ${isActive ? props.activeClassname : ""}`
      }
    >
      {props.children}
    </NavLink>
  ));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Stack direction="row" alignItems="end">
          <img
            src={`${process.env.PUBLIC_URL}/images/Gymm.png`}
            style={{ height: 50, width: 50 }}
          />
          <Typography variant="h6" >Every Gym</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </Stack>
      </DrawerHeader>
      <Divider />
      <List>
        {/* <ListItem
          disablePadding
          component={MyNavLink}
          to="/products"
          activeClassname="Mui-selected"
          exact
        >
          <ListItemButton>
            <ListItemIcon>{<LocalMallOutlined />}</ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem> */}

        <ListItem
          disablePadding
          component={MyNavLink}
          to="/PhysicalActivity"
          activeClassname="Mui-selected"
          exact
        >
          <ListItemButton>
            <ListItemIcon>{<InsertChartOutlinedIcon />}</ListItemIcon>
            <ListItemText primary="Physical Activity" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          component={MyNavLink}
          to="/modes"
          activeClassname="Mui-selected"
          exact
        >
          <ListItemButton>
            <ListItemIcon>{<FitnessCenterOutlinedIcon />}</ListItemIcon>
            <ListItemText primary="Manage Modes" />
          </ListItemButton>
        </ListItem>

        {/* <ListItem
          disablePadding
          component={MyNavLink}
          to="/AddExercise"
          activeClassname="Mui-selected"
          exact
        >
          <ListItemButton>
            <ListItemIcon>{<LocalMallOutlined />}</ListItemIcon>
            <ListItemText primary="Add Exercise" />
          </ListItemButton>
        </ListItem> */}

        <ListItem
          disablePadding
          component={MyNavLink}
          to="/ManageAccount"
          activeClassname="Mui-selected"
          exact
        >
          <ListItemButton>
            <ListItemIcon>{<ManageSearchOutlinedIcon />}</ListItemIcon>
            <ListItemText primary="Manage Account" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
}
