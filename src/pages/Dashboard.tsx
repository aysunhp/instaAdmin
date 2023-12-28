
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import "./../assets/style/style.scss";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: "325px",
    backgroundColor: "#10002b",
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  return (
    <div
      className="container"
      style={{ backgroundColor: "#10002b", minHeight: "100vh", width: "325px" }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <Drawer variant="permanent" open={true}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                height: "75px",
                backgroundColor: "#10002b",
              }}
            >
              <h1 style={{ color: "white" }}>MyInsta</h1>
            </Toolbar>

            <Link
              to="/"
              style={{
                height: "50px",
                backgroundColor: "#5a189a",
                fontSize: "24px",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: "800",
                color: "white",
              }}
            >
              <List component="nav">Home</List>
            </Link>
            <Link
              to="/addUser"
              style={{
                height: "50px",
                backgroundColor: "#5a189a",
                fontSize: "24px",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: "800",
                color: "white",
              }}
            >
              <List component="nav">Add User</List>
            </Link>
            <Link
              to="/notification"
              style={{
                height: "50px",
                backgroundColor: "#5a189a",
                fontSize: "24px",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: "800",
                color: "white",
              }}
            >
              <List component="nav">Notification</List>
            </Link>
          </Drawer>
        </Box>
      </ThemeProvider>
    </div>
  );
}
