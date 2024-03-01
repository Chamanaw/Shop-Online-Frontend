import { Box, Stack, Typography, } from '@mui/material'
import { ProductType } from '../../data/product'
import ProductList from '../../container/productList'
import { ListItem, List } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../api'


function ResultSearchPage() {

    const {search} = useLocation()
    const param =new URLSearchParams(search)
    const query =  param.get('keyword')

    const [productList, setProductLsit] = useState<ProductType[] | null>()
    

    const getProduct = async () => {
        try {
            await axios.get(`/search?${search}`)
                .then(result=> setProductLsit(result.data))
        }
        catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getProduct()
    },[query])

    return (
        <Stack direction='row' spacing={2} className='mt-12'>
            <Box className='min-w-[230px] bg-zinc-100 h-[20rem] rounded pl-5'>
                <Typography className='pt-7 font-semibold'>หมวดหมู่สินค้า</Typography>
                <Box>
                    <List >
                        <ListItem className='textListItems'>
                            <Typography variant='body2'>โทรศัพท์มือถือ</Typography>
                        </ListItem>
                        <ListItem className='textListItems'>
                            <Typography variant='body2' >เครื่องใช้ไฟฟ้า</Typography>
                        </ListItem>
                        <ListItem className='textListItems'>
                            <Typography variant='body2'>หูฟังและหูฟังเกมมิ่ง</Typography>
                        </ListItem>
                    </List>
                </Box>

            </Box>
            <Box className='flex flex-col content-center '>
                <Typography variant='h5' className='mb-3'>{(productList)?`ผลการค้นหา ${query}`:`ไม่พบข้อมูลของ ${query}`}</Typography>
                <ProductList products={(productList)?productList:null} />
            </Box>
        </Stack>
    )
}

export default ResultSearchPage