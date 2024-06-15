import { Box, Stack, Typography, Container } from '@mui/material'
import { ProductType } from '../../types'
import ProductList from '../../container/productList'
import { ListItem, List } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../api'


function ResultSearchPage() {

    const { search } = useLocation()
    const param = new URLSearchParams(search)
    const query = param.get('keyword')?.replace(/\s/g,"").toLowerCase()
    const [productList, setProductLsit] = useState<ProductType[] | null>()

    const getProduct = async () => {
        const result = await axios.get(`/api/products/search?keyword=${query}`)
        setProductLsit(result.data)
    }

    useEffect(() => {
        getProduct()
    }, [search])

    return (

        <Container maxWidth='xl' className='mt-28'>
            <Stack direction='row' spacing={2} className='mt-5'>
                <Box className='min-w-[230px] bg-gray-100 h-[20rem] rounded pl-5' display={{xs:"none",md:"block"}}>
                    <Typography className='pt-7 font-semibold'>CATEGORY</Typography>
                    <Box>
                        <List >
                            <ListItem className='textListItems'>
                                <Typography variant='body2'>Smartphone</Typography>
                            </ListItem>
                            <ListItem className='textListItems'>
                                <Typography variant='body2' >Electrical appliance</Typography>
                            </ListItem>
                            <ListItem className='textListItems'>
                                <Typography variant='body2'>Earphones</Typography>
                            </ListItem>
                        </List>
                    </Box>

                </Box>
                <Box className='flex flex-col content-center w-full '>
                    <Stack direction='row' spacing={1}>
                        <Typography variant='h5' className='mb-3 text-xl md:text-2xl'>{(productList?.length) ? 'Result for' : 'No information found for'}</Typography>
                        <Typography variant='h5' className='font-medium'>"{query}"</Typography>
                    </Stack>
                    <Box component={'div'}>
                        <ProductList products={(productList) ? productList : null} />
                    </Box>
                </Box>
            </Stack>
        </Container>
    )
}

export default ResultSearchPage