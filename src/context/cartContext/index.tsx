import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../../api'
import {ProductType} from '../../interface'

interface Cart {
    cartItems: ProductType[],
    setCartItems: (data: ProductType[]) => void
}

const defaultCartContext: Cart = {
    cartItems: [
        {
            id: 0,
            image: '',
            productName: '',
            category: '',
            price: 0,
            scription: '',
        }
    ],
    setCartItems: (_data) => { }
}

const CartConstex = createContext<Cart>(defaultCartContext)

interface Props {
    children: React.ReactNode
}

export function useCartContext() {
    return useContext(CartConstex)
}

export default function CartConstexProvider({ children }: Props) {

    const [cartItems, setCartItems] = useState<ProductType[]>([])

    const getProductCart = async () => {
        try {
            await axios.get('/carts')
            .then((result)=>{
                setCartItems(result.data)
            })
        }
        catch (error) {
            throw error
        }
    }
    useEffect(() => {
        getProductCart()
    },[])
    
    return (
        <CartConstex.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartConstex.Provider>
    )
}
