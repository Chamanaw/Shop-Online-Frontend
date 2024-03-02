import { Box, Typography, Stack, TextField,Button,InputAdornment } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Signin() {
    return (
        <Box className='h-full p-5 mt-6'>
            <Stack direction='column' alignItems='center' className=''>
                <Stack className='p-2 w-1/3' direction='column' spacing={2}>
                    <Typography variant='h5' className='font-medium'>Sign in</Typography>
                    <TextField 
                        variant='filled' 
                        label='Username'
                        InputProps={{startAdornment:<InputAdornment position='start'><PersonIcon/></InputAdornment>}}
                    />
                    <TextField 
                        variant='filled' 
                        label='Password'
                        InputProps={{startAdornment:<InputAdornment position='start'><LockOpenIcon/></InputAdornment>}}
                    />
                    <Button variant='contained' className='bg-blue-600' size='large'>Continue</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Signin