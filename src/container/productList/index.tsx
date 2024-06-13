import ProductCard from "../../components/productCard";
import { Box } from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { ProductType } from "../../types";
import Grid from '@mui/material/Unstable_Grid2';
import axios from "../../api";

function ProductList({products}: { products: ProductType[] | null}) {

    return (
        <Grid container spacing={2} direction={"row"} >
            {
               products && products.map(element => (
                    <Grid xs={6} sm={4.3} md={4} lg={2} key={uuidv4()}>
                        <Box component='div'>
                            <Link to={`/${element.name}`} style={{ textDecoration: 'none' }}>
                                <ProductCard
                                    image={axios.getUri()+element.image}
                                    category={element.c_name}
                                    productName={element.name}
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