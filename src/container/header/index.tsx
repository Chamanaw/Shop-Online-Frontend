import {
    AppBar,
    Typography,
    Toolbar,
    Stack,
    IconButton,
    Button,
    Container,
    Badge
} from '@mui/material'

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom'
import Search from '../search';
import { useCartContext } from '../../context/cartContext';

function Header() {

    const { cartItems } = useCartContext()

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
                        <Button
                            variant='text'
                            color='inherit'
                            startIcon={
                                <PersonIcon />
                            }
                        >
                            Sign in
                        </Button>
                        <Button variant='contained' className='bg-blue-600'>Sign up</Button>
                        <Link to='/cart'>
                            <Badge badgeContent={cartItems.length} color='primary'>
                                <IconButton>
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

