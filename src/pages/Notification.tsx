import "./../assets/style/style.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { sendNotification } from "./../redux/slices/userSlice";

const Notification = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Dashboard />
          </Grid>
          <Grid item xs={10}>
            <section className="notification">
              <div className="container">
                <label htmlFor="notification">Add Message</label>
                <input
                  value={message}
                  className="notification"
                  id="notification"
                  type="text"
                  placeholder="Enter..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    let obj: {
                      id: string;
                      content: string;
                    } = {
                      id: uuidv4(),
                      content: message,
                    };
                    console.log(obj);
                    dispatch(sendNotification(obj));
                  }}
                >
                  Send
                </button>
              </div>
            </section>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Notification;
