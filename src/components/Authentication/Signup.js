import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const handleSignUp = async () => {
    if (password !== confirmpassword) {
      toast.error("Password does not match");

      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success(`Sign Up Succesful. Welcome ${result.user.email}`);

      handleClose();
    } catch (error) {
      toast.error(error.message);

      return;
    }
  };
  return (
    <Box
      padding={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSignUp}
        style={{ backgroundColor: "orange" }}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
