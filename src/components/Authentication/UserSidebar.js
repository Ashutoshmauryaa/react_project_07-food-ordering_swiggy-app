import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { RestaurantContext } from "../../utils/RestaurantContext";
import { useSelector } from "react-redux";

const container = {
  width: 350,
  paddingTop: 5,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace",
};
const profile = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "42%",
};
const picture = {
  width: 125,
  height: 125,
  cursor: "pointer",
  backgroundColor: "orange",
  objectFit: "contain",
};
const logout = {
  display: "flex",
  height: "8%",
  width: "90%",
  backgroundColor: "orange",
  alignItems: "center",
  justifycontents: "center",
  fontWeight: "bold",
  marginBottom: 2,
};

export default function UserSidebar() {
  const [state, setState] = useState({
    right: false,
  });

  const { user } = useContext(RestaurantContext);
  const cartItems = useSelector((store) => store.cart.items);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    toast.success("Logout Succesfull !");
    toggleDrawer();
  };
  //   console.log(user);
  //   const removeFromWatchlist = async (coin) => {
  //     const coinRef = doc(db, "watchlist", user.uid);
  //     try {
  //       await setDoc(
  //         coinRef,
  //         { coins: watchlist.filter((wish) => wish !== coin?.id) },
  //         { merge: true }
  //       );

  //       toast({
  //         open: true,
  //         message: `${coin.name} Removed from the Watchlist !`,
  //         type: "success",
  //       });
  //     } catch (error) {
  //       toast({
  //         open: true,
  //         message: error.message,
  //         type: "error",
  //       });
  //     }
  //   };
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 10,
              cursor: "pointer",
              objectFit: "contain",
              backgroundColor: "orange",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box sx={container}>
              <Box sx={profile}>
                <Avatar
                  sx={picture}
                  src={user.photoURL}
                  alt={user.email || user.displayName}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    // wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <Box
                  style={{
                    width: "90%",
                    height: 700,
                    borderRadius: 10,
                    padding: 15,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid black",
                    overflowX: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  <span style={{ fontSize: 20, fontWeight: "bold" }}>
                    Your Cart Item
                  </span>

                  {cartItems.length === 0 ? (
                    <div>
                      <p>Your Cart is empty</p>
                    </div>
                  ) : (
                    <div>
                      {cartItems.map((item, index) => (
                        <div className="py-2" key={index}>
                          <ul>
                            <span className="text-lg">
                              {index + 1}-{item.card?.info?.name}
                            </span>
                            <span>
                              - ₹
                              {item.card?.info?.price
                                ? item.card?.info?.price / 100
                                : item.card?.info?.defaultPrice / 100}
                            </span>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </Box>
                <Button variant="contained" sx={logout} onClick={logOut}>
                  Log Out
                </Button>
              </Box>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
