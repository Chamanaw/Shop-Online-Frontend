import {
    Container,
    Typography,
    Stack,
    Avatar,
    TextField,
    Button,
} from "@mui/material";
import { useUserContext } from "../../context/userContext";
import axios from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DialogMassage from "./dialog";

function Setting() {
    const { user, setUser } = useUserContext();
    const [newUsername, setNewUsername] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [matchPass, setMatchPass] = useState<string>("")
    const [newEmail, setNewEmail] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [errorUsername, setErrorUsername] = useState<boolean>(false);
    const [errorPassword, setErrorPassword] = useState<boolean>(false);
    const [errorEmail, setErrorEmail] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChangeUsername = async () => {
        if (!newUsername) {
            setErrorUsername(true);
            return;
        }
        setErrorUsername(false);
        const result = await axios.patch("/api/user/updateusername", {
            newUsername: newUsername,
        });
        if (result.status === 200) {
            setUser({ ...user, user_name: newUsername });
            setOpenDialog(true);
            setTitle("Username");
        }
    };

    const handleChangePassword = async () => {
        if (!newPassword) {
            setErrorPassword(true);
            return;
        }
        if (newPassword === matchPass) {
            setErrorPassword(false);
            const result = await axios.patch("/api/user/updatepassword", {
                newPassword: newPassword,
            });
            if (result.status === 200) {
                setOpenDialog(true)
                setTitle("Password")
            }
        }
        else{
            setErrorPassword(true)
        }
    };
    const handelChangeEmail = async () => {
        if (!newEmail) {
            setErrorEmail(true);
            return;
        }
        setErrorEmail(false);
        const result = await axios.patch("/api/user/updateEmail", {
            newEmail: newEmail,
        });
        if (result.status === 200) {
            setUser({ ...user, email: newEmail });
            setOpenDialog(true);
            setTitle("Email");
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/login");
        }
    }, []);

    return (
        <Container maxWidth="xl" className="mt-28">
            <DialogMassage
                title={title}
                open={openDialog}
                setOpenDialog={setOpenDialog}
            />

            <Stack spacing={2} className="flex mb-24 md:flex-row">
                <Stack
                    spacing={2}
                    className="w-full md:w-[40rem]"
                    direction={"column"}
                    alignItems={"center"}
                >
                    <Avatar
                        src={`${axios.getUri() + user.image}`}
                        className="w-36 h-36 md:w-44 md:h-44"
                    />
                    <Stack>
                        <Typography variant="h6" className="text-center font-bold">
                            {user.user_name.toUpperCase()}
                        </Typography>
                        <Typography>
                            <span className="font-bold">Email:</span> {user.email}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack className="p-5 w-full pt-0 md:w-[45rem]" spacing={2}>
                    <Typography variant="h5" className="font-bold text-xl md:text-2xl">
                        Setting
                    </Typography>
                    <Stack direction={"column"} spacing={1.5}>
                        <Typography variant="h6" className="text-lg">
                            Username
                        </Typography>
                        <TextField
                            type="text"
                            placeholder="New username"
                            variant="outlined"
                            helperText="Can only be used a-z A-Z 0-9"
                            onChange={(e) =>
                                e.target.value.match(/\w{5,}/)
                                    ? setNewUsername(e.target.value)
                                    : setNewUsername("")
                            }
                            error={errorUsername}
                        />
                        <Button
                            variant="contained"
                            className="bg-[#002379] max-w-56 "
                            onClick={handleChangeUsername}
                        >
                            Confirm
                        </Button>
                    </Stack>
                    <Stack direction={"column"} spacing={1.5}>
                        <Typography variant="h6" className="text-lg">
                            Password
                        </Typography>
                        <TextField
                            type="Password"
                            placeholder="New password"
                            variant="outlined"
                            helperText="Can only be used a-z A-Z 0-9"
                            onChange={(e) =>
                                e.target.value.match(/\w{5,}/)
                                    ? setNewPassword(e.target.value)
                                    : setNewPassword("")
                            }
                            error={errorPassword}

                        />
                        <TextField
                            type="Password"
                            placeholder="password again"
                            variant="outlined"
                            helperText="Enter the passwords to match."
                            onChange={(e) => setMatchPass(e.target.value)}
                            error={errorPassword}
                        />
                        <Button
                            variant="contained"
                            className="bg-[#002379]  max-w-56"
                            onClick={handleChangePassword}
                        >
                            Confirm
                        </Button>
                    </Stack>
                    <Stack direction={"column"} spacing={1.5}>
                        <Typography variant="h6" className="text-lg">
                            Email
                        </Typography>
                        <TextField
                            type="email"
                            placeholder="New Email"
                            variant="outlined"
                            onChange={(e) =>
                                e.target.value.match(/\w{5,}\@\w{5,}/)
                                    ? setNewEmail(e.target.value)
                                    : setNewEmail("")
                            }
                            error={errorEmail}
                        />
                        <Button
                            variant="contained"
                            className="bg-[#002379]  max-w-56 "
                            onClick={handelChangeEmail}
                        >
                            Confirm
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
}

export default Setting;
