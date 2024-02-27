import { Stack, Typography, Box, Button } from '@mui/material'
import { ProductType } from '../../data/product'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductPage({ products }: { products: ProductType }) {

    return (
            <Stack direction='row' >
                <Box sx={{ width: '100%' }} display='flex' component='div' justifyContent='center'>
                    <Box
                        component='img'
                        src={products.image}
                        sx={{
                            width: 500
                        }}
                    />
                </Box>
                <Stack sx={{ width: '100%' }} direction='column' spacing={2} style={{ padding: '30px' }}>
                    <Box component='div'>
                        <Typography variant='h5'>{products.productName}</Typography>
                        <Typography variant='body1' className='text-gray-600'>แบรนด์: Apple</Typography>
                    </Box>
                    <Typography variant='body1'>{products.scription}</Typography>
                    <Stack direction='row' spacing={2}>
                            <Button
                                variant='outlined'
                                sx={{ width: 200 }}
                                startIcon={<ShoppingCartIcon />}
                            >
                                หยิบใส่ตะกร้า
                            </Button>
                        <Button variant='contained' sx={{ width: 200 }}  className='bg-blue-600'>ซื้อสินค้า</Button>
                    </Stack>
                </Stack>
            </Stack>
    )
}

export default ProductPage