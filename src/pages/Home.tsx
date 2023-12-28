import "./../assets/style/style.scss";
import UserTable from "../components/UsersTable";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Dashboard />
          </Grid>
          <Grid item xs={10}>
            <section className="users">
              <header>
                <input type="text" placeholder="Search ..." />
              </header>
              <div className="container">
                <UserTable />
              </div>
            </section>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
