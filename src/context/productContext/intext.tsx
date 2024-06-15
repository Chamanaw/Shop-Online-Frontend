import { createContext,useContext,useEffect,useState } from "react";
import { ProductType } from "../../types";
import axios from '../../api'

interface Products{
    products:ProductType[]
    setProducts:(newValue:ProductType[])=>void
}

const defaultValueProduct:Products = {
    products:[],
    setProducts:(_data:ProductType[])=>{}
}

const ProductContext = createContext<Products>(defaultValueProduct)

export function useProductContext(){
    return useContext(ProductContext)
}

interface Props{
    children:React.ReactNode
}

export default function ProductContextProvider({children}:Props){

    const [products, setProducts] = useState<ProductType[]>([])

    const fetchProduct = async()=>{
        const result = await axios.get('/api/products/allproduct')
        setProducts(result.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[])
    return(
        <ProductContext.Provider value={{products,setProducts}}>
            {children}
        </ProductContext.Provider>
    )
}



