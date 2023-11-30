import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill the fields");

      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Log In Successful. Welcome ${result.user.email}`);

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
        backgroundColor: "white",
      }}
    >
      <TextField
        // variant="standard"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        // variant="standard"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        onClick={handleLogin}
        style={{ backgroundColor: "orange" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
