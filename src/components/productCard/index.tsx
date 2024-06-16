import {
    Card,
    CardMedia,
    CardContent,
    Typography,
}
    from '@mui/material'


interface cardType {
    image: string,
    category: string,
    productName: string,
    price: number
}


function ProductCard({ image, category, productName, price }: cardType) {
    return (
        <Card className='h-[350px] flex flex-col justify-center items-start'>
            <CardMedia
                component='img'
                image={image}
                className='self-center'
                sx={{
                    width: "100%",
                    height: '14rem',
                    objectFit: 'contain',
                    maxWidth: "14rem",

                }}
            />
            <CardContent>
                <Typography className='text-sm text-gray-600'>{category}</Typography>
                <Typography className='font-semibold'>{productName}</Typography>
                <Typography className='text-red-600 font-semibold'>฿{price}</Typography>
            </CardContent>
        </Card>
    )
}

export default ProductCard