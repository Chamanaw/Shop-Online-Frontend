import { Box, Typography, Stack, TextField, Button, Dialog, DialogActions, DialogTitle, InputAdornment } from '@mui/material'
import axios from '../../api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import bgLogin from '../../assets/images/login/bg-login.jpg'

function Signup() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [matchPassword, setMatchPassword] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')
    const [openAlert, setOprnAlert] = useState<boolean>(false)

    const navigate = useNavigate()

    const signup = async () => {

        const data = { username: username, password: password, email: email }
        const result = await axios.post('/api/signup', data)

        if (result.status === 200) {
            return setOprnAlert(true)
        }
        else {
            setMessageError('Already have this username.')
            setError(true)
            return
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const empty = (username && password && email) ? true : false
        if (!matchPassword && empty) {
            signup()
            setError(false)
        }
    }

    const handleClose = () => {
        setOprnAlert(false)
        navigate('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) { navigate('/') }
    })

    return (

        <Stack direction={'row'} sx={{ height: "100vh" }}>
            <Box component={'div'} className='w-full' display={{xs:"none",md:"block"}}>
                <Box
                    component={'img'}
                    src={bgLogin}
                    className='w-full object-cover h-screen'
                />
            </Box>
            <Box className='p-5 w-full flex flex-col justify-center '>
                <Stack direction='column' alignItems='center' >
                    <Stack className='p-2 w-full sm:w-[35rem]' direction='column' spacing={2}>
                        <Typography variant='h5' className='font-medium'>Sign up</Typography>
                        {error && <Typography className='text-red-500'>{messageError}</Typography>}
                        <form method='post' className='flex flex-col gap-2' onSubmit={handleSubmit}>
                            <TextField
                                variant='outlined'
                                placeholder='Username'
                                InputProps={{ startAdornment: <InputAdornment position='start'><PersonIcon /></InputAdornment> }}
                                helperText='Can only be used a-z A-Z 0-9'
                                onChange={e => {
                                    if (e.target.value.match(/\w/)) {
                                        setUsername(e.target.value)
                                    }
                                }}
                                error={error}
                                required
                            />
                            <TextField
                                variant='outlined'
                                placeholder='Password'
                                InputProps={{ startAdornment: <InputAdornment position='start'><LockOpenIcon /></InputAdornment> }}
                                type='password'
                                helperText='Can only be used a-z A-Z 0-9'
                                onChange={e => {
                                    if (e.target.value.match(/\w/)) {
                                        setPassword(e.target.value)
                                    }
                                }}
                                error={error}
                                required
                            />
                            <TextField
                                variant='outlined'
                                placeholder='Password again'
                                InputProps={{ startAdornment: <InputAdornment position='start'><LockOpenIcon /></InputAdornment> }}
                                type='password'
                                helperText={(!matchPassword) ? "Enter the passwords to match." : "passwords not match."}
                                onBlur={e => {
                                    if (e.target.value === password) {
                                        setMatchPassword(false)
                                    }
                                    else {
                                        setMatchPassword(true)
                                    }
                                }}
                                error={matchPassword || error}
                                required
                            />
                            <TextField
                                variant='outlined'
                                placeholder='Email'
                                InputProps={{ startAdornment: <InputAdornment position='start'><EmailIcon /></InputAdornment> }}
                                type='email'
                                onChange={e => setEmail(e.target.value)}
                                error={error}
                                required
                            />
                            <Button variant='contained' className='bg-[#ff4c3b]' size='large' type='submit'>Continue</Button>
                        </form>
                        <Typography>I already have account? <span className='font-bold'><Link to={'/login'}>Log in</Link></span></Typography>
                    </Stack>
                </Stack>

                <Dialog
                    open={openAlert}
                    maxWidth={'xs'}
                    fullWidth
                >
                    <DialogTitle>
                        <Stack direction={'column'} alignItems={'center'} spacing={0.5} justifyContent={'center'}>
                            <CheckCircleOutlineIcon sx={{ color: 'green', fontSize: '4rem' }} />
                            <Typography variant='h6' sx={{ fontWeight: 'medium' }}>Sign up successful</Typography>
                        </Stack>

                    </DialogTitle>
                    <DialogActions>
                        <Stack direction={'column'} alignItems={"center"} component={'div'} sx={{ width: "100%" }} >
                            <Button variant='outlined' sx={{ background: "rgb(37 99 235) !important", color: 'white !important' }} onClick={handleClose}>Agree</Button>
                        </Stack>
                    </DialogActions>
                </Dialog>

            </Box>
        </Stack>
    )
}

export default Signup
