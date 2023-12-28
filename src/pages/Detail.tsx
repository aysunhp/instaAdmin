import { useParams } from "react-router-dom";
import "./../assets/style/style.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Dashboard from "./Dashboard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneUserData } from "../redux/slices/userSlice";
import { RootState } from "../redux/store/store";
import { deletePost } from "../redux/slices/userSlice";

const Detail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchOneUserData(id));
  }, [user]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Dashboard />
          </Grid>
          <Grid item xs={10}>
            <div className="detail">
              {user && (
                <div className="container">
                  <div className="user-info">
                    <p className="name">
                      Name: {user.name} {user.surname}
                    </p>
                    <p className="email">Email: {user.email}</p>
                    <p className="username">Username: {user.userName}</p>
                    <p className="passwprd">Password: {user.password}</p>
                    <div className="bio">
                      {user.bio.info && (
                        <p className="info">Info :{user.bio.info}</p>
                      )}
                      {user.bio.country && (
                        <p className="country">Country: {user.bio.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="cards">
                {user &&
                  user.posts.map((item) => {
                    return (
                      <Card sx={{ width: 345 }} key={item._id}>
                        <CardMedia
                          sx={{ height: 300 }}
                          image={item.imgSRC}
                          title={item.title}
                        />
                        <CardContent>
                          <div className="content">
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {item.title}
                            </Typography>
                            <Button
                              size="small"
                              onClick={() => {
                                let obj: {
                                  userID: string;
                                  imgID: string;
                                } = {
                                  userID: user.id,
                                  imgID: item._id,
                                };
                                dispatch(deletePost(obj));
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Detail;
