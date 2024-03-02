import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/homePage'
import ProductPage from '../pages/productDetailsPage'
import CartPage from '../pages/cart'
import ResultSearchPage from '../pages/resultSearchPage'
import axios from '../api'
import Signin from '../pages/signinPage'

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
                element:<ProductPage/>,
                loader: async () =>{
                    const productDetail = await axios.get('/productDetail')
                    .then(result=>result.data)
                    return productDetail
                }
            },
            {
                path:'/cart',
                element:<CartPage/>,
                loader: async () =>{
                    const cartItems = await axios.get('/carts')
                    .then(result=>result.data)
                    return cartItems
                }
            },
            {
                path:'/search',
                element:<ResultSearchPage/>

            },
            {
                path:'/login',
                element:<Signin/>
            }

        ]
    },
   
])