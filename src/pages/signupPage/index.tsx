import { Box, Typography, Stack, TextField, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import axios from '../../api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


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
        const data = {
            username: username,
            password: password,
            email: email
        }

        try {
            await axios.post('/api/signup', data)
                .then((result) => {
                    if (result.data.status === "success") {
                        setOprnAlert(true)

                    }
                    else {
                        setMessageError('Already have this username.')
                        setError(true)
                        throw result.data
                    }
                })

        } catch (err) {
            return err
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

    return (
        <Box className='h-full p-5 mt-6'>
            <Stack direction='column' alignItems='center' className=''>
                <Stack className='p-2 w-1/3' direction='column' spacing={2}>
                    <Typography variant='h5' className='font-medium'>Sign up</Typography>
                    {error && <Typography className='text-red-500'>{messageError}</Typography>}
                    <form method='post' className='flex flex-col gap-2' onSubmit={handleSubmit}>
                        <TextField
                            variant='filled'
                            label='Username'
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
                            variant='filled'
                            label='Password'
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
                            variant='filled'
                            label='Password again'
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
                            variant='filled'
                            label='Email'
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                            error={error}
                            required
                        />
                        <Button variant='contained' className='bg-blue-600' size='large' type='submit'>Continue</Button>
                    </form>
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
                        <Button variant='outlined' sx={{ background: "rgb(37 99 235) !important",color:'white !important'}} onClick={handleClose}>Agree</Button>
                    </Stack>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default Signup
