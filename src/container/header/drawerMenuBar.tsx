import { Typography, Stack, Button, Avatar, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useCartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

interface Props {
  setOpenDrawer: any;
  user: string;
  image: string;
}

export default function DrawerMenuBar({ setOpenDrawer, user, image }: Props) {
  const { setCartItems } = useCartContext();
  const navigate = useNavigate();
  const {setUser } = useUserContext();
  return (
    <>
      <Box
        sx={{ width: 250 }}
        onClick={() => setOpenDrawer(true)}
        component={"div"}
      >
        <List>
          <ListItem>
            {!user ? (
              <Stack
                spacing={2}
                direction={"column"}
                className="w-full text-center "
              >
                <Link to="signup">
                  <Button
                    variant="contained"
                    className="bg-[rgb(255,76,59)] w-full"
                  >
                    Sign up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="text"
                    color="inherit"
                    startIcon={<PersonIcon />}
                    className="text-black font-bold border-solid border w-full rounded"
                  >
                    Log in
                  </Button>
                </Link>
              </Stack>
            ) : (
              <Stack
                spacing={2}
                direction={"column"}
                className="w-full text-center "
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                  <Avatar src={`${image}`} sx={{ width: 45, height: 45 }} />

                  <Typography className="font-bold text-black text-lg">
                    {user.toUpperCase()}
                  </Typography>
                </Stack>
                <Link to="/setting">
                  <Button
                    variant="text"
                    color="inherit"
                    startIcon={<SettingsIcon />}
                    className="text-black font-bold border-solid border w-full rounded"
                  >
                    Setting
                  </Button>
                </Link>
              
                  <Button
                    variant="text"
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    className="font-bold  w-full rounded bg-[rgb(255,76,59)] text-white"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      localStorage.removeItem("refreshToken");
                      setUser({ user_name: "", email: "", image: "" });
                      setCartItems([]);
                      navigate("/");
                    }}
                  >
                    Log out
                  </Button>
              
              </Stack>
            )}
          </ListItem>
        </List>
      </Box>
    </>
  );
}
