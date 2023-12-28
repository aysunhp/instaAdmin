import Button from "@mui/material/Button";
import { deleteUserData } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

type Props = {
  id: string;
};
const DeleteBtn = (params: Props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          console.log("gelen:", params.id);
          dispatch(deleteUserData(params.id));
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteBtn;
