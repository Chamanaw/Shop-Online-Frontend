import {Typography,Box} from '@mui/material'
import ProductList from '../../container/productList'
import { productData } from '../../data/product'

function HomePage (){
    return(
        <Box>
          
            <Box
                sx={{height:'17px'}}
            />
            <Typography variant='h6' gutterBottom className='text-xl'>All Product</Typography>
            <ProductList products={productData}/>
        </Box>
    )
}

export default HomePage