import { Box, Typography, Stack, TextField, Button, InputAdornment,CircularProgress  } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import axios from '../../api';
import { useUserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

function Signin() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const [messageError,setMessageError] = useState<string>('')

    const { setUser } = useUserContext()
    const navigate = useNavigate()

    const getUser = async () => {
        const data = {
            username: username,
            password: password
        }
        try {
            await axios.post('/api/login', data)
                .then((result) => {
                    if (result.data.token) {
                        const token = result.data.token
                        localStorage.setItem('token', token)
                    }
                    else {
                        setMessageError('Username and password is incorrect')
                        setError(true)
                        setLoading(false)
                        throw result.data.status
                    }
                })
        } catch (err) {
            return err
        }

        const token = localStorage.getItem('token')
        try {
            await axios.post('/api/user', {}, { headers: { "authorization": 'Bearer ' + token } })
                .then((result) => {
                    setUser(result.data.user)
                    setLoading(false)
                    navigate('/')
                })
                .catch((err) => {
                    throw err
                })

        } catch (err) {
            return err
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (username && password) {
            getUser()
        }
        else{
            setMessageError('Please enter Username and password')
            setLoading(false)
            setError(true)
        }

    }

    return (
        <Box className='h-full p-5 mt-6'>
            <Stack direction='column' alignItems='center' className=''>
                <Stack className='p-2 w-1/3' direction='column' spacing={2}>
                    <form method='post' onSubmit={handleSubmit} className='flex flex-col gap-y-5'>
                        <Typography variant='h5' className='font-medium'>Log in</Typography>
                        {error && <Typography className='text-red-500'>{messageError}</Typography>}
                        <TextField
                            variant='filled'
                            label='Username'
                            type='text'
                            InputProps={{ startAdornment: <InputAdornment position='start'><PersonIcon /></InputAdornment> }}
                            onChange={e => setUsername(e.target.value)}
                            error={error}

                        />
                        <TextField
                            variant='filled'
                            label='Password'
                            type='password'
                            InputProps={{ startAdornment: <InputAdornment position='start'><LockOpenIcon /></InputAdornment> }}
                            onChange={e => setPassword(e.target.value)}
                            error={error}

                        />
                        <Button variant='contained' type='submit' className='bg-blue-600' size='large'>{loading?<CircularProgress/>:"Continue"}</Button>
                    </form>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Signin