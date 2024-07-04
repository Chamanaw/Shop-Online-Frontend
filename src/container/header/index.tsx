import {
  AppBar,
  Typography,
  Toolbar,
  Stack,
  IconButton,
  Button,
  Container,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Box,
  Drawer,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import Search from "../search";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "../../api";
import logo from "../../assets/images/logo/logo-App.png";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMenuBar from "./drawerMenuBar";


function Header() {
  const { cartItems, setCartItems } = useCartContext();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCart = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return navigate("/login");
    }
    return navigate("/cart");
  };

  return (
    <Box component={"div"}>
      <AppBar className="bg-white shadow-none border-b-2 border-gray-300 ">
        <Container maxWidth="xl">
          <Toolbar
            sx={{ justifyContent: "space-between" }}
            className="pl-0 pr-0"
          >
            <IconButton
              className="md:hidden"
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Box component={"div"} className="h-[80px] overflow-hidden ">
              <Link to="/">
                <Box
                  component="img"
                  className="mt-[-5px] h-[90px] md:h-[110px] md:mt-[-13px] min-h-[50px]"
                  sx={{
                    objectFit: "contain",
                  }}
                  src={logo}
                />
              </Link>
            </Box>

            <Search />

            <Stack
              direction="row"
              spacing={2}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              {!user.user_name ? (
                <Stack
                  spacing={2}
                  direction={"row"}
                  display={{ xs: "none", md: "block" }}
                >
                  <Link to="/login">
                    <Button
                      variant="text"
                      color="inherit"
                      startIcon={<PersonIcon />}
                      className="text-black text-[16px] font-bold"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to="signup">
                    <Button variant="contained" className="bg-[rgb(255,76,59)]">
                      Sign up
                    </Button>
                  </Link>
                </Stack>
              ) : (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  display={{ xs: "none", md: "block" }}
                >
                  <Button onClick={handleClick}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      spacing={1.5}
                    >
                      <Avatar
                        src={`${axios.getUri() + user.image}`}
                        sx={{ width: 36, height: 36 }}
                      />
                      <Typography className="font-bold text-black">
                        {user.user_name.toUpperCase()}
                      </Typography>
                    </Stack>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/setting");
                      }}
                      sx={{ width: "150px" }}
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      Setting
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        setUser({ user_name: "", email: "", image: "" });
                        setCartItems([]);
                        navigate("/");
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Stack>
              )}

              <Box component="div" className="border-l-2 border-gray-300">
                <Badge badgeContent={cartItems.length} color="error">
                  <IconButton className="ml-2 " onClick={handleClickCart}>
                    <ShoppingCartIcon sx={{ color: "black" }} />
                  </IconButton>
                </Badge>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <DrawerMenuBar 
          setOpenDrawer={setOpenDrawer} 
          user={user?user.user_name:""} 
          image={user?axios.getUri()+user.image:""} 
        />
      </Drawer>
    </Box>
  );
}

export default Header;
