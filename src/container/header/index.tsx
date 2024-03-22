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
    ListItemIcon
} from '@mui/material'

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import Search from '../search';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'

function Header() {

    const { cartItems } = useCartContext()
    const { user , setUser } = useUserContext()
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (

        <AppBar className='bg-zinc-800'>
            <Container maxWidth='xl'>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Stack direction='row' alignItems='center'>
                        <Link to='/'>
                            <IconButton
                                size='large'
                                color='inherit'
                                edge='start'
                            >
                                <ShoppingBagIcon />
                            </IconButton>
                        </Link>
                        <Link to='/'>
                            <Typography variant='h6' component='div' >
                                SHOPING STORE
                            </Typography>
                        </Link>
                    </Stack>
                    <Search />
                    <Stack direction='row' spacing={2}>
                        {(!user.user_name) ?
                            <Stack spacing={2} direction={'row'}>
                                <Link to='/login'>
                                    <Button
                                        variant='text'
                                        color='inherit'
                                        startIcon={
                                            <PersonIcon />
                                        }
                                    >
                                        Log in
                                    </Button>
                                </Link>
                                <Link to='signup'><Button variant='contained' className='bg-blue-600'>Sign up</Button></Link>
                            </Stack>
                            :
                            <Stack direction={'row'} alignItems={'center'}>
                                <Button onClick={handleClick}>
                                    <Stack direction={'row'} alignItems={'center'} spacing={1.5}>
                                        <Avatar sx={{ width: 36, height: 36 }}>H</Avatar>
                                        <Typography className='font-medium text-white' >{user.user_name.toUpperCase()}</Typography>
                                    </Stack>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose} sx={{width:"150px"}} >
                                        <ListItemIcon>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                        Setting
                                    </MenuItem>
                                    <MenuItem onClick={()=>{
                                        handleClose()
                                        localStorage.removeItem("token")
                                        setUser({ id: 0, user_name: '', email: '' })
                                        navigate('/login')
                                    }}>
                                        <ListItemIcon>
                                            <LogoutIcon/>
                                        </ListItemIcon>
                                        Logout
                                        </MenuItem>
                                </Menu>

                            </Stack>
                        }


                        <Link to='/cart' className='border-l-2 border-gray-600'>
                            <Badge badgeContent={cartItems.length} color='primary'>
                                <IconButton className='ml-2'>
                                    <ShoppingCartIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Badge>
                        </Link>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default Header

