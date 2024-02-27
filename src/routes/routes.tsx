import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/homePage'
import ProductPage from '../pages/productDetailsPage'
import { productOne,productData } from '../data/product'
import CartPage from '../pages/cart'
import ResultSearchPage from '../pages/resultSearchPage'

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<HomePage/>
            },
            {
                path:'/iPhone15promax',
                element:<ProductPage products={productOne}/>
            },
            {
                path:'/cart',
                element:<CartPage products={productData}/>
            },
            {
                path:'/search',
                element:<ResultSearchPage/>

            }

        ]
    },
   
])