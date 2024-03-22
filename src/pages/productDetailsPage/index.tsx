import { Stack, Typography, Box, Button } from '@mui/material'
import { ProductType } from '../../interface'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from '../../context/cartContext';
import { useLoaderData } from 'react-router-dom';
import axios from '../../api';

function ProductPage() {

    const { setCartItems } = useCartContext()
    const productDetail: ProductType = useLoaderData() as ProductType

    const addCart = async () => {
        try {
            await axios.post('/additem', { ...productDetail })
                .then((result) => {
                    setCartItems(result.data)
                })
        } catch (error) {
            throw error
        }

    }

    return (
        <Box>
            <Stack direction='row' >
                <Box sx={{ width: '100%' }} display='flex' component='div' justifyContent='center'>
                    <Box
                        component='img'
                        src={productDetail.image}
                        sx={{
                            width: 500
                        }}
                    />
                </Box>
                <Stack sx={{ width: '100%' }} direction='column' justifyContent='space-between' spacing={2} style={{ padding: '30px' }}>
                    <Box component='div'>
                        <Typography variant='h5' className='font-semibold'>{productDetail.productName}</Typography>
                        <Typography variant='body1' className='text-gray-600'>Brand: Apple</Typography>
                    </Box>

                    <Typography variant='body1'>{productDetail.scription}</Typography>
                    <Box>
                        <Typography variant='body1' className='font-medium'>Capacity</Typography>
                        <Typography variant='subtitle1'>128 GB</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body1' className='font-medium'>color</Typography>
                        <Box
                            component='div'
                            className='h-4 w-4 bg-stone-500 rounded-xl mt-2'
                        />
                    </Box>

                    <Typography variant='h5' className='text-red-600'>฿ {productDetail.price}</Typography>
                    <Stack direction='row' spacing={2}>

                        <Button
                            variant='outlined'
                            sx={{ width: 200 }}
                            startIcon={<ShoppingCartIcon />}
                            onClick={addCart}
                        >
                            Add to Cart
                        </Button>

                        <Button variant='contained' sx={{ width: 200 }} className='bg-blue-600'>Buy now</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default ProductPage