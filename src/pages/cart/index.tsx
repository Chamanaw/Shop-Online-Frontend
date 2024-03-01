import { Box, Button, Stack, Typography,IconButton } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useCartContext } from '../../context/cartContext'
import DeleteIcon from '@mui/icons-material/Delete';

function CartPage() {

    const {cartItems} = useCartContext()

    return (
        <Box component='div' className='mt-5'>
            <Typography variant='h5' className='font-medium' gutterBottom >Cart ({cartItems.length})</Typography>
            <Stack direction='row' spacing={3}>
                <Box component='div' sx={{ width: '100%' }}>
                    {
                        cartItems.map((element, index) => (
                            <Stack direction='row'
                                key={uuidv4()}
                                alignItems='center'
                                className={(index % 2 === 0)?'bg-white':'bg-gray-100'}
                            >
                                <Box
                                    component='img'
                                    src={element.image}
                                    sx={{
                                        width: 100,
                                        objectFit: 'cover',
                                    }}
                                />
                                <Stack direction='row' justifyContent='space-between' className='w-full'>
                                    <Typography className='font-medium'>{element.productName}</Typography>
                                    <Typography variant='body1' className='text-red-500'>฿{element.price}</Typography>
                                    <IconButton className='mr-2'>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Stack>
                            </Stack>
                        ))
                    }
                </Box>
                <Stack  className='w-[550px] p-6 bg-zinc-100 rounded h-52'direction='column' spacing={1} >
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography variant='body1' >Subtotal</Typography>
                        <Typography  >฿48000</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography >Discount</Typography>
                        <Typography  >-฿0</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography className='font-semibold'>Total</Typography>
                        <Typography className='mb-6 font-semibold'  gutterBottom >฿48000</Typography>
                    </Stack>
                    <Button variant='contained' fullWidth className='bg-blue-600' >Proceed to checkout</Button>
                </Stack>
            </Stack>
        </Box>

    )
}

export default CartPage