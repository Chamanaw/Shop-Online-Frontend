import { Container, Typography, Stack, Avatar,TextField,Button } from '@mui/material'
import { useUserContext } from '../../context/userContext';
import axios from '../../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Setting() {

    const {user} = useUserContext()
    const accessToken = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    useEffect(()=>{
        if(!accessToken){
            navigate('/login')
        }
    },[])

    return (
        <Container maxWidth='xl' className='mt-28'>
            <Stack spacing={2} className='flex mb-24 md:flex-row' >
                <Stack spacing={2} className='w-full md:w-[40rem]' direction={'column'} alignItems={'center'} >
                    <Avatar src={`${axios.getUri()+user.image}`} className='w-36 h-36 md:w-44 md:h-44'/>
                    <Stack>
                        <Typography variant='h6' className='text-center font-bold'>{user.user_name.toUpperCase()}</Typography>
                        <Typography><span className='font-bold'>Email:</span> {user.email}</Typography>
                    </Stack>
                </Stack>
                <Stack className='p-5 w-full pt-0 md:w-[45rem]' spacing={2} >
                    <Typography variant='h5' className='font-bold text-xl md:text-2xl'>Setting</Typography>
                    <Stack direction={'column'} spacing={1.5}>
                        <Typography variant='h6' className='text-lg'>Username</Typography>
                        <TextField 
                            type='text' 
                            placeholder='New username' 
                            variant='outlined'
                            helperText='Can only be used a-z A-Z 0-9'
                        />
                        <Button variant='contained' className='bg-[#002379] max-w-56 '>Confirm</Button>
                    </Stack>
                    <Stack direction={'column'} spacing={1.5}>
                        <Typography variant='h6' className='text-lg'>Password</Typography>
                        <TextField 
                            type='Password' 
                            placeholder='New password' 
                            variant='outlined'
                            helperText='Can only be used a-z A-Z 0-9'
                        />
                        <TextField 
                            type='Password' 
                            placeholder='password again' 
                            variant='outlined'
                            helperText='Enter the passwords to match.'  
                        />
                        <Button variant='contained' className='bg-[#002379]  max-w-56'>Confirm</Button>
                    </Stack>
                    <Stack direction={'column'} spacing={1.5}>
                        <Typography variant='h6' className='text-lg'>Email</Typography>
                        <TextField 
                            type='text' 
                            placeholder='New Email' 
                            variant='outlined'
                        />
                        <Button variant='contained' className='bg-[#002379]  max-w-56 '>Confirm</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Setting

