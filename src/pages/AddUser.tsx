import React, { useState } from "react";
import { User, postUserData } from "./../redux/slices/userSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "./Dashboard";

const AddUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Dashboard />
          </Grid>
          <Grid item xs={10}>
            <div className="add-user-section">
              <div className="container">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter surname"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                />
                <input
                  type="text"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="text"
                  value={userName}
                  placeholder="Enter user name"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  value={pass}
                  placeholder="Enter password"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    let obj: User = {
                      id: uuidv4(),
                      name: name,
                      surname: surname,
                      email: email,
                      userName: userName,
                      password: pass,
                      isPublic: true,
                      posts: [],
                      follower: [],
                      following: [],
                      blockList: [],
                      stories: [],
                      notifications: [],
                      bio: {
                        info: "",
                        country: "",
                      },
                    };
                    console.log(obj);
                    dispatch(postUserData(obj));

                    setName("");
                    setSurname("");
                    setPass("");
                    setEmail("");
                    setUserName("");
                  }}
                >
                  Add User
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddUser;
