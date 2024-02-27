import {Typography,Box} from '@mui/material'
import ProductList from '../../container/productList'
import { productData } from '../../data/product'

function HomePage (){
    return(
        <Box>
            <Box
                component='div'
                sx={{
                    height:'40vh',
                    background:'#000000',
                }}
            >
                <Typography>Image slider</Typography>
            </Box>
            <Box
                sx={{height:'17px'}}
            />
            <Typography variant='h6' gutterBottom className='text-xl'>สินค้าทั้งหมด</Typography>
            <ProductList products={productData}/>
        </Box>
    )
}

export default HomePage