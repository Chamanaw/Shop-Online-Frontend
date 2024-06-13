import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../../api'
import { ProductType } from '../../types'
import { useNavigate } from 'react-router-dom'

interface Cart {
    cartItems: ProductType[],
    setCartItems: (data: ProductType[]) => void
}

const defaultCartContext: Cart = {
    cartItems: [],
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
    const navigate = useNavigate()
    const getProductCart = async () => {
        const result = await axios.get('/api/cart')
        setCartItems(result.data)
    }
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(token){getProductCart()}
        else{navigate('/')}  
    }, [])

    return (
        <CartConstex.Provider value={{ cartItems, setCartItems }}>
            {children}
        </CartConstex.Provider>
    )
}
