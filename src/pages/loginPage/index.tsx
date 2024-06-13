import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
    Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgLogin from "../../assets/images/login/bg-login.jpg";
import logo from "../../assets/images/logo/detailed-click-collect-sign_23-2148779338.jpg";
import axios from "../../api";

function Signin() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>("");
    const navigate = useNavigate();

    const login = async () => {
        const data = { username: username, password: password, };
        try {
            const result = await axios.post("/api/login", data);
            if (result.data.accessToken) {
                localStorage.setItem("accessToken", result.data.accessToken);
                localStorage.setItem("refreshToken", result.data.refreshToken);
                navigate("/");
                return;
            }
        } catch (err: any) {
            if (err.response.status === 404) {
                setMessageError("Username and password is incorrect");
                setError(true);
                setLoading(false);
                return;
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (username && password) {
            login();
        }
        else {
            setMessageError("Please enter Username and password");
            setLoading(false);
            setError(true);
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) { navigate("/") };
    }, []);

    return (
        <Stack direction={"row"} sx={{ height: "100vh",}} className="">
            <Box component={"div"} className="w-full" display={{xs:"none",md:"block"}}>
                <Box
                    component={"img"}
                    src={bgLogin}
                    className="w-full object-cover h-screen"
                />
            </Box>

            <Box className="p-5 w-full flex flex-col justify-center ">
                <Stack direction="column" alignItems="center" spacing={1}>
                    <Box component={"img"} src={logo} className="w-52 mb-[-35px]" />
                    <Stack className="p-2 w-full sm:w-[35rem]" direction="column" spacing={2}>
                        <form
                            method="post"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-y-5"
                        >
                            <Typography variant="h5" className="font-medium">
                                Log in
                            </Typography>
                            {error && (
                                <Typography className="text-red-500">{messageError}</Typography>
                            )}
                            <TextField
                                variant="outlined"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setUsername(e.target.value)}
                                error={error}
                                placeholder="Username"
                            />
                            <TextField
                                variant="outlined"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOpenIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                                error={error}
                                placeholder="Password"
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                className="bg-[#ff4c3b]"
                                size="large"
                            >
                                {loading ? (
                                    <CircularProgress size={30} color="inherit" />
                                ) : (
                                    "Continue"
                                )}
                            </Button>
                        </form>

                        <Typography>
                            You don't have any account yet?{" "}
                            <span className="font-bold ml-1">
                                {" "}
                                <Link to={"/signup"}> Sign up </Link>
                            </span>
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    );
}

export default Signin;
