import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { ProfileIcon } from "../../utils/icon";

const style = {
  width: 400,
  backgroundColor: "white",
  color: "white",
  borderRadius: 10,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   console.log(value);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        toast.success(`Sign In Successful. Welcome ${res.user.email}`);

        handleClose();
      })
      .catch((error) => {
        toast.error(error.message);
        return;
      });
  };
  return (
    <div>
      <Button variant="" onClick={handleOpen}>
        <ProfileIcon />
        <span className="mx-1 ">Sign In</span>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "white",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 20,
                fontSize: 20,
                width: 400,
                paddingBottom: 15,
                backgroundColor: "white",
              }}
            >
              <span>OR</span>
              <Button>
                <GoogleButton
                  type="dark"
                  style={{ width: "90%", outline: "none", borderRadius: 5 }}
                  onClick={signInWithGoogle}
                />
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
