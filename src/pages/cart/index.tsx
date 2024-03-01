import { Box, Button, Stack, Typography } from '@mui/material'
//import { ProductType } from '../../data/product'
import { v4 as uuidv4 } from 'uuid'
import { useCartContext } from '../../context/cartContext'

function CartPage() {

    const {cartItems} = useCartContext()

    return (
        <Box component='div' className='mt-5'>
            <Typography variant='h5' gutterBottom >ตะกร้าสินค้า</Typography>
            <Stack direction='row' spacing={3}>
                <Box component='div' sx={{ width: '100%' }}>
                    {
                        cartItems.map((element, index) => (
                            <Stack direction='row'
                                key={uuidv4()}
                                alignItems='center'
                                className={(index % 2 === 0)?'bg-white':'bg-zinc-100'}
                            >
                                <Box
                                    component='img'
                                    src={element.image}
                                    sx={{
                                        width: 100,
                                        objectFit: 'cover',
                                    }}
                                />
                                <Box >
                                    <Typography className='font-semibold'>{element.productName}</Typography>
                                    <Typography variant='body1' className='text-red-500'>฿{element.price}</Typography>
                                </Box>
                            </Stack>
                        ))
                    }
                </Box>
                <Box  className='w-[550px] p-6 bg-zinc-100 rounded h-52' >
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography className='font-semibold'>ยอดรม</Typography>
                        <Typography className='font-semibold' >฿48000</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography className='font-semibold'>สวนลด</Typography>
                        <Typography className='font-semibold' >-฿0</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between'>
                        <Typography className='font-semibold'>ยอดรมสุทธิ</Typography>
                        <Typography className='mb-6 font-semibold'  gutterBottom >฿48000</Typography>
                    </Stack>
                    <Button variant='contained' fullWidth className='bg-blue-600' >ดำเนินการสั่งซื้อ</Button>
                </Box>
            </Stack>
        </Box>

    )
}

export default CartPage