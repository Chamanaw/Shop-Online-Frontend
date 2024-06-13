import { 
    Card, 
    CardMedia, 
    CardContent, 
    Stack, 
    Typography, 
    Box } 
    from '@mui/material'


interface cardType{
    image:string,
    category:string,
    productName:string,
    price:number
}


function ProductCard({image,category,productName,price}:cardType) {
    return (
        <Stack direction='row' className='w-full min-w-[12.5rem]'>
            <Box>
                <Card>
                    <CardMedia
                        component='img'
                        image={image}
                        sx={{
                            width:"100%",
                            height: '14rem',
                            objectFit: 'contain',
                        }}
                    />
                    <CardContent>
                        <Typography className='text-sm text-gray-600'>{category}</Typography>
                        <Typography className='font-semibold'>{productName}</Typography>
                        <Typography className='text-red-600 font-semibold'>฿{price}</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Stack>
    )
}

export default ProductCard