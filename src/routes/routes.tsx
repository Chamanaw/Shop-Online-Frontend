import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import HomePage from '../pages/homePage'
import ProductPage from '../pages/productDetailsPage'
import CartPage from '../pages/cart'
import ResultSearchPage from '../pages/resultSearchPage'
import Signin from '../pages/loginPage'
import Signup from '../pages/signupPage'
import Setting from '../pages/setting'

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
                path:'/:nameProduct',
                element:<ProductPage/>,
            },
            {
                path:'/cart',
                element:<CartPage/>,
            },
            {
                path:'/search',
                element:<ResultSearchPage/>

            },
            {
                path:'/setting',
                element:<Setting/>
            }

        ]
          
    },
    {
        path:'/login',
        element:<Signin />
    },
    {
        path:'/signup',
        element:<Signup/>
    }
   
])