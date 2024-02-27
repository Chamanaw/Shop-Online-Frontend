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
        <Stack direction='row' className='w-full'>
            <Box>
                <Card>
                    <CardMedia
                        component='img'
                        image={image}
                        className='w-42'
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