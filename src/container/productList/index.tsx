import ProductCard from "../../components/productCard";
import { Box } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { ProductType } from "../../interface";
import Grid from '@mui/material/Unstable_Grid2';

function ProductList({products}: { products: ProductType[] | null}) {

    return (
        <Grid container spacing={2} >
            {
               products && products.map(element => (
                    <Grid xs={2} key={uuidv4()}>
                        <Box component='div'>
                            <Link to='/iPhone15promax' style={{ textDecoration: 'none' }}>
                                <ProductCard
                                    image={element.image}
                                    category={element.category}
                                    productName={element.productName}
                                    price={element.price}
                                />
                            </Link>
                        </Box>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default ProductList